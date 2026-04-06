'use client';

import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MessageSquare, Heart, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PatientDashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight leading-tight">
          Welcome back, <span className="text-primary italic">{user.name?.split(' ')[0] || 'there'}</span>!
        </h1>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          Your mental health journey continues here. How are you feeling today?
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Upcoming Sessions",
            value: "0",
            desc: "No sessions scheduled",
            icon: Calendar,
            color: "text-primary bg-primary/10"
          },
          {
            title: "Active Counselors",
            value: "0",
            desc: "No active connections",
            icon: MessageSquare,
            color: "text-secondary-foreground bg-secondary/20"
          },
          {
            title: "Wellness Score",
            value: "--",
            desc: "Take an assessment",
            icon: Heart,
            color: "text-accent-foreground bg-accent/10"
          }
        ].map((stat, idx) => (
          <Card key={idx} className="border-border hover:shadow-lg transition-all duration-300 rounded-[2rem] bg-card overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
              <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform duration-300", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-heading text-foreground">{stat.value}</div>
              <p className="text-sm font-medium text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-2xl shadow-primary/10 bg-linear-to-br from-primary to-primary/80 rounded-[2.5rem] overflow-hidden group">
          <CardHeader className="p-8 pb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md group-hover:scale-110 transition-transform">
              <Search className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold font-heading text-white">Find a Counselor</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg leading-relaxed mt-2">
              Browse our directory of verified professionals and find someone who truly understands you.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <Link href="/explore">
              <Button variant="secondary" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Explore Directory
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 rounded-[2.5rem] flex flex-col justify-center items-center p-12 text-center group cursor-pointer">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-foreground mb-2">My Requests</h3>
          <p className="text-muted-foreground font-medium mb-6">Manage your ongoing negotiations and consultation requests.</p>
          <Button variant="ghost" className="font-bold hover:bg-transparent hover:text-primary p-0">
            View All Requests <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
