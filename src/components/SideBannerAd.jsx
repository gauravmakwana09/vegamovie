import DesktopScriptAd from './DesktopScriptAd';

const SideBannerAd = () => {
    return (
        <div className="hidden xl:flex flex-col w-[300px] h-fit sticky top-24">
            <div className="bg-[#1a1d24] rounded-lg border border-white/5 p-4 flex flex-col items-center justify-center min-h-[650px] overflow-hidden">
                <span className="text-xs text-gray-500 mb-2">Advertisement</span>
                <DesktopScriptAd height="600px" width="160px" />
            </div>
        </div>
    );
};

export default SideBannerAd;
