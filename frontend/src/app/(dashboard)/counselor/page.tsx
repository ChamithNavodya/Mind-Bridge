'use client';

import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Shield, Settings, UserPlus, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CounselorDashboard() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight leading-tight">
          Counselor <span className="text-primary italic">Workspace</span>
        </h1>
        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
          Manage your path to helping others. Review requests and schedule sessions.
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Active Patients",
            value: "0",
            desc: "No active patients yet",
            icon: UserPlus,
            color: "text-primary bg-primary/10"
          },
          {
            title: "Upcoming Sessions",
            value: "0",
            desc: "No sessions scheduled",
            icon: Calendar,
            color: "text-secondary-foreground bg-secondary/20"
          },
          {
            title: "Profile Status",
            value: "Verified",
            desc: "Ready to accept cases",
            icon: Shield,
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

      <Card className="border-0 shadow-2xl shadow-primary/10 bg-card rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 pb-2">
          <CardTitle className="text-2xl font-bold font-heading text-foreground">Quick Actions</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">Streamline your workflow with these shortcuts.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: UserPlus, label: "Review Join Requests", color: "hover:border-primary/30 hover:bg-primary/5" },
              { icon: Calendar, label: "Manage Availability", color: "hover:border-secondary-foreground/30 hover:bg-secondary/10" },
              { icon: FileText, label: "View Session History", color: "hover:border-accent/30 hover:bg-accent/5" },
              { icon: Settings, label: "Account Settings", color: "hover:border-foreground/20 hover:bg-muted/50" }
            ].map((action, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                className={cn("h-auto py-6 px-6 justify-between border-2 rounded-2xl group transition-all", action.color)}
              >
                <div className="flex items-center gap-4">
                  <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-lg font-bold">{action.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
