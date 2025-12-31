import React, { useEffect, useRef } from 'react';

const TopBannerAd = () => {
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
    iframe.style.width = '100%';
    iframe.style.height = '60px'; // Set height to match ad
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
              'key' : '138759650432218d8366cdb7cc635332',
              'format' : 'iframe',
              'height' : 60,
              'width' : 468,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="//www.highperformanceformat.com/138759650432218d8366cdb7cc635332/invoke.js"></script>
        </body>
      </html>
    `;

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(adContent);
    iframe.contentWindow.document.close();

  }, []);

  return (
    <div className="hidden md:flex justify-center w-full py-4 bg-[#141414]" ref={containerRef}>
      {/* Iframe injected here */}
    </div>
  );
};

export default TopBannerAd;
