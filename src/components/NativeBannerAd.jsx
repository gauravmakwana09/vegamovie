import React, { useEffect, useRef } from 'react';

const NativeBannerAd = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        // Prevent ad from loading on mobile devices
        const isMobile = window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        if (bannerRef.current) {
            bannerRef.current.innerHTML = ''; // Clear previous content

            const script = document.createElement('script');
            script.src = "https://pl28589308.effectivegatecpm.com/0d/6d/b4/0d6db48759c8114bdfd27aeaf466758c.js";
            script.async = true;

            bannerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="hidden md:flex justify-center my-4 w-full" ref={bannerRef}>
            {/* Logic for ad injection */}
        </div>
    );
};

export default NativeBannerAd;
