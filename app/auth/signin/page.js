'use client';

import { signIn } from "next-auth/react";

const SignIn = () => {
    const handleSignIn = async (e) => {
        e.preventDefualt();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res.error) {
            alert(res.error);
        } else {
            alert('Signed in successfully!');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    className="p-2 border rounded"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    className="p-2 border rounded"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;