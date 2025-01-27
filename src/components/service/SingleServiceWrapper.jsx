'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img from '/public/home/explore.png';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import SingleServiceGallery from './SingleServiceGallery';
import SingleServiceImages from './SingleServiceImages';
import Packages from './Packages';
import Customize from '../home/Customize';

export default function SingleServiceWrapper() {
    const searchParams = useSearchParams()
    const [pathId, setPathId] = useState(searchParams.get('id'))
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
    const [contact, setContact] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: localStorage.getItem('lang'), // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/services/${pathId}`
            , {
                headers: headers,
            }).then(response => {
                setData(response.data.data);  // Set the response data to state

            })
            .catch(error => {
                setError(error);  // Handle any errors
                console.error('Error fetching data:', error);
            });
        axios.get(`${API_BASE_URL}/landing/home/contacts`
            , {
                headers: headers,
            }).then(response => {
                setContact(response.data.data);  // Set the response data to state
                for (let index = 0; index < response.data.data.length; index++) {
                    if (response.data.data[index].type == "whatsapp") {
                        setWhatsapp(response.data.data[index].value);
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
        <section className={`${lang === 'en' ? 'ltr' : 'rtl'} single-servise`}>
            <div className="single-service">

                {loading ? <Loading /> :
                    <div className="container m-auto">
                        <SingleServiceGallery data={data} lang={lang} />
                        <SingleServiceImages data={data} lang={lang} />
                        <Packages data={data} lang={lang} contact={contact} whatsapp={whatsapp} />
                        <Customize />
                    </div>
                }
            </div>
        </section>
    );
}