import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import API from '../api/axios';
import { motion } from 'framer-motion';
import {
    Trophy,
    Target,
    TrendingUp,
    PlayCircle,
    CheckCircle,
    Star,
    BarChart3,
    Sparkles,
    Zap,
    ChevronRight,
    Activity,
    ArrowUpRight,
    Brain,
    History as HistoryIcon,
    Award,
    Clock
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading]     = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchDashboard = async () => {
            try {
                const res = await API.get('/users/dashboard');
                if (isMounted) setDashboard(res.data);
            } catch (err) {
                if (isMounted) {
                    setDashboard({
                        totalInterviews: 0, completedInterviews: 0, averageScore: 0,
                        recentInterviews: [], technicalAvgScore: 0, hrAvgScore: 0,
                        behavioralAvgScore: 0, systemDesignAvgScore: 0
                    });
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchDashboard();
        return () => { isMounted = false; };
    }, []);

    if (loading) return <Loader message="Accessing Neural Hub" />;

    const recentInterviews = dashboard?.recentInterviews || [];
    const latestInterview = recentInterviews[0] || null;

    // Calculate in-progress sessions
    const inProgressCount = (dashboard?.totalInterviews || 0) - (dashboard?.completedInterviews || 0);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pb-20 font-['Plus_Jakarta_Sans']">
            <Navbar />
            
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-grain opacity-[0.015]" />
            </div>

            <main className="relative z-10 max-w-[1440px] mx-auto px-8 pt-32">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                            Neural Hub <span className="text-indigo-500">Console</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                        </h1>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Authorized Access: {user?.fullName || 'Candidate'}</p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/interview')}
                        className="shimmer-button flex items-center gap-3 px-8 !py-4"
                    >
                        <PlayCircle className="w-5 h-5" />
                        <span>INITIALIZE SESSION</span>
                        <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 grid grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { label: 'Completed', val: dashboard?.completedInterviews || '0', icon: CheckCircle, color: 'text-emerald-400', bgGrad: 'from-emerald-500/20 to-emerald-500/5', highlight: true, glowColor: 'rgba(16,185,129,0.5)' },
                            { label: 'In Progress', val: inProgressCount || '0', icon: Clock, color: 'text-cyan-400', bgGrad: 'from-cyan-500/30 to-cyan-500/5', highlight: true, glowColor: 'rgba(34,211,238,0.5)' },
                            { label: 'Neural Index', val: `${dashboard?.averageScore || '0.0'}/10`, icon: Star, color: 'text-amber-400', bgGrad: 'from-amber-500/20 to-amber-500/5', highlight: true, glowColor: 'rgba(251,146,60,0.5)' },
                            { label: 'Tech Sync', val: `${Math.round((dashboard?.technicalAvgScore || 0) * 10)}%`, icon: Brain, color: 'text-indigo-400', bgGrad: 'from-indigo-500/20 to-indigo-500/5', highlight: true, glowColor: 'rgba(79,70,229,0.5)' },
                            { label: 'Status', val: 'Optimal', icon: Zap, color: 'text-purple-400', bgGrad: 'from-purple-500/20 to-purple-500/5', highlight: true, glowColor: 'rgba(168,85,247,0.5)' }
                        ].map((stat, i) => (
                            <motion.div key={i} 
                                whileHover={{ scale: 1.05 }}
                                className={`premium-card group hover:bg-white/[0.08] transition-all !p-6 flex items-center gap-5 relative overflow-hidden ${stat.highlight ? 'bg-gradient-to-br ' + stat.bgGrad + ' border border-current/20' : ''}`}
                                style={{
                                    boxShadow: '0 0 0px rgba(0,0,0,0)'
                                }}
                            >
                                {stat.highlight && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${stat.highlight ? 'bg-gradient-to-br ' + stat.bgGrad + ' border-current/40 shadow-[0_0_20px_-5px_currentColor]' : 'bg-white/5 border-white/5 group-hover:border-white/10'}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className="relative z-10">
                                    <motion.p 
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        className={`text-2xl font-black tracking-tighter leading-none ${stat.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white' : 'text-white'}`}
                                    >
                                        {stat.val}
                                    </motion.p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 group-hover:text-slate-300 transition-colors">{stat.label}</p>
                                </div>
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" style={{boxShadow: `inset 0 0 30px ${stat.glowColor}`}} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="col-span-12 lg:col-span-7 premium-card !p-10 group bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/30 border border-indigo-500/20 relative overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/5 via-transparent to-purple-600/5 opacity-50" />
                        <div className="relative z-10 flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-blue-500/20 flex items-center justify-center border border-indigo-400/40 shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                                </motion.div>
                                <h3 className="text-xl font-black text-white tracking-tight uppercase">Compatibility Matrix</h3>
                            </div>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {[
                                { n: 'Technical Proficiency', s: dashboard?.technicalAvgScore || 0 },
                                { n: 'Behavioral reasoning', s: dashboard?.behavioralAvgScore || 0 },
                                { n: 'Communication Skills', s: dashboard?.hrAvgScore || 0 },
                                { n: 'System Architecture', s: dashboard?.systemDesignAvgScore || 0 }
                            ].map(skill => {
                                const getBarColor = (score) => {
                                    if (score <= 2.5) return 'from-red-500 to-red-600';
                                    if (score <= 5) return 'from-orange-500 to-orange-600';
                                    if (score <= 7.5) return 'from-yellow-400 to-yellow-500';
                                    return 'from-emerald-500 to-green-600';
                                };
                                return (
                                    <div key={skill.n} className="group/skill">
                                        <div className="flex justify-between items-end mb-4">
                                            <motion.span
                                                className="text-[10px] font-black uppercase text-slate-200 tracking-widest group-hover/skill:text-white transition-colors"
                                                whileHover={{ letterSpacing: '0.3em' }}
                                            >
                                                {skill.n}
                                            </motion.span>
                                            <motion.span
                                                className={`text-lg font-black ${skill.s <= 2.5 ? 'text-red-400' : skill.s <= 5 ? 'text-orange-400' : skill.s <= 7.5 ? 'text-yellow-300' : 'text-emerald-400'} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                                            >
                                                {skill.s}/10
                                            </motion.span>
                                        </div>
                                        <div className="h-4 bg-slate-900/80 rounded-lg overflow-hidden p-1 border-2 border-slate-600 group-hover/skill:border-white/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(skill.s || 0)*10}%` }}
                                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                                className={`h-full rounded-md bg-gradient-to-r ${getBarColor(skill.s)} shadow-[0_0_20px_-2px_currentColor] group-hover/skill:shadow-[0_0_30px_0px_currentColor] transition-all`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 premium-card !p-10 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/10 border border-purple-500/20 relative overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/5 via-transparent to-pink-600/5 opacity-50" />
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <div className="flex items-center gap-4">
                                <motion.div 
                                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 flex items-center justify-center border border-amber-400/40 shadow-[0_0_20px_-5px_rgba(251,146,60,0.5)]"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Award className="w-6 h-6 text-amber-300" />
                                </motion.div>
                                <h3 className="text-xl font-black text-white tracking-tight uppercase">Latest Output</h3>
                            </div>
                        </div>
                        {latestInterview ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10 text-center py-8 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-pink-500/15 rounded-[2.5rem] border border-gradient-to-r from-indigo-400/30 via-purple-400/30 to-pink-400/30 shadow-[0_0_30px_-10px_rgba(79,70,229,0.4)]"
                            >
                                <p className="text-[10px] font-black text-amber-300 uppercase tracking-[0.3em] mb-4 drop-shadow-lg">{latestInterview.targetRole}</p>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-2xl rounded-full" />
                                    <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 tracking-tighter relative z-10 drop-shadow-lg">
                                        {latestInterview.overallScore || '0'}<span className="text-2xl opacity-60 ml-2">/10</span>
                                    </p>
                                </motion.div>
                                <motion.div 
                                    className="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_-5px_rgba(16,185,129,0.4)]"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <TrendingUp className="w-4 h-4" /> Improving Factor
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="relative z-10 h-48 flex flex-col items-center justify-center text-center opacity-40 gap-4">
                                <Activity className="w-12 h-12 text-purple-400" />
                                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Awaiting first session <br /> transmission data</p>
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 premium-card !p-10 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/30 border border-indigo-500/20 relative overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 via-transparent to-indigo-600/5 opacity-50" />
                        <div className="relative z-10 flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">Session Archive Logs</h3>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => navigate('/history')} 
                                className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-all hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            >
                                Open Full Vault
                            </motion.button>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentInterviews.slice(0, 3).map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    onClick={() => navigate(`/history/${item.interviewId}`)} 
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-gradient-to-br from-slate-800/40 via-slate-900/20 to-slate-900/40 border border-indigo-500/30 hover:border-indigo-400/60 hover:bg-slate-900/50 hover:shadow-[0_0_35px_-5px_rgba(79,70,229,0.5)] transition-all group cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <motion.div 
                                        className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/50 flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-indigo-400 transition-all shadow-[0_0_15px_-5px_rgba(79,70,229,0.3)]"
                                        whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                                    >
                                        <motion.span 
                                            className="text-white font-black text-lg leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {item.overallScore || '—'}
                                        </motion.span>
                                        <span className="text-[8px] text-indigo-300 font-bold uppercase mt-1">Score</span>
                                    </motion.div>
                                    <div className="relative z-10 flex-1 min-w-0">
                                        <p className="text-sm font-black text-white uppercase truncate tracking-tight group-hover:text-indigo-200 transition-colors">{item.targetRole}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 group-hover:text-slate-300 transition-colors">{item.category} • {new Date(item.startedAt).toLocaleDateString()}</p>
                                    </div>
                                    <motion.div
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <ChevronRight className="relative z-10 w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
