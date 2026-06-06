/**
 * export-content.mjs
 * Reads content/content.json and writes:
 *  - content/content.csv   (UTF-8 BOM so Excel opens Arabic correctly)
 *  - content/content.xlsx  (multi-sheet workbook, one sheet per page)
 *
 * Usage: node scripts/export-content.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(path.join(root, 'content/content.json'), 'utf8'));

// ── Flatten into rows ─────────────────────────────────────────────────────────
function flattenObject(obj, pageName, sectionId, fieldPath = '') {
  const rows = [];
  if (typeof obj !== 'object' || obj === null) return rows;
  if ('en' in obj && 'ar' in obj && Object.keys(obj).length === 2) {
    // Leaf bilingual node
    rows.push({
      page:    pageName,
      section: sectionId,
      field:   fieldPath,
      en:      String(obj.en),
      ar:      String(obj.ar),
    });
    return rows;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('_')) continue;
    const nextPath = fieldPath ? `${fieldPath}.${key}` : key;
    rows.push(...flattenObject(val, pageName, sectionId, nextPath));
  }
  return rows;
}

const allRows = [];

// Global
for (const [key, val] of Object.entries(data.global)) {
  allRows.push(...flattenObject(val, 'global', 'global', key));
}
// Nav
for (const [key, val] of Object.entries(data.nav)) {
  if (key === 'links') {
    val.forEach(link => {
      allRows.push({ page:'nav', section:'links', field:`${link.id}.en`, en: link.en, ar: link.ar });
    });
  } else {
    allRows.push(...flattenObject(val, 'nav', key, key));
  }
}
// Footer
for (const [key, val] of Object.entries(data.footer)) {
  if (key === 'columns') {
    for (const [col, colVal] of Object.entries(val)) {
      allRows.push(...flattenObject(colVal, 'footer', `columns.${col}`, col));
    }
  } else {
    allRows.push(...flattenObject(val, 'footer', key, key));
  }
}
// Pages
for (const [pageId, page] of Object.entries(data.pages)) {
  for (const [secId, section] of Object.entries(page.sections)) {
    for (const [key, val] of Object.entries(section)) {
      if (key.startsWith('_')) continue;
      allRows.push(...flattenObject(val, pageId, secId, key));
    }
  }
}

// ── CSV ───────────────────────────────────────────────────────────────────────
function csvEscape(str) {
  const s = String(str ?? '').replace(/"/g, '""');
  return `"${s}"`;
}
const header = ['Page', 'Section', 'Field', 'English', 'Arabic'];
const csvLines = [
  header.map(csvEscape).join(','),
  ...allRows.map(r => [r.page, r.section, r.field, r.en, r.ar].map(csvEscape).join(','))
];
// UTF-8 BOM so Excel opens Arabic without re-encoding
const bom = '﻿';
writeFileSync(path.join(root, 'content/content.csv'), bom + csvLines.join('\r\n'), 'utf8');
console.log(`✓ content.csv  — ${allRows.length} rows`);

// ── XLSX ──────────────────────────────────────────────────────────────────────
// Build a minimal XLSX with one sheet per page (no external dependency).
// OOXML worksheet format.
function xmlEscape(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

// Group rows by page
const byPage = {};
for (const row of allRows) {
  (byPage[row.page] ??= []).push(row);
}

// Excel column letters
const col = (i) => String.fromCharCode(65 + i); // A-Z (we only need 5 cols)

function makeSheet(rows) {
  const colHeaders = ['Page','Section','Field','English','Arabic'];
  const allRowsXml = [[...colHeaders], ...rows.map(r=>[r.page,r.section,r.field,r.en,r.ar])];
  let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>`;
  allRowsXml.forEach((cells, ri) => {
    xml += `<row r="${ri+1}">`;
    cells.forEach((cell, ci) => {
      const ref = `${col(ci)}${ri+1}`;
      const v = xmlEscape(cell);
      xml += `<c r="${ref}" t="inlineStr"><is><t>${v}</t></is></c>`;
    });
    xml += `</row>`;
  });
  xml += `</sheetData></worksheet>`;
  return xml;
}

// Minimal XLSX builder (PK-style zip, no compression)
function strToUint8(s) {
  const enc = new TextEncoder();
  return enc.encode(s);
}

// CRC32 for zip
const CRC32_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c;}
  return t;
})();
function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (const b of data) crc = CRC32_TABLE[(crc^b)&0xFF]^(crc>>>8);
  return (crc^0xFFFFFFFF)>>>0;
}

function uint32LE(n) { const b=new Uint8Array(4); new DataView(b.buffer).setUint32(0,n,true); return b; }
function uint16LE(n) { const b=new Uint8Array(2); new DataView(b.buffer).setUint16(0,n,true); return b; }

function concat(...arrays) {
  const total = arrays.reduce((s,a)=>s+a.length,0);
  const out = new Uint8Array(total);
  let off=0;
  for (const a of arrays) { out.set(a,off); off+=a.length; }
  return out;
}

// Build files map
const sheetNames = Object.keys(byPage);
const files = {};

// Relationships and content types
const sheetRels = sheetNames.map((n,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('');
files['xl/_rels/workbook.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetRels}</Relationships>`;

files['_rels/.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

const sheetsXml = sheetNames.map((n,i)=>`<sheet name="${xmlEscape(n)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('');
files['xl/workbook.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetsXml}</sheets></workbook>`;

sheetNames.forEach((n,i) => {
  files[`xl/worksheets/sheet${i+1}.xml`] = makeSheet(byPage[n]);
});

const overrideTypes = [
  '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
  ...sheetNames.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`),
].join('');
files['[Content_Types].xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${overrideTypes}</Types>`;

// Build ZIP
function makeLocalFileHeader(name, data, crc, offset) {
  const nameBytes = strToUint8(name);
  return concat(
    new Uint8Array([0x50,0x4B,0x03,0x04]), // sig
    uint16LE(20),             // version needed
    uint16LE(0),              // flags
    uint16LE(0),              // compression: stored
    uint16LE(0), uint16LE(0), // mod time/date
    uint32LE(crc),
    uint32LE(data.length),    // compressed size
    uint32LE(data.length),    // uncompressed size
    uint16LE(nameBytes.length),
    uint16LE(0),              // extra len
    nameBytes
  );
}
function makeCentralDir(name, data, crc, offset) {
  const nameBytes = strToUint8(name);
  return concat(
    new Uint8Array([0x50,0x4B,0x01,0x02]),
    uint16LE(20), uint16LE(20),
    uint16LE(0), uint16LE(0),
    uint16LE(0), uint16LE(0),
    uint32LE(crc),
    uint32LE(data.length),
    uint32LE(data.length),
    uint16LE(nameBytes.length),
    uint16LE(0), uint16LE(0),
    uint16LE(0), uint16LE(0),
    uint32LE(0),
    uint32LE(offset),
    nameBytes
  );
}

const parts = [];
const centralDirs = [];
let offset = 0;
for (const [name, content] of Object.entries(files)) {
  const data = strToUint8(content);
  const crc = crc32(data);
  const local = makeLocalFileHeader(name, data, crc, offset);
  centralDirs.push(makeCentralDir(name, data, crc, offset));
  parts.push(local, data);
  offset += local.length + data.length;
}
const centralDir = concat(...centralDirs);
const eocd = concat(
  new Uint8Array([0x50,0x4B,0x05,0x06]),
  uint16LE(0), uint16LE(0),
  uint16LE(Object.keys(files).length),
  uint16LE(Object.keys(files).length),
  uint32LE(centralDir.length),
  uint32LE(offset),
  uint16LE(0)
);
const xlsx = concat(...parts, centralDir, eocd);
writeFileSync(path.join(root, 'content/content.xlsx'), xlsx);
console.log(`✓ content.xlsx — ${sheetNames.length} sheets (${sheetNames.join(', ')})`);
