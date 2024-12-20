import { LeadsTable } from '../../components/admin/LeadsTable';

export function LeadsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
      </div>
      <LeadsTable />
    </div>
  );
}