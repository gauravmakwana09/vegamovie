import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import RecentActivitySection from './RecentActivitySection';
import SystemStatusSection from './SystemStatusSection';
import MediaManager from './MediaManager';
import BannerManager from './BannerManager';
import { api } from '../../lib/api';

// Initial data load
const initialMovies = [];
const initialShows = [];

const AdminPanel = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [movies, setMovies] = useState(initialMovies);
    const [shows, setShows] = useState(initialShows);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                // Fetch Visitor Count
                api.getVisitorCount().then(({ count }) => setVisitorCount(count));

                // Fetch Movies
                const { data: moviesData, error: moviesError } = await api.getMovies('movie');

                if (moviesData && !moviesError) {
                    setMovies((prev) => [...prev, ...moviesData.filter(m => !prev.find(p => p.id === m.id))]);
                }

                // Fetch Shows
                const { data: showsData, error: showsError } = await api.getMovies('tv');

                if (showsData && !showsError) {
                    setShows((prev) => [...prev, ...showsData.filter(m => !prev.find(p => p.id === m.id))]);
                }
            } catch (error) {
                console.error("Error fetching media:", error);
            }
        };

        fetchMedia();
    }, []);

    // CRUD Handlers for Movies
    const handleAddMovie = async (newMovie) => {
        try {
            const { data, error } = await api.addMovie({ ...newMovie, type: 'movie' });
            if (!error && data) {
                setMovies([data[0], ...movies]);
            } else {
                setMovies([newMovie, ...movies]);
            }
        } catch (e) {
            setMovies([newMovie, ...movies]);
        }
    };

    const handleEditMovie = async (updatedMovie) => {
        try {
            await api.updateMovie(updatedMovie.id, updatedMovie);
            setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m));
        } catch (e) {
            setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m));
        }
    };

    const handleDeleteMovie = async (id) => {
        try {
            await api.deleteMovie(id);
            setMovies(movies.filter(m => m.id !== id));
        } catch (e) {
            setMovies(movies.filter(m => m.id !== id));
        }
    };

    // CRUD Handlers for Shows
    const handleAddShow = async (newShow) => {
        try {
            const { data, error } = await api.addMovie({ ...newShow, type: 'tv' });
            if (!error && data) {
                setShows([data[0], ...shows]);
            } else {
                setShows([newShow, ...shows]);
            }
        } catch (e) {
            setShows([newShow, ...shows]);
        }
    };

    const handleEditShow = async (updatedShow) => {
        try {
            await api.updateMovie(updatedShow.id, updatedShow);
            setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
        } catch (e) {
            setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
        }
    };

    const handleDeleteShow = async (id) => {
        try {
            await api.deleteMovie(id);
            setShows(shows.filter(s => s.id !== id));
        } catch (e) {
            setShows(shows.filter(s => s.id !== id));
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'movies':
                return (
                    <MediaManager
                        type="movies"
                        data={movies}
                        onAdd={handleAddMovie}
                        onEdit={handleEditMovie}
                        onDelete={handleDeleteMovie}
                    />
                );
            case 'tvshows':
                return (
                    <MediaManager
                        type="shows"
                        data={shows}
                        onAdd={handleAddShow}
                        onEdit={handleEditShow}
                        onDelete={handleDeleteShow}
                    />
                );
            case 'banner':
                return <BannerManager />;
            case 'analytics':
                return (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Analytics Module Placeholder
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-[#111319] rounded-xl p-6 shadow-lg border border-[#1a1d24]">
                        <h3 className="text-white font-bold text-xl mb-6">Website Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#1a1d24] p-6 rounded-lg border border-white/5">
                                <h4 className="text-gray-400 text-sm font-medium mb-2">Total Visitors</h4>
                                <div className="text-4xl font-bold text-white">{visitorCount.toLocaleString()}</div>
                                <div className="text-green-500 text-xs mt-2 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Live Tracking
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'dashboard':
            default:
                return (
                    <div className="grid gap-8">
                        <RecentActivitySection />
                        <SystemStatusSection />
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-4 lg:p-8 font-sans">
            <div className="w-full max-w-7xl flex flex-col items-center h-screen md:h-auto">
                {/* Top Title (Outside Panel) - Hidden on mobile */}
                <h1 className="hidden md:block text-3xl text-gray-800 mb-8 tracking-tight">
                    <span className="font-bold">Cineverse</span> Admin Panel
                </h1>

                {/* Main Admin Panel Container */}
                <div className="w-full h-full md:h-[800px] bg-[#0F1116] md:rounded-2xl shadow-2xl flex overflow-hidden ring-1 ring-black/5 relative">

                    {/* Mobile Sidebar Overlay */}
                    {isMobileMenuOpen && (
                        <div
                            className="absolute inset-0 z-40 bg-black/50 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    )}

                    {/* Sidebar - Responsive */}
                    <div className={`
                        fixed inset-y-0 left-0 z-50 w-64 h-screen transform transition-transform duration-300 ease-in-out md:absolute md:h-full md:relative md:translate-x-0
                        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                    `}>
                        <Sidebar activeView={activeView} onNavigate={(view) => {
                            setActiveView(view);
                            setIsMobileMenuOpen(false);
                        }} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col bg-[#0F1116] overflow-hidden w-full">
                        {/* Mobile Header with Hamburger */}
                        <div className="md:hidden flex items-center p-4 border-b border-white/10 shrink-0">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white mr-4">
                                <Menu className="w-6 h-6" />
                            </button>
                            <span className="text-white font-bold text-lg">Admin Panel</span>
                        </div>

                        <div className="hidden md:block shrink-0">
                            <MainHeader title={activeView.charAt(0).toUpperCase() + activeView.slice(1)} />
                        </div>

                        <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
