import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles, ArrowRight, Github, Chrome } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });

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
        const success = await login(form);
        if (success) {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#020617] relative">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 bg-[#020617]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-500/30 rounded-full animate-pulse" />
                <div className="absolute top-40 right-32 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-indigo-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-[#0B1120]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 relative hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] transition-shadow duration-500">
                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 rounded-[2.5rem] pointer-events-none" />
                

                {/* Left Side: Branding */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-white/[0.02] border-r border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">MockMate AI</span>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-6xl font-black leading-[0.9] text-white tracking-tighter uppercase">
                            Level Up <br />
                            <span className="text-indigo-500">Skills.</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                            The industry standard for AI-powered interview preparation. Access the hub to begin.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 w-fit">
                        <div className="flex -space-x-2">
                            {avatars.slice(0,3).map((src, i) => (
                                <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-[#0B1120]" />
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            <span className="text-white">Active</span> Network
                        </p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-transparent">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Access Hub</h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Neural Authentication</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[9px] font-black text-indigo-500 uppercase hover:text-indigo-400 transition-colors">Forgot Security Key?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="shimmer-button w-full flex items-center justify-center gap-3 !py-5 mt-4"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span className="font-black uppercase tracking-widest text-[10px]">Authorizing...</span>
                                </div>
                            ) : (
                                <>
                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Establish Link</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black">
                                <span className="bg-[#0B1120] px-4">Social Connect</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <a 
                                href="https://github.com/login" 
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-95"
                            >
                                <Github className="w-4 h-4 text-white" />
                                GitHub
                            </a>
                            <a 
                                href="https://accounts.google.com/" 
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-95"
                            >
                                <Chrome className="w-4 h-4 text-white" />
                                Google
                            </a>
                        </div>

                        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            New candidate?{' '}
                            <Link to="/register" className="text-indigo-500 hover:text-indigo-400 transition-all border-b border-indigo-500/30">
                                Create Identity
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
