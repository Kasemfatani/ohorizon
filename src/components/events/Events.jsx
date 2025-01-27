'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function Events() {

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
        axios.get(`${API_BASE_URL}/landing/home/events`
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
    function formatDate(inputDate) {
        // Parse the input date
        const date = new Date(inputDate);

        // Define an array for month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract day, month, and year
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Determine the suffix for the day (st, nd, rd, th)
        const suffix = (day % 10 === 1 && day !== 11) ? "st" :
            (day % 10 === 2 && day !== 12) ? "nd" :
                (day % 10 === 3 && day !== 13) ? "rd" : "th";

        // Format the date as "21st Jan 2024"
        return `${day}${suffix} ${month} ${year}`;
    }
    function formatTime(inputTime) {
        // Split the input time into hours, minutes, and seconds
        const [hour, minute] = inputTime.split(":").map(Number);

        // Determine AM or PM
        const ampm = hour >= 12 ? "PM" : "AM";

        // Convert 24-hour time to 12-hour time
        const formattedHour = hour % 12 || 12; // Handle 12-hour format (0 should be 12)

        // Format the time as "3:10 PM"
        return `${ampm} ${formattedHour}:${minute.toString().padStart(2, "0")} `;
    }
    return (
        <section className={`${lang === 'en' ? 'ltr' : 'rtl'} explore mt-10`}>
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <div className="explore-cont">
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
                                            className={lang == 'en' ? 'ltr exp-card card-event' : 'rtl exp-card card-event'} key={index}>
                                            <div className="img-cont img-envents-grid">
                                                <div className="overlay">
                                                    {
                                                        <div className="text">
                                                            <h4 className='text-white text-2xl font-semibold'>{item.name}</h4>
                                                            <h4 className='text-white text-2xl font-semibold'>{formatDate(item.date)}</h4>
                                                            <h4 className='text-white text-2xl font-semibold'>{formatTime(item.time)}</h4>
                                                        </div>
                                                    }
                                                </div>
                                                <Image src={item.cover} width={100} height={100} alt='S Horizon' />
                                            </div>
                                            <div className="text">
                                                <h4>{item.name}</h4>
                                                <p>{item.short_description}</p>
                                            </div>
                                            {/* <div className="btns">
                                                <Link href={`/service?id=${item.id}`} className='book-link explore-btn' >
                                                    <span>{lang === 'en' ? 'Read more ' : 'قراءة المزيد'}</span>
                                                    <i className={lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'}></i>
                                                </Link>

                                            </div> */}
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