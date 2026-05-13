import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    Brain,
    Target,
    Zap,
    Hash,
    PlayCircle,
    ChevronRight,
    Cpu,
    ShieldCheck,
    Settings2,
    Briefcase,
    Sparkles,
    Command
} from 'lucide-react';

const InterviewSetup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        targetRole:     'Software Engineer',
        category:       'TECHNICAL',
        difficulty:     'MEDIUM',
        totalQuestions: 5,
    });

    if (loading) return <Loader message="Generating Questions" />;

    const roleSuggestions = [
        'Frontend Developer', 'Backend Developer', 'Fullstack Developer',
        'Data Scientist', 'DevOps Engineer', 'Product Manager',
        'UI/UX Designer', 'QA Engineer', 'Cloud Architect'
    ];

    const categories = [
        { value: 'TECHNICAL',     label: 'Technical',     icon: Cpu, desc: 'System logic & Coding' },
        { value: 'HR',            label: 'Human Resources', icon: Target, desc: 'Culture & Soft skills' },
        { value: 'BEHAVIORAL',    label: 'Behavioral',     icon: Brain, desc: 'Psychological impact' },
        { value: 'SYSTEM_DESIGN', label: 'Architecture',  icon: ShieldCheck, desc: 'Scalability & Design' },
    ];

    const difficulties = [
        { value: 'EASY', label: 'EASY', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', level: '01' },
        { value: 'MEDIUM', label: 'MEDIUM', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', level: '02' },
        { value: 'HARD', label: 'HARD', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', level: '03' },
    ];

    const questionCounts = [3, 5, 10];

    const handleStart = async () => {
        setLoading(true);
        try {
            const res = await API.post('/api/interviews/start', form);
            if (!res.data?.interviewId || !res.data?.questions?.length) {
                toast.error('Failed to load questions. Try again.');
                setLoading(false);
                return;
            }
            toast.success('Neural Link Established. Good luck.');
            navigate('/interview/room', { state: { interview: res.data } });
        } catch (err) {
            console.error('Error:', err.response?.data);
            toast.error('Synthesis Failed. Try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pb-20 selection:bg-indigo-500/30">
            <Navbar />

            <div className="max-w-5xl mx-auto px-8 pt-32">

                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-indigo-500/50" />
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Protocol Setup</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
                            Configure <span className="text-indigo-500">Session</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Adjust parameters for optimal AI assessment</p>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                        <Settings2 className="w-5 h-5 text-indigo-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Engine v4.0</span>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* Left Column: Role & Category */}
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                        
                        {/* 1. Target Role - Redesigned with Suggestions */}
                        <div className="premium-card !p-8 group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Briefcase className="w-32 h-32 text-white" />
                            </div>
                            
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                                    <Command className="w-4 h-4 text-indigo-500" />
                                    01. Target Role
                                </h3>
                                <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                    Manual Entry
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={form.targetRole}
                                        onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                                        placeholder="Enter designation..."
                                        className="w-full bg-white/[0.03] border-b-2 border-white/10 text-white px-0 py-4 text-2xl font-black focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 tracking-tighter"
                                    />
                                </div>

                                {/* Role Suggestions */}
                                <div className="flex flex-wrap gap-2">
                                    {roleSuggestions.map(role => (
                                        <button
                                            key={role}
                                            onClick={() => setForm({ ...form, targetRole: role })}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                                            ${form.targetRole === role 
                                                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20' 
                                                : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-slate-300'}`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Category Selection */}
                        <div className="premium-card !p-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3 mb-8">
                                <Cpu className="w-4 h-4 text-purple-500" />
                                02. Assessment Track
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categories.map(({ value, label, icon: Icon, desc }) => (
                                    <button
                                        key={value}
                                        onClick={() => setForm({ ...form, category: value })}
                                        className={`p-6 rounded-3xl border text-left transition-all duration-300 group
                                        ${form.category === value
                                            ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                                            : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors
                                            ${form.category === value ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className={`font-black text-xs uppercase tracking-widest mb-1 ${form.category === value ? 'text-white' : 'text-slate-400'}`}>{label}</div>
                                        <div className="text-[10px] font-bold text-slate-600 group-hover:text-slate-500 uppercase tracking-tight">{desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Difficulty & Count */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                        
                        {/* 3. Difficulty */}
                        <div className="premium-card !p-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3 mb-8">
                                <Zap className="w-4 h-4 text-amber-500" />
                                03. Intensity Level
                            </h3>
                            <div className="space-y-3">
                                {difficulties.map(({ value, label, color, bg, level }) => (
                                    <button
                                        key={value}
                                        onClick={() => setForm({ ...form, difficulty: value })}
                                        className={`w-full p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 group
                                        ${form.difficulty === value ? `${bg} ${color}` : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[9px] font-black tracking-widest opacity-40 ${form.difficulty === value ? '' : 'text-slate-500'}`}>{level}</span>
                                            <span className={`font-black text-xs uppercase tracking-[0.2em]`}>{label}</span>
                                        </div>
                                        {form.difficulty === value && <Sparkles className="w-4 h-4 animate-pulse" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 4. Question Count */}
                        <div className="premium-card !p-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3 mb-8">
                                <Hash className="w-4 h-4 text-emerald-500" />
                                04. Data Nodes
                            </h3>
                            <div className="flex gap-3">
                                {questionCounts.map((count) => (
                                    <button
                                        key={count}
                                        onClick={() => setForm({ ...form, totalQuestions: count })}
                                        className={`flex-1 py-4 rounded-2xl border font-black text-sm transition-all duration-300
                                        ${form.totalQuestions === count
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                            : 'bg-white/[0.02] border-white/5 text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Start Command */}
                        <button
                            onClick={handleStart}
                            disabled={loading || !form.targetRole}
                            className="w-full relative group overflow-hidden"
                        >
                            <div className="shimmer-button !py-6 flex items-center justify-center gap-4 group-disabled:opacity-50">
                                {loading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span className="font-black text-sm uppercase tracking-[0.3em]">Synthesizing...</span>
                                    </div>
                                ) : (
                                    <>
                                        <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                        <span className="font-black text-sm uppercase tracking-[0.3em]">Initialize Transmission</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InterviewSetup;
