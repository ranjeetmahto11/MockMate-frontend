import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    PlayCircle,
    History,
    LogOut,
    FileText,
    Cpu,
    Bell,
    User
} from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/interview', label: 'Interview', icon: PlayCircle },
        { path: '/resume',    label: 'Resume AI', icon: FileText },
        { path: '/history',   label: 'History',   icon: History },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#020617] border-b border-white/10 shadow-2xl">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Brand Logo */}
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover:rotate-12 transition-transform duration-300">
                        <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-2xl tracking-tighter uppercase leading-none">MockMate</span>
                        <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-[0.2em] mt-1">AI Interview Suite</span>
                    </div>
                </Link>

                {/* Central Navigation - Big and Bold */}
                <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    {navLinks.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`relative flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                            ${isActive(path) ? 'text-white' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                            {isActive(path) && (
                                <motion.div 
                                    layoutId="navActive"
                                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Profile & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-white/10">
                        <div className="text-right">
                            <p className="text-white text-sm font-black uppercase">{user?.fullName?.split(' ')[0] || 'Candidate'}</p>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">System Active</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-black text-white shadow-lg ring-2 ring-white/10">
                            {user?.fullName?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
