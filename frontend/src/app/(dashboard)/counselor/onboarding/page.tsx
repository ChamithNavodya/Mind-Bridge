'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, User, FileText, Video } from 'lucide-react';
import Link from 'next/link';

export default function CounselorOnboarding() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'COUNSELOR') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'COUNSELOR') {
    return null;
  }

  const steps = [
    { icon: User, title: 'Complete Your Profile', description: 'Add your photo, bio, and professional background' },
    { icon: FileText, title: 'Upload Credentials', description: 'Verify your licenses and certifications' },
    { icon: Video, title: 'Set Your Availability', description: 'Define your working hours and session types' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">MindBridge</span>
          </div>
          <Button variant="outline" onClick={logout} size="sm">
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to MindBridge, {user.name || 'Counselor'}!
          </h1>
          <p className="text-lg text-slate-600">
            Let&apos;s get you set up to start helping patients. Complete these steps to activate your counselor profile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-emerald-900" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg bg-emerald-50">
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-900 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900">Account Verified</h3>
              <p className="text-sm text-slate-600">Your account is active and ready to use</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/dashboard/counselor">
            <Button size="lg" className="bg-emerald-900 hover:bg-emerald-800 text-white">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
