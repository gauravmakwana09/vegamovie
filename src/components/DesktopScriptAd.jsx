import React, { useEffect, useRef } from 'react';

const DesktopScriptAd = ({ width = '100%', height = '100px' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Prevent ad from loading on mobile devices
        const isMobile = window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        const container = containerRef.current;
        if (!container) return;

        // Clear previous content
        container.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.style.width = width;
        iframe.style.height = height;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.title = "Advertisement";

        container.appendChild(iframe);

        const adContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body { margin: 0; display: flex; justify-content: center; align-items: center; background: transparent; }
                    </style>
                </head>
                <body>
                    <script type="text/javascript">
                        atOptions = {
                            'key' : 'a289271d1c874d4d67596cb0aeea45fe',
                            'format' : 'iframe',
                            'height' : 600,
                            'width' : 160,
                            'params' : {}
                        };
                    </script>
                    <script type="text/javascript" src="https://www.highperformanceformat.com/a289271d1c874d4d67596cb0aeea45fe/invoke.js"></script>
                </body>
            </html>
        `;

        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(adContent);
        iframe.contentWindow.document.close();

    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex justify-center items-center"></div>
    );
};

export default DesktopScriptAd;
