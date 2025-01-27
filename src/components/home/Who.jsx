'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img from '/public/home/about.png';
import bullet from '/public/home/bullet.svg';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import { motion } from 'framer-motion';



export default function Who() {
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
        axios.get(`${API_BASE_URL}/landing/home/who-we-are`
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
                    <section className={`${lang === 'en' ? 'ltr' : 'rtl'} hero-main why`} id='who'>
                        <div className="container m-auto">
                            <div className="hero" >
                                <motion.div
                                    initial={{ opacity: 0, x: 200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="r-side">
                                    <div className="img-cont">
                                        <Image src={img} width={500} height={500} alt="Mazar" className="img-hero" />
                                        {/* <Image src={data?.who_we_are.image} width={500} height={500} alt="Mazar" className="img-hero" /> */}
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="l-side">
                                    <h3 className='sec-title'>{data?.who_we_are.title}</h3>
                                    <p className='who-p'>  {data?.who_we_are.description}  </p>
                                </motion.div>
                            </div>
                            <div className="why-choose">
                                <h3 className='sec-title'>{lang === 'en' ? 'Why to chose us ?' : 'لماذا تختارنا ؟'}</h3>
                                <div className="grid">
                                    {
                                        data.why_choose_us.map((item, index) =>
                                            <motion.div
                                                initial={{ opacity: 0, x: 300 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    type: 'spring',
                                                    bounce: 0.2,
                                                    duration: index * .5,
                                                }}
                                                viewport={{ once: true }}
                                                className="option" key={index}>
                                                <div className="title">
                                                    <Image src={bullet} alt="o. horizon" />
                                                    <h4>{item.title}</h4>
                                                </div>
                                                <p className='body-option'>{item.description}</p>
                                            </motion.div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </section >
            }
        </>
    );
}