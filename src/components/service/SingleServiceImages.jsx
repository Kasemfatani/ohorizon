import React from 'react';
import Image from 'next/image';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BlurFade from '../ui/blur-fade';

export default function SingleServiceImages({ data, lang }) {
    Fancybox.bind("[data-fancybox]", {
    });
    return (
        <section className="gallery single-servise-images" id='gallery' style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
            <div className="container mx-auto">
                <h4>{lang === 'en' ? 'From recent trips' : ' من أحدث الرحلات'}</h4>

                <section id="photos">
                    <div className="columns-3 gap-4 sm:columns-5">
                        {data?.gallery.map((img, idx) => (
                            <BlurFade key={idx} delay={0.25 + idx * 0.05} inView >
                                <a href={img.image} data-fancybox="gallery">
                                    <figure>
                                        <Image src={img.image} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-lg object-contain" />
                                    </figure>
                                </a>
                            </BlurFade>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}
