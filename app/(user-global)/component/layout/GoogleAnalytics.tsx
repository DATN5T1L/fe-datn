import { useEffect } from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            gtag('js', new Date());
            gtag('config', 'G-NH6C4RQV8Q');
        }
    }, []);

    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-NH6C4RQV8Q"
            />
        </>
    );
};

export default GoogleAnalytics;
