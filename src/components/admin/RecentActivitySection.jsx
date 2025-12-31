import React, { useEffect, useState } from 'react';
import ActivityItem from './ui/ActivityItem';
import { api } from '../../lib/api';

const RecentActivitySection = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Fetch latest 5 movies/shows
                // Backend sorts by created_at DESC automatically
                const { data, error } = await api.getMovies();

                if (data && !error) {
                    const params = data.slice(0, 5).map(movie => ({
                        id: movie.id,
                        type: 'movie', // Ensures ActivityItem renders image
                        title: movie.title,
                        image: movie.thumbnail,
                        description: `New ${movie.type === 'tv' ? 'TV Show' : 'Movie'} added to library`,
                        timeAgo: formatTimeAgo(movie.created_at)
                    }));
                    setActivities(params);
                }
            } catch (error) {
                console.error("Error fetching activities", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const formatTimeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " mins ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="bg-[#111319] rounded-xl p-6 shadow-lg border border-[#1a1d24]">
            <h3 className="text-white font-bold mb-4">Recent Activity</h3>
            <div className="space-y-1">
                {loading ? (
                    <div className="text-gray-500 text-sm italic p-2">Loading updates...</div>
                ) : activities.length > 0 ? (
                    activities.map((activity) => (
                        <ActivityItem key={activity.id} item={activity} />
                    ))
                ) : (
                    <div className="text-gray-500 text-sm italic p-2">No recent activity</div>
                )}
            </div>
        </div>
    );
};

export default RecentActivitySection;
