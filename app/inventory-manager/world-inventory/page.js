'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const WorldInventoryPage = () => {
    const { data: session } = useSession();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchItems();
        }
    }, [session]);

    const truncateDescription = (description) => {
        if (description.length > 100) {
            return `${description.substring(0, 100)}...`;
        }
        return description;
    };

    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center text-gray-900 dark:text-gray-100">Access Denied. You must be signed in to view this page.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center text-gray-900 dark:text-gray-100">Loading inventory...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">World Inventory Overview</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-900 dark:text-gray-100">Name</th>
                                <th className="px-6 py-3 text-left text-gray-900 dark:text-gray-100">Description</th>
                                <th className="px-6 py-3 text-center text-gray-900 dark:text-gray-100">Quantity</th>
                                <th className="px-6 py-3 text-center text-gray-900 dark:text-gray-100">Added Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{truncateDescription(item.description)}</td>
                                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{item.quantity}</td>
                                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {items.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No items found in the inventory.</p>
                )}
            </div>
        </div>
    );
};

export default WorldInventoryPage;
