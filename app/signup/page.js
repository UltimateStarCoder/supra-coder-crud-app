'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/'); // Changed from '/api/auth/signin' to '/'
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>
                </div>
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
