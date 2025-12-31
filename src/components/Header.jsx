import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = ({ onSearch }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 shadow-xl backdrop-blur-sm' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'}`}>
            <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-4">
                {/* Logo - Hide on mobile when search is open */}
                <div className={`${isSearchOpen ? 'hidden md:block' : 'block'} text-xl md:text-3xl font-bold tracking-widest cursor-pointer select-none transition-opacity duration-300`}>
                    CINE<span className="text-red-600">VERSE</span>
                </div>

                {/* Search Bar - Desktop & Mobile Toggle */}
                <div className={`
                    flex items-center bg-[#1a1a1a] rounded-full px-3 py-1.5 md:py-2 border border-white/10 
                    focus-within:border-white/30 focus-within:bg-[#2a2a2a] transition-all duration-300
                    ${isSearchOpen ? 'absolute left-4 right-4 z-50 top-3' : 'hidden md:flex md:w-1/3'}
                `}>
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-500 text-sm md:text-base"
                        autoFocus={isSearchOpen}
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                        onBlur={() => {
                            // Optional: Only close if empty? Or keep open?
                            // setIsSearchOpen(false) 
                            // Keeping it simple so simple blur closes it, but that might annoy user if typing?
                            // Actually, onBlur closing it immediately prevents clicking the input if focus lost?
                            // Let's keep existing behavior for now but user might want persistent search bar
                        }}
                    />
                </div>

                {/* Right Side Icons */}
                <div className={`${isSearchOpen ? 'hidden md:flex' : 'flex'} items-center space-x-4 md:space-x-6`}>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="md:hidden p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <Search className="w-5 h-5 text-white" />
                    </button>

                    <div className="relative cursor-pointer group p-1">
                        <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-white transition-colors group-hover:animate-swing" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-full ring-2 ring-black"></span>
                    </div>

                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center cursor-pointer overflow-hidden hover:ring-2 hover:ring-red-600 transition-all duration-300 transform hover:scale-105">
                        <User className="w-4 h-4 md:w-6 md:h-6 text-gray-300" />
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay Background */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSearchOpen(false)}></div>
            )}
        </header>
    );
};

export default Header;
