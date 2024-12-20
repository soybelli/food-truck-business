import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ListingForm } from '../components/admin/ListingForm';
import { ListingTable } from '../components/admin/ListingTable';
import { AdminHeader } from '../components/admin/AdminHeader';

const ADMIN_SECRET = 'xK9q2';

export function AdminPage() {
  const [activeView, setActiveView] = useState<'list' | 'create'>('list');
  const { secret } = useParams();
  const navigate = useNavigate();

  // If secret doesn't match, redirect to home
  if (secret !== ADMIN_SECRET) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AdminHeader 
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <div className="max-w-7xl mx-auto mt-8">
        {activeView === 'list' ? (
          <ListingTable />
        ) : (
          <ListingForm />
        )}
      </div>
    </div>
  );
}