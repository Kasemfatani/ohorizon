'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img from '/public/home/hero.jpg';
import dotted from '/public/home/dotted.svg';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
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
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/sliders`
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
        <section className={`${lang === 'en' ? 'ltr' : 'rtl'} hero-main `}>
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <Swiper
                            // navigation
                            // pagination={{ type: "bullets", clickable: true }}
                            spaceBetween={24}
                            slidesPerView={1}
                            autoplay={false}
                            dir={lang == 'en' ? 'ltr' : 'rtl'}
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
                            {data.map((item,index) =>
                                <SwiperSlide key={index}>
                                    <div className="hero" >
                                        <div className="l-side">
                                            <h3 className='sec-title'>{item.title}</h3>
                                            {
                                                <h2>{item.description.slice(0, -5)}<span>{item.description.slice(-5)}</span></h2>
                                                  
                                            }
                                            <p>{item.sub_title}</p>
                                            <div className="btns">
                                                <Link href="/explore" className='book-link' >{lang === 'en' ? 'Find out more ' : 'تعرف على المزيد'}</Link>
                                                <Link href="/explore" className='book-link sec-book-link' >{lang === 'en' ? 'Customize a package ' : 'تخصيص رحلة'}</Link>
                                            </div>
                                        </div>
                                        <div className="r-side">
                                            <div className="img-cont">
                                                {/* <Image src={dotted} alt="Mazar" className="dotted dotted-1" />
                                                <Image src={dotted} alt="Mazar" className="dotted dotted-2" /> */}
                                                <Image src={item.image} width={400} height={400} alt="Mazar" className="img-hero" />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>

                    </div>
            }
        </section>
    );
}