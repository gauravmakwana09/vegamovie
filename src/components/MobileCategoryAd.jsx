import React, { useEffect, useRef } from 'react';

const MobileCategoryAd = ({ showOnDesktop = false }) => {
    const adRef = useRef(null);

    useEffect(() => {
        const adContainer = adRef.current;
        if (!adContainer) return;

        // Clear container
        adContainer.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.style.width = '320px';
        iframe.style.height = '50px';
        iframe.style.border = 'none';
        iframe.title = "Advertisement";

        // Content with the ad script
        const adContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background-color: #1a1d24; }
                </style>
            </head>
            <body>
                <script type="text/javascript">
                    atOptions = {
                        'key' : '5f6ee0ec661fcffecaee771f4740f356',
                        'format' : 'iframe',
                        'height' : 50,
                        'width' : 320,
                        'params' : {}
                    };
                </script>
                <script type="text/javascript" src="https://www.highperformanceformat.com/5f6ee0ec661fcffecaee771f4740f356/invoke.js"></script>
            </body>
            </html>
        `;

        adContainer.appendChild(iframe);

        // Write content to iframe safely
        try {
            const doc = iframe.contentWindow.document;
            doc.open();
            doc.write(adContent);
            doc.close();
        } catch (e) {
            console.error("Error loading ad iframe", e);
        }

    }, []);

    return (
        <div className={`w-full px-4 my-6 flex justify-center ${showOnDesktop ? '' : 'block lg:hidden'}`}>
            <div ref={adRef} className="bg-[#1a1d24] rounded-lg border border-white/5 p-4 flex items-center justify-center overflow-hidden">
                {/* Iframe will be injected here */}
            </div>
        </div>
    );
};

export default MobileCategoryAd;
