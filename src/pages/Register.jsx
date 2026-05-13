import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName:        '',
        email:           '',
        password:        '',
        targetRole:      '',
        experienceLevel: 'FRESHER',
    });

    const avatars = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
        'https://randomuser.me/api/portraits/women/4.jpg'
    ];

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(form);
        if (success) {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#020617] relative overflow-hidden pt-20">
            {/* Animated Background Canvas */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/20 blur-[120px] rounded-full animate-mesh" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-600/10 blur-[120px] rounded-full animate-mesh opacity-50" style={{ animationDelay: '-5s' }} />
                
                {/* Noise and Grid */}
                <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[1100px] grid lg:grid-cols-2 glass-panel overflow-hidden z-10"
            >
                {/* Left Side: Branding/Visual */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-white/[0.01] border-r border-white/[0.05]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">MockMate AI</span>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl font-bold leading-tight text-gradient">
                            Start your <br />
                            <span className="text-indigo-400">journey</span> to <br />
                            excellence.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Join our elite community of professionals who use AI to stay ahead of the curve.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {avatars.map((src, i) => (
                                <img key={i} src={src} className="w-10 h-10 rounded-full border-2 border-[#020617]" />
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                            <span className="text-white">Active</span> Neural Hub
                        </p>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-slate-500 text-sm">Join the next generation of interviewees</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Target Role */}
                        <div className="space-y-1">
                            <div className="relative group">
                                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    name="targetRole"
                                    value={form.targetRole}
                                    onChange={handleChange}
                                    placeholder="Target Role (e.g. Java Dev)"
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Experience Level */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Experience Level</label>
                            <div className="relative group">
                                <select
                                    name="experienceLevel"
                                    value={form.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-slate-900/50"
                                >
                                    <option value="FRESHER" className="bg-slate-900 text-white">🎓 Fresher (0 years)</option>
                                    <option value="JUNIOR" className="bg-slate-900 text-white">⚡ Junior (1-2 years)</option>
                                    <option value="MID" className="bg-slate-900 text-white">🚀 Mid-Level (3-5 years)</option>
                                    <option value="SENIOR" className="bg-slate-900 text-white">👑 Senior (5+ years)</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="shimmer-button w-full flex items-center justify-center gap-3 !py-4 mt-4"
                        >
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <motion.div 
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>SYNCHRONIZING...</span>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span>Create Identity</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-xs pt-6">
                        Already registered?{' '}
                        <Link to="/login" className="text-white font-bold hover:text-indigo-400 transition-all border-b border-indigo-500/30 hover:border-indigo-500 pb-0.5">
                            Sign in to console
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;