'use client';

import React from 'react';

/**
 * The form controls, shared by the visit request on the home page and the
 * application on /admissions. One implementation, so a label or a focus ring
 * never drifts between the two.
 */

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block t-small font-medium text-ink mb-2">
      {children}
    </label>
  );
}

export function Field({
  id,
  label,
  type = 'text',
  required = false,
  dir,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  /** Phone numbers and email addresses stay left-to-right inside an RTL page. */
  dir?: 'ltr' | 'rtl';
  autoComplete?: string;
  }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        dir={dir}
        autoComplete={autoComplete}
        className="field"
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  placeholder,
  options,
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={id} required={required} className="field" defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextField({
  id,
  label,
  rows = 4,
}: {
  id: string;
  label: string;
  rows?: number;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <textarea id={id} name={id} rows={rows} className="field resize-y" />
    </div>
  );
}

/** A heading inside a form, tying a group of fields together for a screen reader. */
export function FieldSet({
  legend,
  className = '',
  children,
}: {
  legend: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className={className}>
      <legend className="annot annot-soft mb-5">{legend}</legend>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </fieldset>
  );
}
