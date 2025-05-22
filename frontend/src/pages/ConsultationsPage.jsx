import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/consultations')
      .then(res => setConsultations(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vet Consultations</h1>
      <ul>
        {consultations.map(c => (
          <li key={c._id} className="border-b py-2">
            <p><strong>Animal Tag:</strong> {c.animalTagId}</p>
            <p><strong>Farmer Email:</strong> {c.farmerEmail}</p>
            <p><strong>Symptoms:</strong> {c.symptoms}</p>
            <p><strong>Date Requested:</strong> {new Date(c.dateRequested).toLocaleString()}</p>
            <p><strong>Status:</strong> {c.status || 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
