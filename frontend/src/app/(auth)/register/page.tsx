'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/auth.store';
import { authApi } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { toast } from 'sonner';
import { Loader2, User, Stethoscope } from 'lucide-react';

import { AxiosError } from 'axios';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'PATIENT' | 'COUNSELOR'>(
    searchParams.get('role') === 'counselor' ? 'COUNSELOR' : 'PATIENT'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const role = searchParams.get('role');
    if (role === 'counselor') {
      setSelectedRole('COUNSELOR');
    } else {
      setSelectedRole('PATIENT');
    }
  }, [searchParams]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.register({
        ...data,
        role: selectedRole,
      });
      setAuth(response.user, response.accessToken);
      
      toast.success('Account created!', {
        description: `Welcome to MindBridge, ${response.user.name || 'there'}!`,
      });

      if (response.user.role === 'COUNSELOR') {
        router.push('/dashboard/counselor/onboarding');
      } else {
        router.push('/explore');
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error('Registration failed', {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-border rounded-[2.5rem] overflow-hidden bg-card">
      <CardHeader className="space-y-4 text-center pb-6 pt-10">
        <div className="w-16 h-16 bg-primary rounded-[1.25rem] flex items-center justify-center mx-auto mb-2 shadow-lg shadow-primary/20">
          <span className="text-primary-foreground font-bold text-2xl font-heading">M</span>
        </div>
        <div className="space-y-2 px-4">
          <CardTitle className="text-3xl font-bold font-heading text-foreground tracking-tight">Create account</CardTitle>
          <CardDescription className="text-muted-foreground font-medium text-base leading-snug">
            Join MindBridge and start your journey to better mental health
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 px-10 pb-12">
        <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as 'PATIENT' | 'COUNSELOR')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 bg-secondary/20 rounded-2xl">
            <TabsTrigger 
              value="PATIENT" 
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <User className="w-4 h-4" />
              Patient
            </TabsTrigger>
            <TabsTrigger 
              value="COUNSELOR"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Stethoscope className="w-4 h-4" />
              Counselor
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-sm font-bold text-destructive animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-bold ml-1 text-sm uppercase tracking-wider">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Dr. Sarah Johnson"
              {...register('name')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-bold ml-1 text-sm uppercase tracking-wider">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs font-bold text-destructive ml-1">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-bold ml-1 text-sm uppercase tracking-wider">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min. 6 characters"
              {...register('password')}
            />
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
                Processing...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-muted-foreground font-medium">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-primary hover:underline transition-all">
              Sign in
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Suspense fallback={
        <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-border rounded-[2.5rem] overflow-hidden bg-card">
          <CardContent className="flex items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </CardContent>
        </Card>
      }>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
