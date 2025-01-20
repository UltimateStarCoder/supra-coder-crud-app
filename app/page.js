'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Inventory Items</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-600 text-lg">Your inventory is empty...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="mt-1">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
