import React from 'react';
import { Film, Tv, Users, BarChart2, Settings, LayoutDashboard, Monitor } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, isActive }) => {
    return (
        <div className={`
            flex items-center px-4 py-3 cursor-pointer transition-colors duration-200
            ${isActive
                ? 'bg-red-600 text-white rounded-lg shadow-md mx-2'
                : 'text-gray-400 hover:text-white hover:bg-white/5 mx-2 rounded-lg'}
        `}>
            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            <span className="font-medium text-sm">{label}</span>
        </div>
    );
};

const Sidebar = ({ activeView, onNavigate }) => {
    return (
        <div className="w-64 bg-[#0B0D10] flex-shrink-0 flex flex-col border-r border-[#1a1d24] h-full rounded-l-2xl md:rounded-l-2xl rounded-none">
            {/* Logo */}
            <div className="h-20 flex items-center px-6">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3 shadow-lg shadow-red-900/20">
                    <span className="font-bold text-white text-lg">C</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold tracking-wide leading-none">CINEVERSE</span>
                    <span className="text-gray-500 text-xs mt-0.5">Admin</span>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 py-4 space-y-1">
                <div onClick={() => onNavigate('dashboard')}>
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={activeView === 'dashboard'} />
                </div>
                <div onClick={() => onNavigate('movies')}>
                    <SidebarItem icon={Film} label="Movies" isActive={activeView === 'movies'} />
                </div>
                <div onClick={() => onNavigate('tvshows')}>
                    <SidebarItem icon={Tv} label="TV Shows" isActive={activeView === 'tvshows'} />
                </div>
                <div onClick={() => onNavigate('banner')}>
                    <SidebarItem icon={Monitor} label="Hero Banner" isActive={activeView === 'banner'} />
                </div>
                <div onClick={() => onNavigate('analytics')}>
                    <SidebarItem icon={BarChart2} label="Analytics" isActive={activeView === 'analytics'} />
                </div>
                <div onClick={() => onNavigate('settings')}>
                    <SidebarItem icon={Settings} label="Settings" isActive={activeView === 'settings'} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
