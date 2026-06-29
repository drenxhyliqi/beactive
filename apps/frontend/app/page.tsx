import { SiteHeader } from '@/components/landing/SiteHeader';
import { Hero } from '@/components/landing/Hero';
import { LivePreview } from '@/components/landing/LivePreview';
import { InteractionShowcase } from '@/components/landing/InteractionShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Faq } from '@/components/landing/Faq';
import { JoinStrip } from '@/components/landing/JoinStrip';
import { CtaSection } from '@/components/landing/CtaSection';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function LandingPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <LivePreview />
          <InteractionShowcase />
          <HowItWorks />
          <Faq />
          <JoinStrip />
          <CtaSection />
        </main>
        <SiteFooter />
      </div>

      {/* Continuous film-grain across the whole page — one fixed layer so it never cuts at
          section boundaries. */}
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.3] mix-blend-soft-light"
      />
    </>
  );
}
