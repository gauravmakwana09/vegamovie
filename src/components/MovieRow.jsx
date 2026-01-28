import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick, onCategoryClick }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth * 0.7
                : scrollLeft + clientWidth * 0.7;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-3 my-6 md:my-10 relative group z-10">
            <h2
                onClick={() => onCategoryClick && onCategoryClick(title)}
                className="text-lg md:text-2xl font-bold text-white group/title cursor-pointer flex items-center transition-colors hover:text-red-500 w-fit"
            >
                {title}
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2 text-white bg-transparent transform translate-y-[1px]" />
            </h2>

            <div className="relative group/row">
                {/* Scroll Buttons - Desktop Only */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-0 bottom-0 z-30 bg-black/60 w-10 md:w-14 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 cursor-pointer hidden md:flex hover:bg-black/80 rounded-r-lg"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white transform hover:scale-125 transition-transform" />
                </button>

                <div
                    ref={rowRef}
                    className="flex space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide pb-4 pt-4 scroll-smooth overscroll-x-contain"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-30 bg-black/60 w-10 md:w-14 items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 cursor-pointer hidden md:flex hover:bg-black/80 rounded-l-lg"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white transform hover:scale-125 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
