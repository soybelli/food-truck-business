import React from 'react';
import type { ListingCondition } from '../../../types/listing';

interface ConditionSelectProps {
  value: ListingCondition;
  onChange: (condition: ListingCondition) => void;
}

const conditions: ListingCondition[] = ['New', 'Excellent', 'Good', 'Fair', 'Needs Work'];

export function ConditionSelect({ value, onChange }: ConditionSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Condition *
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ListingCondition)}
        className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        required
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>
    </div>
  );
}