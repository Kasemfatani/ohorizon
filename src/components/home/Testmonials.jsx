'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img from '/public/home/explore.png';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';

export default function Testmonials() {

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
        axios.get(`${API_BASE_URL}/landing/home/testimonials`
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
                    <section className={`${lang === 'en' ? 'ltr' : 'rtl'} Testmonials `}>
                        <div className="container m-auto">
                            <div className="explore-cont">
                                <h3 className='sec-title'>{lang === 'en' ? 'Testimonials' : 'قالوا عنا'}</h3>
                               <Swiper
                                    // navigation
                                    // pagination={{ type: "bullets", clickable: true }}
                                    spaceBetween={0}
                                    slidesPerView={7.5}
                                    autoplay={true}
                                    dir='ltr'
                                    loop={true}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    breakpoints={{
                                        1400: {
                                            slidesPerView: 1,
                                        },
                                        1100: {
                                            slidesPerView: 1,
                                        },
                                        767: {
                                            slidesPerView: 1,
                                        },
                                        768: {
                                            slidesPerView: 1,
                                            autoplay: false,
                                        },
                                        640: {
                                            slidesPerView: 1,
                                            autoplay: false,
                                            spaceBetween: 16
                                        },
                                        100: {
                                            slidesPerView: 1,
                                            autoplay: false,
                                            spaceBetween: 16

                                        }
                                    }}
                                >
                                    {data.map((item , idx) =>
                                        <SwiperSlide key={idx}>
                                            <div className={`tetmonials-body ${lang === 'en' ? 'ltr' : 'rtl'}`}>
                                                    <div className="person">
                                                        <div className="img-cont">
                                                            <Image src={item.image} alt="Mazar" width={200} height={200} />
                                                        </div>
                                                        <div className="name">
                                                            <h4>{item.name}</h4>
                                                            <span>{item.position}</span>
                                                        </div>
                                                    </div>
                                                    <p>{item.description}</p>
                                            </div>
                                        </SwiperSlide>
                                        
                                    )}
                                </Swiper>
                            </div>

                        </div>
                    </section>
            }
        </>
    );
}