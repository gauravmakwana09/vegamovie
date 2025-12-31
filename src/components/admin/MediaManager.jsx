import React, { useState } from 'react';
import { Pencil, Trash2, Plus, X, Upload, Search } from 'lucide-react';

const MediaManager = ({ type, data, onAdd, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        genre: '',
        duration: '',
        thumbnail: '',
        description: '',
        download_link: '',
        category: 'Latest Releases'
    });

    const categories = ["Trending Now", "Latest Releases", "Top Rated", "Watch Again", "TV Shows"];

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            year: '',
            genre: '',
            duration: '',
            thumbnail: '',
            description: '',
            download_link: '',
            category: 'Latest Releases'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...formData, type: type === 'shows' ? 'tv' : 'movie' };
        if (editingItem) {
            onEdit({ ...finalData, id: editingItem.id });
        } else {
            onAdd({ ...finalData });
        }
        setIsModalOpen(false);
    };

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item => {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title ? item.title.toLowerCase().includes(query) : false;
        const genreMatch = item.genre ? item.genre.toLowerCase().includes(query) : false;
        return titleMatch || genreMatch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-[#111319] rounded-xl p-6 shadow-lg border border-[#1a1d24] h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="text-white font-bold text-xl capitalize">{type} Management</h3>

                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder={`Search ${type}...`}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full bg-[#1a1d24] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-red-600 focus:outline-none placeholder-gray-500"
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold transition-colors whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedData.length > 0 ? (
                        displayedData.map((item) => (
                            <div key={item.id} className="bg-[#1a1d24] p-3 rounded-lg flex gap-4 group hover:bg-[#22252b] transition-colors border border-transparent hover:border-white/10">
                                <div className="w-20 h-28 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold truncate">{item.title}</h4>
                                    <div className="text-gray-400 text-xs mt-1 flex gap-2">
                                        <span>{item.year}</span>
                                        <span>•</span>
                                        <span>{item.category || (type === 'shows' ? 'TV Shows' : 'Movie')}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">{item.description}</p>

                                    <div className="flex gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 p-1.5 rounded transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-10 text-gray-500">
                            No matching items found.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4 pt-4 border-t border-white/5">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentPage === 1 ? 'bg-gray-800 text-gray-600' : 'bg-[#1a1a1a] text-white hover:bg-red-600 border border-white/10'}`}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${currentPage === i + 1
                                ? 'bg-red-600 text-white'
                                : 'bg-[#1a1a1a] text-gray-400 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${currentPage === totalPages ? 'bg-gray-800 text-gray-600' : 'bg-[#1a1a1a] text-white hover:bg-red-600 border border-white/10'}`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#181818] w-full max-w-lg lg:max-w-2xl rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-white/10">
                            <h3 className="text-white font-bold">{editingItem ? 'Edit' : 'Add New'} {type === 'movies' ? 'Movie' : 'Show'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-2">Categories (Select Multiple)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => {
                                            const isSelected = formData.category && formData.category.includes(cat);
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        const currentCats = formData.category ? formData.category.split(',').map(s => s.trim()).filter(Boolean) : [];
                                                        let newCats;
                                                        if (isSelected) {
                                                            newCats = currentCats.filter(c => c !== cat);
                                                        } else {
                                                            newCats = [...currentCats, cat];
                                                        }
                                                        setFormData({ ...formData, category: newCats.join(', ') });
                                                    }}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${isSelected
                                                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-900/20'
                                                        : 'bg-[#0F1116] border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <input type="hidden" required value={formData.category} /> {/* Validation helper */}
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Year</label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Genre</label>
                                <input
                                    type="text"
                                    value={formData.genre}
                                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                        placeholder="e.g. 2h 30m"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Download Link</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.download_link}
                                            onChange={(e) => setFormData({ ...formData, download_link: e.target.value })}
                                            className="w-full bg-[#0F1116] border border-white/10 rounded p-2 pl-8 text-white text-sm focus:border-red-600 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                        <Upload className="w-4 h-4 text-gray-500 absolute left-2 top-2.5" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Thumbnail URL</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-2 text-white text-sm focus:border-red-600 focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white font-bold text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-red-900/20"
                                >
                                    {editingItem ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div >
                </div >
            )}
        </div >
    );
};

export default MediaManager;
