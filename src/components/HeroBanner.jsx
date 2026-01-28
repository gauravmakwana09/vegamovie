import React, { useEffect, useState } from 'react';
import { Play, Info, Download } from 'lucide-react';

const HeroBanner = ({ movie, onPlay, onMoreInfo }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!movie) return null;

    return (
        <div className="relative h-[55vh] md:h-[85vh] w-full text-white overflow-hidden group">
            {/* Background Image with scaling animation */}
            <div className="absolute inset-0">
                <img
                    src={movie.backdrop_url || movie.backdrop || movie.thumbnail}
                    alt={movie.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`
                        w-full h-full object-cover object-top md:object-center transition-transform duration-[20s] ease-linear
                        ${imageLoaded ? 'scale-105 group-hover:scale-110' : 'scale-100'}
                    `}
                />
                {/* Improved gradients for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:from-black md:via-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent md:via-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center pb-8 md:pb-0 pt-20">
                <div className="max-w-[1800px] mx-auto w-full px-4 md:px-8">
                    <div className="max-w-3xl animate-fade-in-up">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 uppercase tracking-tight drop-shadow-2xl text-balance leading-none md:leading-[0.9]">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 md:mb-6 text-xs sm:text-sm md:text-lg text-gray-300 font-medium tracking-wide">
                            <span className="text-green-400 font-bold drop-shadow-md">98% Match</span>
                            <span>{movie.year}</span>
                            <div className="border border-gray-400 px-1.5 py-0.5 text-[10px] md:text-sm rounded uppercase bg-black/30 backdrop-blur-sm">{movie.rating}</div>
                            <span>{movie.duration}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{movie.genre}</span>
                        </div>

                        <p className="block text-gray-200 text-xs sm:text-sm md:text-xl mb-4 md:mb-8 line-clamp-2 md:line-clamp-4 max-w-xl drop-shadow-md leading-relaxed font-light opacity-90">
                            {movie.description}
                        </p>

                        <div className="flex space-x-3 md:space-x-4">
                            <button
                                onClick={() => onPlay(movie)}
                                className="flex-1 md:flex-none bg-white text-black hover:bg-white/90 px-4 py-2 md:px-8 md:py-3 rounded md:rounded-lg flex items-center justify-center font-bold text-sm md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                            >
                                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Download
                            </button>
                            <button
                                onClick={onMoreInfo}
                                className="flex-1 md:flex-none bg-gray-500/40 hover:bg-gray-500/60 text-white px-4 py-2 md:px-8 md:py-3 rounded md:rounded-lg flex items-center justify-center font-bold text-sm md:text-lg transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md border border-white/20"
                            >
                                <Info className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
