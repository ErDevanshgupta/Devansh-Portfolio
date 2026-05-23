'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';
import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await adminLogin(data);
      window.location.href = '/admin';
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="w-full max-w-sm glass-card p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
            <Lock size={22} className="text-primary-400" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('email', { required: true })}
            type="email" placeholder="Email"
            className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-600" />
          <input {...register('password', { required: true })}
            type="password" placeholder="Password"
            className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-600" />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
