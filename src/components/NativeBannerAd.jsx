import React, { useEffect, useRef } from 'react';

const NativeBannerAd = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        // Prevent ad from loading on mobile devices
        const isMobile = window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        if (bannerRef.current && !bannerRef.current.firstChild) {
            const script = document.createElement('script');
            script.async = true;
            script.dataset.cfasync = "false";
            script.src = "//pl28221243.effectivegatecpm.com/dbd0ca03b9ec43f010008523c64c9b2b/invoke.js";

            const container = document.createElement('div');
            container.id = "container-dbd0ca03b9ec43f010008523c64c9b2b";

            bannerRef.current.appendChild(script);
            bannerRef.current.appendChild(container);
        }
    }, []);

    return (
        <div className="hidden md:flex justify-center my-4" ref={bannerRef}>
            {/* Ad will be injected here */}
        </div>
    );
};

export default NativeBannerAd;
