'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import { motion } from 'framer-motion';

export default function Explore() {

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

    return (
        <>
            {
                loading ? <Loading /> :
                    <section className={`${lang === 'en' ? 'ltr' : 'rtl'} explore `}>
                        <div className="container m-auto">
                            <div className="explore-cont">
                                <h3 className='sec-title'>{lang === 'en' ? 'Explore the world' : 'استكشاف العالم'}</h3>
                                <Swiper
                                    // navigation
                                    // pagination={{ type: "bullets", clickable: true }}
                                    spaceBetween={24}
                                    slidesPerView={7.5}
                                    autoplay={false}
                                    dir={lang == 'en' ? 'ltr' : 'rtl'}
                                    loop={true}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    breakpoints={{
                                        1400: {
                                            slidesPerView: 3,
                                        },
                                        1100: {
                                            slidesPerView: 3,
                                        },
                                        767: {
                                            slidesPerView: 2.5,
                                        },
                                        768: {
                                            slidesPerView: 2.5,
                                            autoplay: false,
                                        },
                                        640: {
                                            slidesPerView: 2.1,
                                            autoplay: false,
                                            spaceBetween: 16
                                        },
                                        100: {
                                            slidesPerView: 1.1,
                                            autoplay: false,
                                            spaceBetween: 16

                                        }
                                    }}
                                >
                                    {data.map((item, index) =>
                                        <SwiperSlide key={item.id}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: .3 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    type: 'spring',
                                                    bounce: 0.2,
                                                    duration: index + 1 * .5,
                                                }}
                                                viewport={{ once: true }}
                                                className={lang == 'en' ? 'ltr exp-card' : 'rtl exp-card'}>
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
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                                <Link href="/explore" className='serv-link' >
                                    <span>{lang === 'en' ? 'Read more ' : 'قراءة المزيد'}</span>
                                    <i className='fa-solid fa-chevron-down'></i>
                                </Link>
                            </div>

                        </div>
                    </section>
            }
        </>
    );
}