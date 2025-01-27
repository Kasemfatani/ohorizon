'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  let [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en') {
        setLang(localStorage.getItem('lang'));
      }
      else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, [lang]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [data, setData] = useState(null);
  const [whatsapp, setWhatsapp] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    const headers = {
      lang: localStorage.getItem('lang'), // Change language dynamically based on state
    };
    // Fetch data from the API with Axios
    axios.get(`${API_BASE_URL}/landing/home/contacts`
      , {
        headers: headers,
      }).then(response => {

        setData(response.data.data);  // Set the response data to state
        for (let index = 0; index < response.data.data.length; index++) {
          if (response.data.data[index].type == 'whatsapp') {
            setWhatsapp(response.data.data[index].value)
          }

        }
        setLoading(false);  // Set loading to false

      })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });
  }, []);  // Run this effect whenever the `language` changes
  return (
    <header className={`${lang === 'en' ? 'ltr' : 'rtl'} header`} >
      <div className="container m-auto flex items-center gap-2 justify-between">
        <Link href="/"> <Image src={logo} alt="logo" className="logo-img" /></Link>
        <div className="links">
          <Link href="/#who" className={pathname === '/#who' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'About us' : 'من نحن'}</Link>
          <Link href="/explore" className={pathname === '/explore' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Services' : 'خدمات'}</Link>
          <Link href="/events" className={pathname === '/events' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Events' : 'الاحداث'}</Link>
          {/* <Link href="/#blogs" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Blogs' : 'المدونات'}</Link> */}
          <Link  href={`https://wa.me/${whatsapp}?text=Hello, Can you assist me?!`} className='book-link' >{lang === 'en' ? 'Contact us' : 'اتصل بنا'}</Link>
          <div
            className="lang-btn"
            onClick={() => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'ar');
                setLang('ar');
              } else {
                localStorage.setItem('lang', 'en');
                setLang('en');
              }
              window.location.reload(); // Reloads the page
            }}
          >
            <i className="fa-solid fa-globe"></i>
          </div>
        </div>
        <i className='fa-solid fa-bars menu-bars' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} ></i>
        <i className='fa-solid fa-xmark menu-bars-X hidden' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} ></i>
        <div className="side-menu" onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }}>
           <div className="links">
          <Link href="/#who" className={pathname === '/#who' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'About us' : 'من نحن'}</Link>
          <Link href="/explore" className={pathname === '/explore' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Services' : 'خدمات'}</Link>
          <Link href="/events" className={pathname === '/events' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Events' : 'الاحداث'}</Link>
          {/* <Link href="/#blogs" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Blogs' : 'المدونات'}</Link> */}
          <Link  href={`https://wa.me/${whatsapp}?text=Hello, Can you assist me?!`} className='book-link' >{lang === 'en' ? 'Contact us' : 'اتصل بنا'}</Link>
          <div
            className="lang-btn"
            onClick={() => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'ar');
                setLang('ar');
              } else {
                localStorage.setItem('lang', 'en');
                setLang('en');
              }
              window.location.reload(); // Reloads the page
            }}
          >
            <i className="fa-solid fa-globe"></i>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}