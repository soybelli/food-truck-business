import React from 'react';
import { ConditionSelect } from './ConditionSelect';
import type { ListingSpecifications } from '../../../types/listing';

interface SpecificationsFormProps {
  specifications: ListingSpecifications;
  onChange: (specifications: ListingSpecifications) => void;
}

export function SpecificationsForm({ specifications, onChange }: SpecificationsFormProps) {
  const handleChange = (field: keyof ListingSpecifications, value: any) => {
    onChange({
      ...specifications,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dimensions *
        </label>
        <input
          type="text"
          required
          placeholder="e.g., 20' x 8' x 10'"
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={specifications.dimensions}
          onChange={(e) => handleChange('dimensions', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year *
        </label>
        <input
          type="number"
          required
          min={1900}
          max={new Date().getFullYear() + 1}
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={specifications.year}
          onChange={(e) => handleChange('year', parseInt(e.target.value))}
        />
      </div>

      <ConditionSelect
        value={specifications.condition}
        onChange={(condition) => handleChange('condition', condition)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Equipment (comma-separated)
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={specifications.equipment.join(', ')}
          onChange={(e) => handleChange('equipment', 
            e.target.value.split(',').map(item => item.trim()).filter(Boolean)
          )}
          rows={3}
          placeholder="e.g., Commercial Range, Deep Fryer, Refrigeration"
        />
      </div>
    </div>
  );
}