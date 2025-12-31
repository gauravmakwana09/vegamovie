import React from 'react';
import { Bell, User } from 'lucide-react';

const MainHeader = () => {
    return (
        <div className="h-20 flex items-center justify-between px-8 border-b border-[#1a1d24]">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>

            <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer group">
                    <Bell className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-[#0B0D10]">1</span>
                </div>

                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-700 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                    <User className="w-5 h-5 text-gray-300" />
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
