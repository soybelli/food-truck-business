import { Link, useLocation } from 'react-router-dom';
import { Plus, List, MessageSquare, Bell, BellOff } from 'lucide-react';
import { useAnnouncement } from '../../contexts/AnnouncementContext';

export function AdminHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAnnouncementVisible, toggleAnnouncement } = useAnnouncement();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
            to={`.`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPath.endsWith('admin/xK9q2')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-5 h-5" />
            Listings
          </Link>
          <Link
            to={`create`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPath.includes('/create')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Plus className="w-5 h-5" />
            New Listing
          </Link>
          <Link
            to={`leads`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPath.includes('/leads')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Leads
          </Link>
          <button
            onClick={toggleAnnouncement}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50"
            title={isAnnouncementVisible ? 'Hide Announcement Bar' : 'Show Announcement Bar'}
          >
            {isAnnouncementVisible ? (
              <Bell className="w-5 h-5" />
            ) : (
              <BellOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}