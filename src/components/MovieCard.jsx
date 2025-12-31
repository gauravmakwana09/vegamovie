import React from 'react';
import { Download } from 'lucide-react';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div
            onClick={() => onClick(movie)}
            className="
                flex-none 
                w-[130px] md:w-[200px] lg:w-[240px] 
                aspect-[2/3] 
                relative 
                rounded-lg md:rounded-xl 
                overflow-hidden 
                cursor-pointer 
                md:transition-all md:duration-500 ease-out
                transform 
                md:hover:scale-105 lg:hover:scale-110 
                md:hover:z-20 
                group
            "
        >
            <div onClick={(e) => {
                e.stopPropagation();
                if (movie.download_link) {
                    const hasAdBeenClicked = sessionStorage.getItem('adClicked');
                    if (!hasAdBeenClicked) {
                        window.open("https://www.effectivegatecpm.com/tdkynm6nih?key=fb80661a95e30cc8c193ddaa01a3e648", '_blank', 'noopener,noreferrer');
                        sessionStorage.setItem('adClicked', 'true');
                    } else {
                        window.open(movie.download_link, '_blank', 'noopener,noreferrer');
                    }
                }
            }} className="absolute top-2 right-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-red-600 p-1.5 rounded-full shadow-lg hover:bg-red-700">
                <Download className="w-3 h-3 text-white" />
            </div>
            <img
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500 ease-out"
            />

            {/* Smooth Glow effect */}
            <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-red-600/80 transition-all duration-300 rounded-lg md:rounded-xl"></div>

            {/* Gradient Overlay - Always visible on mobile for legibility, hover on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-4">
                <h3 className="text-white font-bold text-xs md:text-base leading-tight mb-1 drop-shadow-md line-clamp-2 md:line-clamp-none">{movie.title}</h3>

                <div className="hidden md:flex items-center justify-between text-xs text-gray-300 font-medium">
                    <span>{movie.year}</span>
                    <span className="border border-gray-400 px-1 rounded text-[10px] md:text-xs">{movie.rating}</span>
                </div>

                <div className="hidden md:flex gap-2 mt-2 items-center justify-between">
                    <div className="flex gap-2">
                        {movie.categoryTags && movie.categoryTags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-gray-400">• {tag}</span>
                        ))}
                    </div>
                    <div className="p-1.5 bg-white rounded-full hover:bg-gray-200 transition-colors shadow-lg" title="Download">
                        <Download className="w-3 h-3 text-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
