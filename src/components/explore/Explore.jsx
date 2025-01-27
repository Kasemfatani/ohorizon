'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import { motion } from 'framer-motion';
export default function Explore() {

    const [lang, setLang] = useState('en');
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/services`
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
    return (
        <section className={`${lang === 'en' ? 'ltr' : 'rtl'} explore mt-10`}>
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <div className="explore-cont">
                            <h3 className='sec-title'>{lang === 'en' ? 'Explore our services' : 'استكشف خدماتنا'} </h3>
                            <div className="grid">
                                {
                                    data.map((item, index) =>
                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: 'spring',
                                                bounce: 0.2,
                                                duration: .5,
                                            }}
                                            viewport={{ once: true }}
                                            className={lang == 'en' ? 'ltr exp-card' : 'rtl exp-card'} key={index}>
                                            <div className="img-cont">
                                                <Image src={item.cover} width={100} height={100} alt='S Horizon' />
                                            </div>
                                            <div className="text">
                                                <h4>{item.name}</h4>
                                                <p>{item.short_description}</p>
                                            </div>
                                            <div className="btns">
                                                <Link href={`/service?id=${item.id}`} className='book-link explore-btn' >
                                                    <span>{lang === 'en' ? 'Read more ' : 'قراءة المزيد'}</span>
                                                    <i className={lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'}></i>
                                                </Link>

                                            </div>
                                        </motion.div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
            }
        </section>
    );
}