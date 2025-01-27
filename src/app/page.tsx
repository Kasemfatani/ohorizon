'use client'
import React, { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero'
import Parteners from '@/components/home/Parteners'
import Who from '@/components/home/Who'
import Explore from '@/components/home/Explore'
import Customize from '@/components/home/Customize'
import Gallery from '@/components/home/Gallery'
import Testmonials from '@/components/home/Testmonials'
import Contact from '@/components/home/Contact'

export default function Home() {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang')==='ar') {
        setLang('ar');
      }
      else if (localStorage.getItem('lang')==='en') {
        setLang('en');
      }
      else{
        localStorage.setItem('lang', 'en');
      }
    }
  }, []);
  return (
    <>
      <Hero />
      <Parteners />
      <Who />
      <Explore />
      <Customize/>
      <Gallery />
      <Testmonials />
      <Contact />
    </>
  );
}
