import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Lecture() {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    const { data, error } = await supabase
      .from('subpackages')
      .select('*')
      .eq('package_id', id);
    if (data) setLectures(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lectures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lectures.map(lec => (
          <div key={lec.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{lec.title}</h2>
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${extractYouTubeID(lec.video_url)}`}
              title={lec.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

function extractYouTubeID(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}