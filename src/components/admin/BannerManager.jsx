import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { api } from '../../lib/api';

const BannerManager = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        backdrop_url: '',
        year: '',
        rating: '',
        duration: '',
        genre: '',
        download_link: ''
    });

    useEffect(() => {
        fetchBanner();
    }, []);

    const fetchBanner = async () => {
        try {
            const { data, error } = await api.getFeaturedMovie();

            if (data && data.length > 0) {
                setFormData(data[0]);
            }
        } catch (error) {
            console.log("No banner found yet or error", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Check if a row exists
            const { data: existing } = await api.getFeaturedMovie();

            if (existing && existing.length > 0) {
                // Update
                const { error } = await api.updateFeaturedMovie(existing[0].id, formData);
                if (error) throw error;
                setMessage('Banner updated successfully!');
            } else {
                // Insert one row
                const { error } = await api.createFeaturedMovie(formData);
                if (error) throw error;
                setMessage('Banner created successfully!');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error saving banner. Check database permissions.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#111319] rounded-xl p-6 shadow-lg border border-[#1a1d24] max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Hero Banner Management</h2>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Movie Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                placeholder="e.g. STARFALL PROTOCOL"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Year</label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                    placeholder="2024"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Rating</label>
                                <input
                                    type="text"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                    placeholder="PG-13"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Duration</label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                    placeholder="2h 15m"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Genre</label>
                                <input
                                    type="text"
                                    value={formData.genre}
                                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                    placeholder="Sci-Fi"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Download Link</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.download_link}
                                    onChange={(e) => setFormData({ ...formData, download_link: e.target.value })}
                                    className="w-full bg-[#0F1116] border border-white/10 rounded p-3 pl-10 text-white focus:border-red-600 focus:outline-none"
                                    placeholder="https://..."
                                />
                                <Upload className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Backdrop Image URL (Landscape)</label>
                            <input
                                type="text"
                                value={formData.backdrop_url}
                                onChange={(e) => setFormData({ ...formData, backdrop_url: e.target.value })}
                                className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                placeholder="https://..."
                                required
                            />
                            {formData.backdrop_url && (
                                <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-white/10">
                                    <img src={formData.backdrop_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Description</label>
                            <textarea
                                rows="4"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-[#0F1116] border border-white/10 rounded p-3 text-white focus:border-red-600 focus:outline-none"
                                placeholder="Movie synopsis..."
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? 'Saving...' : 'Update Banner'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BannerManager;
