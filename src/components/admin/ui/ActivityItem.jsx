import React from 'react';
import { User, Film } from 'lucide-react';

const ActivityItem = ({ item }) => {
    return (
        <div className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
                {/* Avatar / Thumbnail */}
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center border border-gray-700">
                    {item.type === 'movie' && item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-5 h-5 text-gray-400" />
                    )}
                </div>

                {/* Text Info */}
                <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-gray-200">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                </div>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-600 font-medium">{item.timeAgo}</span>
        </div>
    );
};

export default ActivityItem;
