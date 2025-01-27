'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
export default function Parteners() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            // Define the headers with the selected language
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    }, []);

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/partners`
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
    const ReviewCard = ({
        image,
    }) => {
        return (
            <figure
                className={cn(

                )}
            >
                <div className="part-cont" >
                    <Image src={image} alt="Mazar" width={200} height={200} />
                </div>
            </figure>
        );
    };

    return (
        <div className="parteners" style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>

            {
                loading ? <Loading /> :
                    <div className="parts-cont">
                        <div className="partss" style={{ direction: 'ltr' }}>
                            <div className="relative flex w-full flex-col items-center gap-12 justify-center overflow-hidden">
                                <Marquee pauseOnHover className="[--duration:20s]">
                                    {data.map((review, index) => (
                                        <ReviewCard key={index} {...review} />
                                    ))}
                                </Marquee>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
