import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, Brain, Target,
    TrendingUp, ThumbsUp, PlayCircle,
    CheckCircle, Star, X,
    Sparkles, Zap, ArrowRight,
    Cpu, Scan, FileUp, FileCheck,
    Award, Layers, Lightbulb,
    ClipboardCheck, ShieldCheck, Search
} from 'lucide-react';

const ResumeAnalysis = () => {
    const navigate                        = useNavigate();
    const [file, setFile]                 = useState(null);
    const [dragging, setDragging]         = useState(false);
    const [loading, setLoading]           = useState(false);
    const [analysis, setAnalysis]         = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) validateAndSetFile(selected);
    };

    const validateAndSetFile = (selected) => {
        if (selected.size > 10 * 1024 * 1024) {
            toast.error('Transmission Error: File size exceeds 10MB');
            return;
        }
        setFile(selected);
        toast.success('Resume Encoded');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) validateAndSetFile(dropped);
    };

    const handleAnalyze = async () => {
        if (!file) {
            toast.error('Select Data Source First');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await API.post('/api/resume/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAnalysis(res.data);
            toast.success('Neural Extraction Complete');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Neural Link Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleStartInterview = () => {
        if (!analysis?.interviewId) {
            toast.error('No ID detected');
            return;
        }
        const questions = analysis.questions?.length > 0 ? analysis.questions : analysis.interviewQuestions?.map((q, i) => ({
            questionId: i + 1, questionText: q, questionOrder: i + 1
        })) || [];
        navigate('/interview/room', {
            state: {
                interview: {
                    interviewId: analysis.interviewId, targetRole: analysis.suggestedRole,
                    category: 'TECHNICAL', difficulty: 'MEDIUM',
                    totalQuestions: questions.length, questions: questions,
                }
            }
        });
    };

    const getStatus = () => {
        if (loading) return { text: 'Scanning...', color: 'text-indigo-400', pulse: true };
        if (analysis) return { text: 'Protocol Complete', color: 'text-emerald-400', pulse: false };
        if (file) return { text: 'Source Encoded', color: 'text-amber-400', pulse: true };
        return { text: 'Awaiting Data', color: 'text-slate-500', pulse: false };
    };

    const status = getStatus();

    if (loading && !analysis) return <Loader message="Analyzing Career Vector" />;

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 pb-20 selection:bg-indigo-500/30 overflow-x-hidden">
            <Navbar />

            {/* Immersive Background Canvas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/[0.02] blur-[180px] rounded-full animate-mesh" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/[0.02] blur-[180px] rounded-full animate-mesh" style={{ animationDelay: '-7s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] brightness-100 contrast-150" />
            </div>

            <main className="relative z-10 max-w-[1440px] mx-auto px-8 pt-32">
                
                {/* 1. System Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Neural Processing Unit</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                            RESUME <span className="text-indigo-500">INTELLIGENCE.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">
                            Deploying advanced algorithms to analyze your career trajectory and generate optimal interview protocols.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
                        <div className="flex flex-col items-end">
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${status.color}`}>System: {status.text}</span>
                            <span className="text-slate-600 text-[9px] font-bold uppercase mt-1">NPU Status: Active</span>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 ${status.pulse ? 'animate-pulse' : ''}`}>
                            <Scan className={`w-7 h-7 ${status.color}`} />
                        </div>
                    </div>
                </div>

                {!analysis ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-12 gap-8"
                    >
                        {/* Interactive Dropzone */}
                        <div className="col-span-12 lg:col-span-6">
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onClick={() => document.getElementById('fileInput').click()}
                                className={`group relative overflow-hidden premium-card !p-8 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700
                                ${dragging ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.1)]' : file ? 'bg-emerald-500/5 border-emerald-500/30' : 'border-white/5 hover:border-indigo-500/40 hover:bg-white/[0.02]'}`}
                            >
                                <input id="fileInput" type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="hidden" />
                                
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px]" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center gap-8">
                                    <motion.div 
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-700 ${file ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-white/5 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-600/30'}`}
                                    >
                                        {file ? <FileCheck className="w-14 h-14" /> : <FileUp className="w-14 h-14" />}
                                    </motion.div>
                                    
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                                            {file ? file.name : 'Ingest Data Source'}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] leading-relaxed">
                                            {file ? `[Size: ${(file.size / 1024).toFixed(1)} KB] - Sector Ready` : 'Drop profile or initiate local scan'}
                                        </p>
                                    </div>

                                    <AnimatePresence>
                                        {file && (
                                            <motion.button 
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                                onClick={(e) => { e.stopPropagation(); setFile(null); }} 
                                                className="px-6 py-2.5 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/10"
                                            >
                                                Erase Memory
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Parameters */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <div className="premium-card !p-10 space-y-8 bg-gradient-to-br from-indigo-900/10 via-slate-900 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                        <Cpu className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol Hub</h3>
                                </div>
                                
                                <ul className="space-y-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Document Analysis</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Skill Density Mapping</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Role Alignment Scan</li>
                                </ul>

                                <button 
                                    onClick={handleAnalyze} disabled={!file || loading}
                                    className="w-full shimmer-button !py-7 flex items-center justify-center gap-4 group disabled:opacity-20"
                                >
                                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <span className="font-black text-xs uppercase tracking-[0.3em]">Initialize Extraction</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8 pb-20">
                        {/* Results Matrix Header */}
                        <div className="premium-card !p-12 bg-gradient-to-br from-indigo-600/10 via-[#0B1120] to-transparent border-indigo-500/30">
                            <div className="flex items-center justify-between mb-12">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-[9px] font-black text-indigo-400 uppercase tracking-widest">Profile Synthesized</div>
                                        <span className="text-slate-600 font-black uppercase text-[10px]">Reference: #{analysis.interviewId}</span>
                                    </div>
                                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">{analysis.suggestedRole}</h2>
                                    <div className="flex items-center gap-3 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                                        <Award className="w-4 h-4" /> {analysis.experienceLevel} Tier
                                    </div>
                                </div>
                                <button onClick={() => { setAnalysis(null); setFile(null); }} className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all hover:bg-white/10 border border-white/5"><X className="w-8 h-8" /></button>
                            </div>
                            
                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden">
                                <Sparkles className="absolute top-[-10px] right-[-10px] w-32 h-32 text-white/[0.02] rotate-12" />
                                <div className="flex items-center gap-3 mb-6">
                                    <Brain className="w-5 h-5 text-amber-400" />
                                    <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Neural Executive Summary</h3>
                                </div>
                                <p className="text-slate-400 text-lg leading-relaxed font-medium tracking-tight italic">"{analysis.overallFeedback}"</p>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="premium-card !p-10 border-emerald-500/20 bg-emerald-500/[0.01]">
                                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                    <ThumbsUp className="w-5 h-5" /> Core Competitive Assets
                                </h4>
                                <p className="text-slate-300 text-sm leading-[1.8] font-medium">{analysis.strengths}</p>
                            </div>
                            <div className="premium-card !p-10 border-amber-500/20 bg-amber-500/[0.01]">
                                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5" /> Critical Growth Vectors
                                </h4>
                                <p className="text-slate-300 text-sm leading-[1.8] font-medium">{analysis.improvements}</p>
                            </div>
                        </div>

                        {/* Strategic Trajectory */}
                        <div className="premium-card !p-12 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                <Target className="w-5 h-5" /> Strategic Trajectory Analysis
                            </h4>
                            <p className="text-white text-2xl font-black tracking-tight leading-relaxed max-w-4xl relative z-10">{analysis.careerSuggestion}</p>
                        </div>

                        {/* Action Protocol */}
                        <button 
                            onClick={handleStartInterview}
                            className="group relative w-full overflow-hidden rounded-[2.5rem] p-[2px] transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shimmer bg-[length:200%_auto]" />
                            <div className="relative bg-[#020617] rounded-[calc(2.5rem-2px)] py-12 flex items-center justify-center gap-8 transition-colors group-hover:bg-transparent duration-500">
                                <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                                    <PlayCircle className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-2">Protocol: Ready</p>
                                    <p className="text-4xl font-black text-white uppercase tracking-tighter">Enter Assessment Chamber</p>
                                </div>
                                <ArrowRight className="w-10 h-10 text-white group-hover:translate-x-4 transition-transform duration-500" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default ResumeAnalysis;
