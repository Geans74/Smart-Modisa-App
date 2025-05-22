import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AnimalsList() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/animals')
      .then(res => setAnimals(res.data))
      .catch(console.error);
  }, []);

  const filtered = animals.filter(a =>
    (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.tagId || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Animals</h1>
      <input
        type="text"
        placeholder="Search by name or tag ID"
        className="mb-4 p-2 border rounded w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(animal => (
          <li key={animal.tagId} className="border-b py-2">
            <Link to={`/animal/${animal.tagId}`} className="text-blue-600 hover:underline">
              {animal.name || animal.tagId} — {animal.species}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
