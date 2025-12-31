import React, { useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, Download } from 'lucide-react';

const MovieDetailModal = ({ movie, onClose, onPlay }) => {
    useEffect(() => {
        if (movie) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'auto';
            };
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-[#181818] w-full md:max-w-4xl h-[90vh] md:h-auto rounded-t-2xl md:rounded-xl overflow-y-auto scrollbar-hide shadow-2xl relative animate-up-slide md:animate-scale-in"
                onClick={(e) => e.stopPropagation()}
                style={{
                    animation: 'slideUp 0.3s ease-out forwards'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-all cursor-pointer group"
                >
                    <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
                </button>

                {/* Hero Image Area */}
                <div className="relative h-[30vh] md:h-[480px] w-full">
                    <img
                        src={movie.backdrop || movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

                    {/* Title and Controls (Desktop) */}
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full hidden md:block">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight drop-shadow-lg">{movie.title}</h2>
                        <div className="flex items-center space-x-3 mb-4 opacity-0 animate-fade-in delay-200" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                            <button
                                onClick={() => onPlay && onPlay(movie)}
                                className="bg-white text-black px-8 py-2.5 rounded-lg font-bold flex items-center hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                            >
                                <Download className="w-6 h-6 mr-2" />
                                Download
                            </button>
                            <button className="border-2 border-gray-500/50 hover:bg-white/10 hover:border-white text-white p-2.5 rounded-full transition-all hover:scale-110 active:scale-95">
                                <Plus className="w-5 h-5" />
                            </button>
                            <button className="border-2 border-gray-500/50 hover:bg-white/10 hover:border-white text-white p-2.5 rounded-full transition-all hover:scale-110 active:scale-95">
                                <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button className="border-2 border-gray-500/50 hover:bg-white/10 hover:border-white text-white p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 ml-auto">
                                <Volume2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-10 grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Mobile Title & Controls */}
                    <div className="md:hidden">
                        <h2 className="text-2xl font-black text-white mb-2">{movie.title}</h2>
                        <div className="flex items-center space-x-2 text-gray-400 text-xs mb-4">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                            <span>{movie.rating}</span>
                        </div>
                        <button
                            onClick={() => onPlay && onPlay(movie)}
                            className="w-full bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center hover:bg-gray-200 transition-colors mb-3"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download
                        </button>
                        <div className="flex space-x-3 mb-6">
                            <button className="flex-1 flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <Plus className="w-6 h-6 mb-1" />
                                <span className="text-[10px] uppercase">My List</span>
                            </button>
                            <button className="flex-1 flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <ThumbsUp className="w-6 h-6 mb-1" />
                                <span className="text-[10px] uppercase">Rate</span>
                            </button>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed font-light mb-6">
                            {movie.description}
                        </p>
                    </div>

                    {/* Desktop Description */}
                    <div className="hidden md:block md:col-span-2">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm md:text-base text-gray-300 font-medium">
                            <span className="text-green-500 font-bold">98% Match</span>
                            <span>{movie.year}</span>
                            <div className="border border-gray-400 px-1.5 rounded text-xs">{movie.rating}</div>
                            <span>{movie.duration}</span>
                            <span className="border border-white/20 px-2 text-[10px] rounded">HD</span>
                        </div>
                        <p className="text-gray-100 text-lg leading-relaxed font-light">
                            {movie.description}
                        </p>
                    </div>

                    <div className="text-gray-400 text-xs md:text-sm space-y-3 font-light">
                        <div>
                            <span className="block text-[#777] mb-1">Genres:</span>
                            <span className="text-white hover:underline cursor-pointer">{movie.genre}, Sci-Fi, Action</span>
                        </div>
                        <div>
                            <span className="block text-[#777] mb-1">Original Language:</span>
                            <span className="text-white">English</span>
                        </div>
                        <div>
                            <span className="block text-[#777] mb-1">Maturity Rating:</span>
                            <span className="text-white border border-white/20 px-1 rounded text-xs inline-block mt-1">{movie.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailModal;
