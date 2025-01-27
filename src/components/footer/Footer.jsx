'use client'
import React, { useEffect, useState } from 'react'; // Importing React to use JSX syntax and create components.
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';


export default function Footer() { // Defining the main functional component named 'Footer'.
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
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
        axios.get(`${API_BASE_URL}/landing/home/social-media`
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
        <footer className={`${language === 'en' ? 'ltr' : 'rtl'}`}> {/* Main footer container with padding and background color */}

            <div className="container m-auto footer-main"> {/* Container for the footer content */}
                <div className="footer-cont">
                    <div className="copyRight">
                        <i className="fa-regular fa-copyright"></i>
                        <p>{language === 'en' ? 'All rights reserved for O.Horizon. 2025' : 'جميع الحقوق محفوظة لــ  O.Horizon. 2025'} </p>
                    </div>
                    <div className="social">
                        {
                            data?.map((item, index) =>
                                item.type === 'toursim' ? null :
                                    <Link href={item.value} key={index}><i className={`fa-brands fa-${item.type}`}></i></Link>
                            )
                        }
                    </div>
                </div>
                <div className="copyRight">
                {
                            data?.map((item, index) =>
                                item.type === 'toursim' ?
                                    <p>{language === 'en' ? `Tourism Ministry license number: ${item.value}` : `رقم ترخيص وزارة السياحة: ${item.value} `}</p>
                                    : null
                            )
                        }
                </div>
            </div>
        </footer>
    )
}
