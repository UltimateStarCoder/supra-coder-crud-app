'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
    const { data: session } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    if (session?.user) {
        return (
            <nav className="bg-slate-800 text-white p-4">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold">Welcome, {session.user.name || session.user.email}</h1>
                    <div className="space-x-4">
                        <Link href="/inventory-manager">My Items</Link>
                        <Link href="/inventory-manager/add">Add Item</Link>
                        <button 
                            onClick={handleSignOut}
                            className="text-white hover:text-gray-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    // Default navigation for unauthenticated users
    return (
        <nav className="bg-slate-800 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Supra Coder CRUD App</h1>
                <div className="space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/auth/signup">Sign Up</Link>
                    <Link href="/auth/signin">Sign In</Link>
                </div>
            </div>
        </nav>
    );
}