import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import MovieDetailModal from './components/MovieDetailModal';
import NativeBannerAd from './components/NativeBannerAd';
import TopBannerAd from './components/TopBannerAd';
import SideBannerAd from './components/SideBannerAd';
import MobileCategoryAd from './components/MobileCategoryAd';
import AdminPanel from './components/admin/AdminPanel';
import { api } from './lib/api';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  // State for dynamic content
  const [allMovies, setAllMovies] = useState([]); // Master list for search
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [watchAgainData, setWatchAgainData] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewCategory, setViewCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Featured Movie
        const { data: featuredData } = await api.getFeaturedMovie();
        if (featuredData && featuredData.length > 0) {
          setBannerMovie(featuredData[0]);
        }

        // Fetch Movies lists
        const { data, error } = await api.getMovies();
        if (error) {
          setError('Failed to load movies from Supabase.');
          console.error("API Error:", error);
        } else if (data) {
          setError(null);
          setAllMovies(data); // Store all for search

          const dbTrending = data.filter(m => !m.category || m.category.includes('Trending Now'));
          const dbLatest = data.filter(m => m.category && m.category.includes('Latest Releases'));
          const dbTopRated = data.filter(m => m.category && m.category.includes('Top Rated'));
          const dbWatchAgain = data.filter(m => m.category && m.category.includes('Watch Again'));

          setTrending(dbTrending);
          setLatest(dbLatest);
          setTopRatedData(dbTopRated);
          setWatchAgainData(dbWatchAgain);
        }
      } catch (e) {
        setError('Unexpected error connecting to server.');
        console.error("Fetch error", e);
      }
    };
    fetchData();

    // Increment Visitor Count
    const hasVisited = sessionStorage.getItem('visited');
    if (!hasVisited) {
      api.incrementVisitor().then(() => {
        sessionStorage.setItem('visited', 'true');
      });
    }
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handlePlay = (movie) => {
    if (movie.download_link) {
      const hasAdBeenClicked = sessionStorage.getItem('adClicked');
      if (!hasAdBeenClicked) {
        window.open("https://www.effectivegatecpm.com/tdkynm6nih?key=fb80661a95e30cc8c193ddaa01a3e648", '_blank', 'noopener,noreferrer');
        sessionStorage.setItem('adClicked', 'true');
      } else {
        window.open(movie.download_link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setViewCategory(null);
    setCurrentPage(1); // Reset page
  };

  const handleCategoryClick = (category) => {
    setViewCategory(category);
    setCurrentPage(1); // Reset page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setViewCategory(null);
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter movies based on search query OR selected category
  let allFilteredMovies = [];
  let viewTitle = "";

  if (searchQuery) {
    allFilteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    viewTitle = `Search Results for "${searchQuery}"`;
  } else if (viewCategory) {
    allFilteredMovies = allMovies.filter(m => m.category && m.category.includes(viewCategory));
    if (viewCategory === 'Trending Now') {
      allFilteredMovies = allMovies.filter(m => !m.category || m.category.includes('Trending Now'));
    }
    viewTitle = viewCategory;
  }

  // Pagination Logic
  const totalPages = Math.ceil(allFilteredMovies.length / itemsPerPage);
  const displayedMovies = allFilteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showGridView = searchQuery || viewCategory;

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/Movie-admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const exitAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (isAdminView) {
    return (
      <>
        <button
          onClick={exitAdmin}
          className="fixed top-4 right-4 z-[100] bg-white text-black px-4 py-2 rounded shadow-lg text-xs font-bold opacity-50 hover:opacity-100 transition-opacity"
        >
          Back to Site
        </button>
        <AdminPanel />
      </>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen w-full overflow-x-hidden font-sans text-white relative">
      <Header onSearch={handleSearch} />
      {error && (
        <div className="bg-red-600 text-white text-center py-2 px-4 font-bold">
          ⚠️ {error}
          <br />
          <span className="text-sm font-normal">Please make sure your database is running and refresh the page.</span>
        </div>
      )}
      <TopBannerAd />

      {!showGridView && (
        <HeroBanner
          movie={bannerMovie}
          onPlay={handlePlay}
          onMoreInfo={() => handleMovieClick(bannerMovie)}
        />
      )}

      {/* Main Content Area */}
      <div className={`relative z-10 space-y-2 md:space-y-8 bg-gradient-to-t from-[#141414] via-[#141414] to-transparent pt-4 ${showGridView ? 'mt-20 px-4' : '-mt-8 md:-mt-32'} pb-10`}>

        <div className="max-w-[1800px] mx-auto flex flex-col xl:flex-row gap-6 px-4 md:px-8">

          {/* Left Sidebar Column - Visible on XL+ */}
          <div className="hidden xl:block w-[300px] flex-shrink-0">
            <SideBannerAd />
          </div>

          {/* Main Content Column */}
          <div className="flex-1 min-w-0 space-y-8">
            {showGridView ? (
              <div className="min-h-[50vh]">
                <div className="flex items-center gap-4 mb-6">
                  {viewCategory && (
                    <button onClick={handleBackToHome} className="text-gray-400 hover:text-white transition-colors">
                      ← Back
                    </button>
                  )}
                  <h2 className="text-2xl font-bold">{viewTitle}</h2>
                </div>

                {displayedMovies.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {displayedMovies.map(movie => (
                        <div key={movie.id} onClick={() => handleMovieClick(movie)} className="cursor-pointer transition-transform hover:scale-105 group">
                          <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
                            <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          </div>
                          <h3 className="mt-3 text-sm font-medium text-white group-hover:text-red-500 transition-colors line-clamp-2">{movie.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{movie.year || '2024'} • {movie.category ? movie.category.split(',')[0] : 'Movie'}</p>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-8">
                        <button
                          onClick={() => {
                            setCurrentPage(p => Math.max(1, p - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg text-sm font-bold ${currentPage === 1 ? 'bg-gray-800 text-gray-600' : 'bg-[#1a1a1a] text-white hover:bg-red-600'}`}
                        >
                          Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${currentPage === i + 1
                              ? 'bg-red-600 text-white'
                              : 'bg-[#1a1a1a] text-gray-400 hover:bg-white/10'
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => {
                            setCurrentPage(p => Math.min(totalPages, p + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-lg text-sm font-bold ${currentPage === totalPages ? 'bg-gray-800 text-gray-600' : 'bg-[#1a1a1a] text-white hover:bg-red-600'}`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400">No movies found in this category.</p>
                )}
              </div>
            ) : (
              <>
                <MovieRow
                  title="Trending Now"
                  movies={trending}
                  onMovieClick={handleMovieClick}
                  onCategoryClick={handleCategoryClick}
                />

                <MobileCategoryAd />

                <MovieRow
                  title="Latest Releases"
                  movies={latest}
                  onMovieClick={handleMovieClick}
                  onCategoryClick={handleCategoryClick}
                />

                <MobileCategoryAd />

                <MovieRow
                  title="Top Rated"
                  movies={topRatedData}
                  onMovieClick={handleMovieClick}
                  onCategoryClick={handleCategoryClick}
                />

                <MobileCategoryAd />

                <MovieRow
                  title="Watch Again"
                  movies={watchAgainData}
                  onMovieClick={handleMovieClick}
                  onCategoryClick={handleCategoryClick}
                />
              </>
            )}
          </div>

          {/* Right Sidebar Column - Visible on XL+ */}
          <div className="hidden xl:block w-[300px] flex-shrink-0">
            <SideBannerAd />
          </div>

        </div>
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={closeModal}
          onPlay={handlePlay}
        />
      )}

      <footer className="max-w-[1800px] mx-auto px-4 md:px-8 py-10 text-center text-gray-500 text-sm">
        <p className="mb-4">© 2024 CineVerse. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="cursor-pointer hover:underline">Terms of Service</span>
          <span className="cursor-pointer hover:underline">Help Center</span>
        </div>
      </footer>
      <MobileCategoryAd showOnDesktop={true} />
      <NativeBannerAd />
    </div>
  );
}

export default App;
