import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { motion } from 'framer-motion';
import {
    Clock,
    CheckCircle,
    PlayCircle,
    Filter,
    Search,
    ChevronRight,
    Trophy,
    Calendar,
    Target,
    Zap,
    Archive,
    History as HistoryIcon,
    Cpu
} from 'lucide-react';

const History = () => {
    const navigate                          = useNavigate();
    const [interviews, setInterviews]       = useState([]);
    const [filtered,   setFiltered]         = useState([]);
    const [loading,    setLoading]          = useState(true);
    const [search,     setSearch]           = useState('');
    const [filterStatus,   setFilterStatus] = useState('ALL');
    const [filterCategory, setFilterCategory] = useState('ALL');

    useEffect(() => {
        let isMounted = true;
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const res = await API.get('/interviews/my-interviews');
                if (isMounted) {
                    setInterviews(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                console.error('Failed to fetch history:', err);
                if (isMounted) setInterviews([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchHistory();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        applyFilters();
    }, [interviews, search, filterStatus, filterCategory]);

    const applyFilters = () => {
        let result = Array.isArray(interviews) ? [...interviews] : [];

        if (search.trim()) {
            result = result.filter((i) =>
                i.targetRole?.toLowerCase().includes(search.toLowerCase()) ||
                i.category?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterStatus !== 'ALL') {
            result = result.filter((i) => i.status === filterStatus);
        }

        if (filterCategory !== 'ALL') {
            result = result.filter((i) => i.category === filterCategory);
        }

        setFiltered(result);
    };

    const scoreColor = (score) => {
        if (!score) return 'text-slate-500';
        if (score >= 8) return 'text-emerald-400';
        if (score >= 6) return 'text-amber-400';
        return 'text-red-400';
    };

    const difficultyLabel = (diff) => {
        const map = { EASY: 'LEVEL 01', MEDIUM: 'LEVEL 02', HARD: 'LEVEL 03' };
        return map[diff] || 'UNKNOWN';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                    {/* Animated Logo Buffer */}
                    <div className="relative w-20 h-20 mb-6">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20"
                        >
                            <Cpu className="w-10 h-10 text-white" />
                        </motion.div>
                        {/* Spinning Orbit Ring */}
                        <div className="absolute inset-[-10px] border-2 border-dashed border-indigo-500/30 rounded-full animate-[spin_8s_linear_infinite]" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] animate-pulse">Neural Archives</span>
                        <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pb-20 selection:bg-indigo-500/30">
            <Navbar />

            <div className="max-w-[1440px] mx-auto px-8 pt-32">
                
                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-indigo-500/50" />
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Historical Data</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
                            Session <span className="text-indigo-500">Archives</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">
                            {interviews.length} Transmissions Logged in Neural Database
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                        <Archive className="w-5 h-5 text-indigo-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Storage: Nominal</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* Left Side: Filters */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        <div className="premium-card !p-8 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Search className="w-3 h-3 text-indigo-500" /> Neural Search
                                </h3>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Filter by role..."
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-4 py-3 rounded-2xl text-xs font-bold uppercase focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Filter className="w-3 h-3 text-purple-500" /> Status Filter
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {['ALL', 'COMPLETED', 'IN_PROGRESS'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setFilterStatus(s)}
                                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all border
                                            ${filterStatus === s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border-indigo-500' : 'bg-slate-950/50 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'}`}
                                        >
                                            {s.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Results List */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="space-y-4">
                            {filtered.length > 0 ? (
                                filtered.map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={item.interviewId}
                                        onClick={() => navigate(`/history/${item.interviewId}`)}
                                        className="premium-card !p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                                                <span className={`text-2xl font-black ${scoreColor(item.overallScore)}`}>{item.overallScore || '—'}</span>
                                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Index</span>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h2 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{item.targetRole}</h2>
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${item.status === 'COMPLETED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-slate-500">
                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><Zap className="w-3 h-3 text-indigo-500" /> {item.category}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><Target className="w-3 h-3 text-purple-500" /> {difficultyLabel(item.difficulty)}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3 h-3 text-slate-600" /> {new Date(item.startedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="hidden md:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">Analyze Transmission</span>
                                                <span className="text-[10px] font-bold text-slate-600 uppercase">View detailed metrics</span>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="premium-card !p-20 flex flex-col items-center justify-center text-center opacity-30 gap-6">
                                    <HistoryIcon className="w-16 h-16" />
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-white uppercase tracking-widest">Archive Empty</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest">No matching neural logs found in database</p>
                                    </div>
                                    <button onClick={() => navigate('/interview')} className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Execute New Session</button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default History;
