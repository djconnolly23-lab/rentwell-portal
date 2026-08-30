'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Property {
  id: string;
  address: string;
  units: number;
  status: 'Occupied' | 'Vacant' | 'Mixed';
  image_url?: string;
}

interface PropertiesListProps {
  role?: string;
}

export default function PropertiesList({ role = 'client' }: PropertiesListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // TODO: Replace with your actual properties table query
        /*
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', session.user.id);
        
        if (data) setProperties(data);
        */

        // Placeholder data to match the UI layout while database is being built
        setProperties([
          { id: '1', address: '123 Main St, Springfield, IL', units: 4, status: 'Occupied' },
          { id: '2', address: '456 Oak Ave, Springfield, IL', units: 1, status: 'Vacant' },
          { id: '3', address: '789 Pine Ln, Springfield, IL', units: 8, status: 'Mixed' },
        ]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading properties...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">My Properties</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No properties found. Add your first rental to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Property Image Placeholder */}
              <div className="h-32 bg-slate-100 flex items-center justify-center border-b border-gray-100">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate" title={property.address}>
                  {property.address}
                </h3>
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">{property.units} Unit{property.units !== 1 ? 's' : ''}</span>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    property.status === 'Occupied' ? 'bg-green-100 text-green-800' :
                    property.status === 'Vacant' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex justify-between">
                <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                  View Details
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}