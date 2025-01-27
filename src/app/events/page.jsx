'use client';
import React from 'react';

import Events from '@/components/events/Events';
import Customize from '@/components/home/Customize';

export default function page() {


    return (
        <>
            < Events/>
            <div className="single-service mt-12">
                <div className="container m-auto">
                    <Customize />
                </div>
            </div>
        </>
    );
}