'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { InventoryLayout } from './layout';

export default function InventoryManager() {
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/inventory');
                if (!response.ok) throw new Error('Failed to fetch inventory');
                const data = await response.json();
                setItems(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (session) {
            fetchItems();
        }
    }, [session]);

    if (status === 'loading' || isLoading) {
        return (
            <InventoryLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </InventoryLayout>
        );
    }

    return (
        <InventoryLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Inventory</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                {!error && items.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <h2 className="text-xl text-gray-600 mb-4">Your inventory is empty</h2>
                        <p className="text-gray-500">Start by adding some items to your inventory.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Price: ${item.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </InventoryLayout>
    );
}
