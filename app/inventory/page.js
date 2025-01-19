import { useState, useEffect } from 'react'

'use client'

export default function InventoryPage() {
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory')
                const data = await response.json()
                setInventory(data)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchInventory()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            
            {inventory.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <h2 className="text-xl text-gray-600 mb-4">Your inventory is empty</h2>
                    <p className="text-gray-500">Start by adding some items to your inventory.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {inventory.map((item) => (
                        <div key={item.id} className="border p-3 rounded">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}