'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/apiConfig';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BlurFade from '../ui/blur-fade';
import axios from 'axios';
import Loading from '@/app/loading';

export default function Parteners() {
    const [lang, setLang] = useState('en');  // Default lang is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected lang
            setLang(localStorage.getItem('lang'));
        }
    }, []);  // Run this effect whenever the `lang` changes
    Fancybox.bind("[data-fancybox]", {
    });

    let [activeTab, setActiveTab] = useState('all');


    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/galleries`
            , {
                headers: headers,
            }).then(response => {
                setData(response.data.data);  // Set the response data to state
                setLoading(false);  // Set loading to false

            })
            .catch(error => {
                setError(error);  // Handle any errors
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes


    return (
        <>
            {
                loading ? <Loading /> :
                    <section className="gallery" id='gallery' style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
                        <div className="container mx-auto">
                            <h3 className='sec-title'>{lang === 'en' ? 'From recent trips' : ' من أحدث الرحلات'}</h3>
                            <div className="tabs">
                                <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{lang === 'en' ? 'All' : 'الكل'}</button>
                                <button className={`tab ${activeTab === 'image' ? 'active' : ''}`} onClick={() => setActiveTab('image')}>{lang === 'en' ? 'Images' : 'الصور'}</button>
                                <button className={`tab ${activeTab === 'video' ? 'active' : ''}`} onClick={() => setActiveTab('video')}>{lang === 'en' ? 'Videos' : 'الفيديوهات'}</button>
                            </div>
                            <section id="photos">
                                <div className="columns-2 gap-4 sm:columns-3">
                                    {data.map((img, idx) => (
                                        (img.type === activeTab || activeTab === 'all') ?
                                            <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
                                                <a href={img.image} data-fancybox="gallery">
                                                    <figure>
                                                        <Image src={img.image} alt="Mazar" width={200} height={200} className="mb-4 w-full max-h-96   rounded-lg object-cover aspect-auto" />
                                                    </figure>
                                                </a>
                                            </BlurFade>
                                            :
                                            null

                                    ))}
                                </div>
                            </section>
                        </div>
                    </section>
            }
        </>
    )
}
