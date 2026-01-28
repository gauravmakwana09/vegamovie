import React from 'react';
import MobileCategoryAd from './MobileCategoryAd';

const TopBannerAd = () => {
  return (
    <div className="hidden md:flex justify-center w-full py-4 bg-[#141414]">
      <MobileCategoryAd showOnDesktop={true} />
    </div>
  );
};

export default TopBannerAd;
