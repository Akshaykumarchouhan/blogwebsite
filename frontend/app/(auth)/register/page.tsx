'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, username, email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.accessToken);
                router.push('/dashboard');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (password.length === 0) return { label: '', color: '' };
        if (password.length < 6) return { label: 'Weak', color: 'text-red-500' };
        if (password.length < 10) return { label: 'Medium', color: 'text-yellow-500' };
        return { label: 'Strong', color: 'text-green-500' };
    };

    const { label: strengthLabel, color: strengthColor } = getPasswordStrength();

    return (
        <div className="flex h-min-[calc(100vh-160px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg border border-border mt-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-background"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                name="username"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-background"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-none border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-background"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-border px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-background"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-1 text-xs px-1 text-right">
                                <span className={strengthColor}>{strengthLabel}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
