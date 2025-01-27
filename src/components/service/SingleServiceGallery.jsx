import React from 'react';
import Image from 'next/image';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
export default function SingleServiceGallery({ data, lang }) {
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    return (
        <div className='container m-auto path'>
            <div className="pathdata">
                <div className="w-full service-text">
                    <div className="head">
                        <h2>{data?.name}</h2>
                        {/* <h5><span>{data?.rate || '4.1'}</span><i className="fa-regular fa-star"></i></h5> */}
                    </div>
                    <p>{data?.description}</p>
                </div>
                <div className="imgs w-full">
                    <div className="imgs-grid">
                        {
                            data?.images.map((img, index) =>
                                <div className="img-cont" key={index}>
                                    {
                                        index == 2 ?
                                            <Image src={img.image} alt="Mazar" width={200} height={200} />
                                            :
                                            <a href={img.image} data-fancybox="post">
                                                <figure>
                                                    <Image src={img.image} alt="Mazar" width={200} height={200} />
                                                </figure>
                                            </a>
                                    }
                                    {
                                        index == 2 ?
                                            <div className="rest"><a href={img.image} data-fancybox="post">+{data.images.length - 2}</a></div>
                                            : null
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="activities">
                <h4>{lang === 'en' ? 'Includes' : 'تشتمل على'}</h4>
                <div className="activities-grid">
                    {
                        data?.activities.map((activity, index) =>
                            <div className="activity-cont" key={index}>
                                <Image src={activity.image} alt="O S HORIZON" width={200} height={200} />
                                <h5>{activity.title}</h5>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    );
}
