import React from 'react';
import { useLeads } from '../../hooks/useLeads';
import { formatDate } from '../../utils/date';
import { Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';

export function LeadsTable() {
  const { leads, loading, error } = useLeads();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-red-600">
          Error loading leads: {error.message}
        </p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-center text-gray-600">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Related Listing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.full_name}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={`tel:${lead.phone_number}`}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <Phone className="w-4 h-4" />
                      {lead.phone_number}
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                      >
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {lead.message ? (
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-600">{lead.message}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No message</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {lead.listings ? (
                    <a
                      href={`/admin/${lead.listings.id}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span>{lead.listings.title}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">General Inquiry</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}