import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function Home() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase.from('packages').select('*');
    if (data) setPackages(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">EDUSpark Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
            <Link
              to={`/lecture/${pkg.id}`}
              className="text-blue-500 underline"
            >
              View Lectures
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}