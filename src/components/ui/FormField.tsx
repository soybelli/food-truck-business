import React from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'tel' | 'email' | 'textarea';
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function FormField({ 
  label, 
  type = 'text', 
  required = false, 
  value, 
  onChange 
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      {type === 'textarea' ? (
        <textarea
          required={required}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          required={required}
          className="w-full px-3 py-2 border rounded-lg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}