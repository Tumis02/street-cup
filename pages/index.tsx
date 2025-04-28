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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <RulesSection />
        <HistorySection />
        <GallerySection />
        <RegistrationSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
} 