'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItem() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/inventory-manager');
                router.refresh();
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Quantity:</label>
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Description:</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
}
