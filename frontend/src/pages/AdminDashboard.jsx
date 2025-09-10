import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [packageTitle, setPackageTitle] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data } = await supabase.from('packages').select('*');
    setPackages(data);
  };

  const addPackage = async () => {
    await supabase.from('packages').insert([{ title: packageTitle }]);
    setPackageTitle('');
    fetchPackages();
  };

  const addLecture = async () => {
    await supabase.from('subpackages').insert([
      { package_id: selectedPackage, title: lectureTitle, video_url: videoURL }
    ]);
    setLectureTitle('');
    setVideoURL('');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Package</h2>
        <input
          type="text"
          placeholder="Package Title"
          value={packageTitle}
          onChange={e => setPackageTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addPackage} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Package
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Lecture</h2>
        <select
          value={selectedPackage}
          onChange={e => setSelectedPackage(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select Package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Lecture Title"
          value={lectureTitle}
          onChange={e => setLectureTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="YouTube Video URL"
          value={videoURL}
          onChange={e => setVideoURL(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addLecture} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Lecture
        </button>
      </div>
    </div>
  );
}