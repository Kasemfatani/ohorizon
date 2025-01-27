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
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import { motion } from 'framer-motion';

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
        <>
            {
                loading ? <Loading /> :
                    <section className={`contact ${lang === 'ar' ? 'rtl' : 'ltr'}`} id='Contact'>
                        <a href={`https://wa.me/${whatsapp}?text=Hello, Can you assist me?!`} className="fixed-what">
                            <i className="fa-brands fa-whatsapp"></i>
                        </a>
                        <div className="container m-auto">
                            <h3 className='sec-title'>{lang === 'ar' ? "تواصل معنا" : "Get in touch with us "}</h3>
                            {/* <h4>{lang === 'ar' ? "يمكنك التواصل معنا من خلال" : "you can reach us through"} </h4> */}
                            {/* <h2>OS horizon</h2> */}
                            <div className="contact-cont">
                                {
                                    data?.map((item, index) =>

                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: 'spring',
                                                bounce: 0.2,
                                                duration: index+1 * .5,
                                            }}
                                            viewport={{ once: true }}
                                            className=""
                                            key={index}>
                                            {
                                                item.type == 'mobile' ?
                                                    <Link href={`tel:${item.value}`}>
                                                        <span>{item.value}</span>
                                                        {/* <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`} style={lang === 'ar' ? { transform: 'rotate(45deg)' } : { transform: 'rotate(-45deg)' }}></i> */}
                                                        <i className="fa-solid fa-square-phone-flip"></i>
                                                    </Link>
                                                    :
                                                    item.type == 'email' ?
                                                        <Link href={`mailto:${item.value}`}>
                                                            <span>{item.value}</span>
                                                            {/* <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`} style={lang === 'ar' ? { transform: 'rotate(45deg)' } : { transform: 'rotate(-45deg)' }}></i> */}
                                                            <i className="fa-solid fa-square-envelope"></i>
                                                        </Link>
                                                        :
                                                        item.type == 'address' ?
                                                            // <p>
                                                            //     {item.value}
                                                            // </p>
                                                            null
                                                            : item.type == 'whatsapp' ?
                                                                <Link href={`https://wa.me/${item.value}?text=Hello, Can you assist me?!`}>
                                                                    <span>{item.value}</span>
                                                                    {/* <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`} style={lang === 'ar' ? { transform: 'rotate(45deg)' } : { transform: 'rotate(-45deg)' }}></i> */}

                                                                    <i className="fa-brands fa-square-whatsapp"></i>
                                                                </Link>
                                                                : null}
                                        </motion.div>
                                    )
                                }
                            </div>
                        </div>
                    </section>
            }
        </>
    );
}