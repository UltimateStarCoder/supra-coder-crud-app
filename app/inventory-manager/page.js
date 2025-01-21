'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const InventoryManagerProtectedPage = () => {
    const { data: session } = useSession();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        quantity: '',
        description: ''
    });

    useEffect(() => {
        const fetchItems = async () => {
            if (!session?.user?.email) return;
            
            try {
                const response = await fetch(`/api/items/personal-items?createdBy=${session.user.email}`);
                if (!response.ok) throw new Error('Failed to fetch items');
                const data = await response.json();
                setItems(data || []);
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [session]);

    if (!session) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-center">Access Denied. You must be signed in to view this page.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    const handleEdit = (item) => {
        setEditingId(item._id);
        setEditForm({
            name: item.name,
            quantity: item.quantity,
            description: item.description
        });
    };

    const handleUpdate = async (itemId) => {
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setItems(items.map(item => 
                    item._id === itemId ? updatedItem : item
                ));
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({ name: '', quantity: '', description: '' });
    };

    const handleDelete = async (itemId) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setItems(items.filter(item => item._id !== itemId));
            } else {
                throw new Error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">My Inventory Items</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Description</th>
                                <th className="px-6 py-3 text-center">Quantity</th>
                                <th className="px-6 py-3 text-center">Added Date</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    {editingId === item._id ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                    className="w-full p-2 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <textarea
                                                    value={editForm.description}
                                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                    className="w-full p-2 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    value={editForm.quantity}
                                                    onChange={(e) => setEditForm({...editForm, quantity: e.target.value})}
                                                    className="w-full p-2 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => handleUpdate(item._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Save</button>
                                                <button onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 font-medium">{item.name}</td>
                                            <td className="px-6 py-4">{item.description}</td>
                                            <td className="px-6 py-4 text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center space-x-2">
                                                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                                                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {items.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No items found in the inventory.</p>
                )}
            </div>
        </div>
    );
};

export default InventoryManagerProtectedPage;
