'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth.store';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Lock, Mail } from 'lucide-react';

import { AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);
      setAuth(response.user, response.accessToken);
      
      toast.success('Welcome back!', {
        description: `Good to see you again, ${response.user.name || response.user.email}!`,
      });

      if (response.user.role === 'COUNSELOR') {
        router.push('/dashboard/counselor/onboarding');
      } else {
        router.push('/explore');
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || 'Invalid credentials';
      setError(message);
      toast.error('Login failed', {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-border rounded-[2.5rem] overflow-hidden bg-card">
        <CardHeader className="space-y-4 text-center pb-6 pt-10">
          <div className="w-16 h-16 bg-primary rounded-[1.25rem] flex items-center justify-center mx-auto mb-2 shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-2xl font-heading">M</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold font-heading text-foreground tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground font-medium text-base">
              Sign in to continue your mental health journey
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-10 pb-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-sm font-bold text-destructive animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-bold ml-1 text-sm uppercase tracking-wider">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-12"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-bold text-destructive ml-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-bold ml-1 text-sm uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs font-bold text-destructive ml-1">{errors.password.message}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/10 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-muted-foreground font-medium">
              Don&apos;t have an account?{' '}
              <a href="/register" className="font-bold text-primary hover:underline transition-all">
                Create one
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
