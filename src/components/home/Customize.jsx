'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img from '/public/home/pla.jpg';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function Customize() {

    const [lang, setLang] = useState('en');

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
        <section className='customize-sec' style={{ direction: lang === 'en' ? 'ltr' : 'rtl' ,backgroundImage:`url(${img.src})`}}>
            <div className="overlay"></div>
            <div className="container m-auto relative z-10">
                <h2>{lang=='en'?"You can customize your trip now ":"يمكنك تخصيص رحلتك الان"}</h2>
                <h4>{lang == 'en' ? "We will get in touch with you" : "سنتصل بيك على الفور"}</h4>
                <div className="btns">
                    <Link  href={`https://wa.me/${whatsapp}?text=Hello, Can you assist me?!`} className='book-link '>
                        <span>{lang === 'en' ? 'Contact us' : 'اتصل بنا'}</span>
                       
                    </Link>
                </div>
            </div>
        </section>
    );
}