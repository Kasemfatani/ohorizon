'use client';
import React from 'react';

import Explore from '@/components/explore/Explore';
import Customize from '@/components/home/Customize';

export default function page() {


    return (
        <>

            <Explore />
            <div className="single-service mt-12">
                <div className="container m-auto">
                    <Customize />
                </div>
            </div>
        </>
    );
}