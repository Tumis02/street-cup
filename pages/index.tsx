import React from 'react'
import AboutSection from '@/components/AboutSection'
import RulesSection from '@/components/RulesSection'
import GallerySection from '@/components/GallerySection'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import HistorySection from '@/components/HistorySection'
import RegistrationSection from '@/components/RegistrationSection'
import ContactSection from '@/components/ContactSection'
import SponsorsSection from '@/components/SponsorsSection'
import Footer from '@/components/Footer'
import historyData from '../data/history.json'

export default function Home() {
  // Získání nejnovějšího ročníku pro galerii
  const latestYear = [...historyData]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))[0];

  return (
    <div className="min-h-screen flex flex-col">
        <HeroSection />
        <AboutSection />
        <HistorySection />
        {latestYear && <GallerySection yearData={latestYear} />}
        <RegistrationSection />
        <RulesSection />

        {/* <SponsorsSection /> */}
        <ContactSection />
    </div>
  )
}