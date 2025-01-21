'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

const SignIn = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (result.error) {
                setError(result.error);
            } else {
                router.push('/inventory-manager');
            }
        } catch (error) {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Sign In</h1>
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>
                    )}
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;