'use client'

import Hero from '@/components/Hero'
import TutorialSection from '@/components/TutorialSection'
import WhySettle from '@/components/WhySettle'
import ProblemSolution from '@/components/ProblemSolution'
import HowItWorks from '@/components/HowItWorks'
import FutureVision from '@/components/FutureVision'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CostCalculator from '@/components/CostCalculator'
import { MarketingLayout } from '@/components/marketing/layout'

export default function HomePage() {
  return (
    <MarketingLayout>
      <Hero />
      <TutorialSection />
      <WhySettle />
      <ProblemSolution />
      <HowItWorks />
      <FutureVision />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <CostCalculator />
      <FAQ />
    </MarketingLayout>
  )
} 