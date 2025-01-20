'use client';

import { useSession } from 'next-auth/react';


const InventoryManagerProtectedPage = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Access Denied. You must be signed in to view this page.</p>
    }

    return (
        <div>
            <h1>Inventory Manager</h1>
            <p>Welcome, {session.user.name}!</p>
        </div>
    );
};

export default InventoryManagerProtectedPage;
