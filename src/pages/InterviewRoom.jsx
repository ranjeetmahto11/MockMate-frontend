import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, MicOff, Send, ChevronRight,
    Clock, Star, ThumbsUp, TrendingUp,
    CheckCircle, AlertCircle, ArrowLeft,
    Briefcase, Sparkles, X, SkipForward
} from 'lucide-react';

const InterviewRoom = () => {
    const location                        = useLocation();
    const navigate                        = useNavigate();
    const { interview }                   = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer]             = useState('');
    const [feedback, setFeedback]         = useState(null);
    const [submitting, setSubmitting]     = useState(false);
    const [isListening, setIsListening]   = useState(false);
    const [timer, setTimer]               = useState(120);
    const [timerActive, setTimerActive]   = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);
    const [completed, setCompleted]       = useState(false);
    const [overallScore, setOverallScore] = useState(null);
    const [allScores, setAllScores]       = useState([]);

    const recognitionRef = useRef(null);
    const timerRef       = useRef(null);
    const textareaRef    = useRef(null);

    const questions       = interview?.questions || [];
    const currentQuestion = questions[currentIndex] || null;
    const targetRole      = interview?.targetRole || 'Unknown Role';

    // ── Helper: Safe Score Color ──
    const getScoreColor = (val) => {
        const score = parseFloat(val);
        if (!score || isNaN(score)) return 'text-slate-500';
        if (score >= 8) return 'text-emerald-400';
        if (score >= 6) return 'text-amber-400';
        return 'text-red-400';
    };

    // ── Calculation logic ──
    const getFinalScore = () => {
        if (overallScore !== null) return overallScore;
        if (!allScores || allScores.length === 0) return "0.0";
        const avg = allScores.reduce((a, b) => a + (b || 0), 0) / allScores.length;
        return avg.toFixed(1);
    };

    // ── Redirect if no interview ──
    useEffect(() => {
        if (!interview) {
            toast.error('Session initialization failed');
            navigate('/interview');
        }
    }, [interview, navigate]);

    // ── Timer Logic ──
    useEffect(() => {
        if (!timerActive || showFeedback || completed) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimerEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerActive, showFeedback, completed, currentIndex]);

    const handleTimerEnd = () => {
        toast('⏰ Time limit reached. Auto-submitting.', { icon: '⏰' });
        handleSubmit(true); // Force submit
    };

    // ── Speech Recognition ──
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && !recognitionRef.current) {
            try {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event) => {
                    let transcript = '';
                    for (let i = 0; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript;
                    }
                    setAnswer(transcript);
                };

                recognitionRef.current.onerror = (event) => {
                    console.error("Speech Error:", event.error);
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            } catch (e) { console.error("Recognition Init Failed", e); }
        }
    }, []);

    const toggleVoice = () => {
        if (!recognitionRef.current) return toast.error('Voice not supported');
        
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setAnswer('');
            setIsListening(true);
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error(e);
                setIsListening(false);
            }
        }
    };

    const handleSubmit = async (force = false) => {
        if (!force && !answer.trim()) {
            toast.error('Please structure a response');
            return;
        }

        setTimerActive(false);
        setSubmitting(true);
        if (isListening) recognitionRef.current?.stop();

        try {
            const res = await API.post('/api/interviews/submit-answer', {
                interviewId: interview.interviewId,
                questionId:  currentQuestion?.questionId,
                answerText:  answer || "No response recorded.",
            });

            const currentScore = res.data.score || 0;
            const updatedScores = [...allScores, currentScore];
            setAllScores(updatedScores);

            if (res.data.isLastQuestion) {
                const final = res.data.overallScore ?? (updatedScores.reduce((a, b) => a + b, 0) / updatedScores.length).toFixed(1);
                setOverallScore(final);
                setCompleted(true);
            }

            setFeedback(res.data);
            setShowFeedback(true);
        } catch (err) {
            console.error("Submission failed", err);
            toast.error('Transmission error. Resetting timer.');
            setTimerActive(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSkip = () => {
        if (currentIndex >= questions.length - 1) {
            setCompleted(true);
            return;
        }
        setAnswer('');
        setTimer(120);
        setCurrentIndex(prev => prev + 1);
        toast('Protocol Skipped', { icon: '⏭️' });
    };

    const handleNext = () => {
        setAnswer('');
        setFeedback(null);
        setShowFeedback(false);
        setTimer(120);
        setTimerActive(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // ── Guard Render ──
    if (!interview) return null;

    // ── Final Result Screen ──
    if (completed && !showFeedback) {
        const displayScore = getFinalScore();
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center premium-card !p-12">
                    <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                    <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Mission Accomplished</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Data sync complete</p>
                    
                    <div className="bg-white/[0.03] rounded-3xl p-10 border border-white/5 mb-8">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Performance Index</p>
                        <p className={`text-7xl font-black mb-4 ${getScoreColor(displayScore)} tracking-tighter`}>
                            {displayScore}<span className="text-2xl opacity-20 ml-1">/10</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/dashboard')} className="shimmer-button w-full !py-5 uppercase tracking-[0.2em] text-xs">Return to Hub</button>
                        <button onClick={() => navigate('/interview')} className="w-full py-4 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-colors">New Session</button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Feedback Screen ──
    if (showFeedback && feedback) {
        return (
            <div className="min-h-screen bg-[#020617] px-6 py-20">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                        <div className={`text-8xl font-black mb-4 ${getScoreColor(feedback.score)} tracking-tighter`}>
                            {feedback.score}<span className="text-3xl opacity-30">/10</span>
                        </div>
                        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Phase 0{currentIndex + 1} Metrics</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="premium-card">
                            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-4">AI Assessment</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feedback.aiFeedback}</p>
                        </div>
                    </div>

                    {!feedback.isLastQuestion ? (
                        <button onClick={handleNext} className="shimmer-button w-full flex items-center justify-center gap-3 !py-6 font-black uppercase text-sm">Next Question Phase</button>
                    ) : (
                        <button onClick={() => setShowFeedback(false)} className="shimmer-button w-full !from-emerald-600 !to-emerald-500 flex items-center justify-center gap-3 !py-6 font-black uppercase text-sm">Finalize Session</button>
                    )}
                </div>
            </div>
        );
    }

    // ── Main Interview UI ──
    return (
        <div className="min-h-screen bg-[#020617] px-6 py-20">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Phase 0{currentIndex + 1} of {questions.length}</span>
                        <div className="flex items-center gap-2 text-white font-black uppercase tracking-tighter text-xl">
                            <Briefcase className="w-5 h-5 text-indigo-400" />
                            {targetRole}
                        </div>
                    </div>
                    <div className={`px-6 py-3 rounded-2xl font-black text-xl tracking-widest border transition-all ${timer <= 30 ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse scale-110 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                        {formatTime(timer)}
                    </div>
                </div>

                <div className="premium-card mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                    <div className="relative z-10 flex gap-6 p-2">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg font-black text-white text-xl">Q{currentIndex + 1}</div>
                        <p className="text-white text-2xl font-bold leading-tight tracking-tight pt-2">{currentQuestion?.questionText || 'Initializing...'}</p>
                    </div>
                </div>

                <div className="premium-card !p-0 overflow-hidden mb-8 border-white/10">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cognitive Input</span>
                        <button onClick={toggleVoice} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-slate-400 border border-white/5'}`}>
                            {isListening ? "STOP LISTENING" : "VOICE INPUT"}
                        </button>
                    </div>
                    <textarea
                        ref={textareaRef} value={answer} onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Structure your intelligence response..."
                        className="w-full bg-transparent text-white p-8 focus:outline-none resize-none placeholder-slate-800 text-xl leading-relaxed h-64 font-medium"
                    />
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => handleSubmit(false)} 
                        disabled={submitting || !answer.trim()} 
                        className="shimmer-button flex-1 flex items-center justify-center gap-3 !py-6 font-black uppercase text-sm"
                    >
                        {submitting ? "ANALYZING..." : "SUBMIT RESPONSE"}
                    </button>
                    <button 
                        onClick={handleSkip} 
                        disabled={submitting} 
                        className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                    >
                        <SkipForward className="w-4 h-4" />
                        SKIP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewRoom;
