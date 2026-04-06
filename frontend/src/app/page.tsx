import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, Shield, ChevronRight, Star, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-primary text-sm font-semibold mb-2">
                  <Star className="w-4 h-4 fill-primary" />
                  <span>Trusted by 10,000+ individuals</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading text-foreground leading-[1.1] tracking-tight">
                  Professional Support,{' '}
                  <span className="text-primary italic">Right Where You Are</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                  Connect with licensed mental health counselors through secure, confidential video sessions. Professional therapy designed for your life.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link href="/register?role=patient" className="w-[200px] sm:w-auto">
                    <Button size="lg" className="w-full sm:h-14 sm:px-8 text-lg font-bold shadow-xl shadow-primary/20">
                      Find a Counselor
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/register?role=counselor" className="w-[200px] sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:h-14 sm:px-8 text-lg font-bold border-2 hover:bg-secondary/10 transition-all">
                      Join as a Counselor
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-200 overflow-hidden shadow-sm">
                        <Image
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                          alt="User avatar"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="flex text-amber-500 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground font-medium">4.9/5 based on 2,000+ reviews</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10" />
                
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
                  <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000"
                    alt="Compassionate counseling session in a bright office"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  />
                  
                  {/* Floating Action/Info Cards */}
                  <div className="absolute top-6 right-6 hidden sm:block">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 animate-bounce-slow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">Secure & Private</p>
                          <p className="text-xs text-muted-foreground font-sans">HIPAA Compliant Session</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 sm:py-32 bg-card relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
                Your Journey to Wellness in <span className="text-primary italic">Three Simple Steps</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;ve simplified the path to professional support. No friction, no judgment—just the care you deserve.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {[
                {
                  icon: Search,
                  title: "Discovery & Matching",
                  desc: "Browse our directory of verified experts. Filter by specialty and find the perfect fit for your specific needs.",
                  color: "bg-primary/10 text-primary"
                },
                {
                  icon: MessageCircle,
                  title: "Smart Consultation",
                  desc: "Share your mental state securely. Negotiate terms and ensure a mutual fit before any final commitment.",
                  color: "bg-secondary-foreground/10 text-secondary-foreground"
                },
                {
                  icon: Shield,
                  title: "Private Fulfillment",
                  desc: "Meet in our high-definition, encrypted virtual office. Secure payments handled via Stripe integration.",
                  color: "bg-accent/10 text-accent-foreground"
                }
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-primary/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  <div className="p-8 sm:p-10 text-center sm:text-left">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 shadow-inner group-hover:scale-110 transition-transform duration-300", step.color)}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-tight">
              Ready to start your <br className="hidden sm:block" /> healing journey?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
              Take the first step toward a healthier mind today. Our compassionate counselors are ready to support your unique path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="h-16 px-10 text-lg font-bold shadow-2xl hover:scale-105 transition-all">
                  Get Started for Free
                </Button>
              </Link>
              <p className="text-sm font-medium opacity-70 sm:ml-4">No credit card required to browse</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

