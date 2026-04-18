import Hero from '@/components/sections/Hero';
import Impact from '@/components/sections/Impact';
import WhatWeDo from '@/components/sections/WhatWeDo';
import Programme from '@/components/sections/Programme';
import Standards from '@/components/sections/Standards';
import Mission from '@/components/sections/Mission';
import Faq from '@/components/sections/Faq';
import Testimonial from '@/components/sections/Testimonial';
import Blog from '@/components/sections/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <WhatWeDo />
      <Programme />
      <Standards />
      <Mission />
      <Faq />
      <Testimonial />
      <Blog />
    </main>
  );
}