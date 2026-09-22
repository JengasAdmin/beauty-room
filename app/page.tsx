import { AiChatModal, AiSection } from '@/components/ai-chat';
import { BeautyThirty } from '@/components/beauty-30';
import { Consultations } from '@/components/consultations';
import { Fitness } from '@/components/fitness';
import { Founder } from '@/components/founder';
import { HairTest } from '@/components/hair-test';
import { Hero } from '@/components/hero';
import { HoroscopeFull } from '@/components/horoscope-full';
import { Journal } from '@/components/journal';
import { Reviews } from '@/components/reviews';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TodayForYou } from '@/components/today-for-you';
import { ChatProvider } from '@/lib/chat-context';

export default function Home() {
  return (
    <ChatProvider>
      <SiteHeader />
      <main>
        <Hero />
        <TodayForYou />
        <HoroscopeFull />
        <Fitness />
        <Journal />
        <BeautyThirty />
        <HairTest />
        <Consultations />
        <Founder />
        <AiSection />
        <Reviews />
      </main>
      <SiteFooter />
      <AiChatModal />
    </ChatProvider>
  );
}
