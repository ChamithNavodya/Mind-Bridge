'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Search, Calendar, Heart, MapPin, Filter, Star } from 'lucide-react';
import { BottomNav } from '@/components/ui/BottomNav';

export default function ExplorePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'PATIENT') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      {/* Search Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-sm font-heading">M</span>
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-foreground hidden sm:block">MindBridge</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground mr-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              {user.email}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="font-semibold text-muted-foreground hover:text-destructive">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
            Find Your <span className="text-primary">Counselor</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Browse our network of licensed mental health professionals and find the perfect match for your journey.
          </p>
        </div>

        {/* Search Bar & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch p-2 bg-card rounded-2xl border border-border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, specialty, or concern..."
              className="w-full h-14 pl-12 pr-4 rounded-xl border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 text-lg"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-14 px-6 border-2 font-bold text-muted-foreground">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
            <Button className="h-14 px-8 font-bold text-lg shadow-lg shadow-primary/20">
              Search
            </Button>
          </div>
        </div>

        {/* Counselor Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Dr. Sarah Mitchell",
              role: "Licensed Clinical Psychologist",
              exp: "15 years experience",
              next: "Tomorrow",
              specialties: ["Anxiety", "Depression", "CBT"],
              img: "15"
            },
            {
              name: "Dr. Michael Chen",
              role: "Licensed Marriage & Family Therapist",
              exp: "10 years experience",
              next: "Today",
              specialties: ["Relationships", "Trauma", "Family"],
              img: "11"
            },
            {
              name: "Dr. Emily Rodriguez",
              role: "Licensed Professional Counselor",
              exp: "8 years experience",
              next: "In 2 days",
              specialties: ["Grief", "Transitions", "Growth"],
              img: "16"
            }
          ].map((counselor, idx) => (
            <Card key={idx} className="group border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-inner ring-4 ring-background">
                    <Image
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${counselor.img}`}
                      alt={counselor.name}
                      fill
                      sizes="80px"
                    />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary/5 rounded-full text-primary font-bold text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    4.9
                  </div>
                </div>
                <div className="pt-4">
                  <CardTitle className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                    {counselor.name}
                  </CardTitle>
                  <CardDescription className="font-medium text-muted-foreground">
                    {counselor.role}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {counselor.specialties.map(s => (
                    <span key={s} className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-lg text-xs font-bold uppercase tracking-wider">
                      {s}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    Next available: <span className="text-primary">{counselor.next}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    Virtual Office • $120/hr
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button variant="outline" className="border-2 font-bold hover:bg-secondary/10">
                    Profile
                  </Button>
                  <Button className="font-bold shadow-lg shadow-primary/10">
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Matching Banner */}
        <Card className="border-0 shadow-2xl shadow-primary/10 bg-linear-to-r from-primary/10 to-secondary/10 rounded-[2.5rem] overflow-hidden group">
          <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-8 sm:p-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-2xl font-bold font-heading text-foreground mb-2">Need help finding the right match?</h3>
              <p className="text-muted-foreground font-medium">Our guided matching algorithm suggests counselors based on your unique goals.</p>
            </div>
            <Button className="h-14 px-10 font-bold text-lg shadow-xl shadow-primary/10 group-hover:px-12 transition-all">
              Get Matched
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
