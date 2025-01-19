'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res.error) {
                setError('Invalid credentials');
            } else {
                router.push('/inventory-manager');
                router.refresh();
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">Sign In</h2>
                </div>
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}