import React from 'react';
import Image from 'next/image';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
export default function Packages({ data, lang, contact, whatsapp }) {
    Fancybox.bind("[data-fancybox]", {
    });

    return (
        <section className="gallery single-servise-images packages" id='gallery' style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
            <div className="container mx-auto">
                <h4>{lang === 'en' ? 'Explore our packages' : 'تصفح باقاتنا'}</h4>

                <div className="packages-cont">
                    <Swiper
                        // navigation
                        // pagination={{ type: "bullets", clickable: true }}
                        spaceBetween={24}
                        slidesPerView={3}
                        autoplay={true}
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
                        {data?.packages.map((item) =>
                            <SwiperSlide key={item.id}>
                                <div className={lang == 'en' ? 'ltr packages-card' : 'rtl packages-card'}>
                                    <div className="title-most">
                                        <h4>{item.title}</h4>
                                        {item.is_popular ? <span>{lang === 'en' ? 'Most Popular' : 'الأكثر مبيعا'}</span> : null}
                                    </div>
                                    <h2>{item.price} {lang === 'en' ? 'SAR' : 'ر.س'}</h2>
                                    <div className="feats h-full">
                                        {
                                            item.features.map((feature, index) =>
                                                <p key={index}><i className="fa-solid fa-check"></i> {feature.title}</p>
                                            )
                                        }
                                    </div>
                                    <div className="btns">
                                        <Link href={`https://wa.me/${whatsapp}?text=Hello, I need package *${item.title}*. Can you assist me?!`} className="book-link">{lang === 'en' ? 'Find out More' : 'احصل على المزيد'}</Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
