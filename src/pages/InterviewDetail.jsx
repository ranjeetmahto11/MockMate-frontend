import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import {
    ArrowLeft,
    Star,
    ThumbsUp,
    TrendingUp,
    CheckCircle,
    Clock,
    Target,
    Zap,
    Calendar,
    Hash
} from 'lucide-react';

const InterviewDetail = () => {
    const { id }                        = useParams();
    const navigate                      = useNavigate();
    const location                      = useLocation();
    const [interview, setInterview]     = useState(
        location.state?.interview || null);
    const [loading, setLoading]         = useState(!location.state?.interview);
    const [activeQuestion, setActive]   = useState(0);

    useEffect(() => {
        if (!interview) fetchInterview();
    }, [id]);

    const fetchInterview = async () => {
        try {
            const res = await API.get(`/api/interviews/${id}`);
            setInterview(res.data);
        } catch (err) {
            console.error('Failed to fetch interview:', err);
        } finally {
            setLoading(false);
        }
    };

    const scoreColor = (score) => {
        if (!score) return 'text-gray-400';
        if (score >= 8) return 'text-green-400';
        if (score >= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="w-8 h-8 border-4 border-indigo-500
                          border-t-transparent rounded-full animate-spin"/>
                </div>
            </div>
        );
    }

    if (!interview) {
        return (
            <div className="min-h-screen bg-gray-950">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-400">Interview not found</p>
                </div>
            </div>
        );
    }

    const questions = interview.questions || [];

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/history')}
                    className="flex items-center gap-2 text-gray-400
                     hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to History
                </button>

                {/* Interview Header */}
                <div className="bg-gradient-to-r from-indigo-600/20
                        to-purple-600/20 rounded-2xl p-6 border
                        border-indigo-500/20 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-3">
                                {interview.targetRole}
                            </h1>
                            <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-gray-400
                                 text-sm">
                  <Target className="w-4 h-4 text-indigo-400" />
                    {interview.category === 'SYSTEM_DESIGN'
                        ? 'System Design'
                        : interview.category.charAt(0) +
                        interview.category.slice(1).toLowerCase()}
                </span>
                                <span className="flex items-center gap-1.5 text-gray-400
                                 text-sm">
                  <Zap className="w-4 h-4 text-yellow-400" />
                                    {interview.difficulty}
                </span>
                                <span className="flex items-center gap-1.5 text-gray-400
                                 text-sm">
                  <Hash className="w-4 h-4 text-green-400" />
                                    {interview.totalQuestions} Questions
                </span>
                                <span className="flex items-center gap-1.5 text-gray-400
                                 text-sm">
                  <Calendar className="w-4 h-4 text-purple-400" />
                                    {formatDate(interview.startedAt)}
                </span>
                                <span className="flex items-center gap-1.5 text-sm">
                  {interview.status === 'COMPLETED'
                      ? <><CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Completed</span></>
                      : <><Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400">In Progress</span></>
                  }
                </span>
                            </div>
                        </div>

                        {/* Overall Score */}
                        {interview.overallScore != null && (
                            <div className="text-center">
                                <p className={`text-5xl font-bold
                              ${scoreColor(interview.overallScore)}`}>
                                    {interview.overallScore}
                                </p>
                                <p className="text-gray-500 text-sm">/10 overall</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Question Navigator */}
                {questions.length > 0 && (
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {questions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`w-10 h-10 rounded-xl font-bold text-sm
                            transition-all
                  ${activeQuestion === i
                                    ? 'bg-indigo-600 text-white'
                                    : q.answer
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-gray-800 text-gray-400'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}

                {/* Question + Answer Detail */}
                {questions.length > 0 && questions[activeQuestion] ? (
                    <div className="space-y-4">

                        {/* Question */}
                        <div className="bg-gray-900 rounded-2xl p-6 border
                            border-gray-800">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg
                                flex items-center justify-center
                                flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    Q{activeQuestion + 1}
                  </span>
                                </div>
                                <p className="text-white text-base leading-relaxed
                              font-medium pt-0.5">
                                    {questions[activeQuestion].questionText}
                                </p>
                            </div>
                        </div>

                        {questions[activeQuestion].answer ? (
                            <>
                                {/* User Answer */}
                                <div className="bg-gray-900 rounded-2xl p-6 border
                                border-gray-800">
                                    <p className="text-gray-400 text-sm font-medium mb-3">
                                        Your Answer
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {questions[activeQuestion].answer.answerText}
                                    </p>
                                </div>

                                {/* Score */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-900 rounded-2xl p-4 border
                                  border-gray-800 text-center
                                  col-span-1">
                                        <p className={`text-4xl font-bold
                      ${scoreColor(
                                            questions[activeQuestion].answer.score)}`}>
                                            {questions[activeQuestion].answer.score}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">/10 score</p>
                                    </div>

                                    {/* AI Feedback */}
                                    <div className="bg-gray-900 rounded-2xl p-4 border
                                  border-gray-800 col-span-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <p className="text-gray-400 text-sm font-medium">
                                                AI Feedback
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-xs leading-relaxed">
                                            {questions[activeQuestion].answer.aiFeedback}
                                        </p>
                                    </div>
                                </div>

                                {/* Strengths & Improvements */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-500/5 rounded-2xl p-5 border
                                  border-green-500/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <ThumbsUp className="w-4 h-4 text-green-400" />
                                            <p className="text-green-400 text-sm font-semibold">
                                                Strengths
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {questions[activeQuestion].answer.strengths}
                                        </p>
                                    </div>

                                    <div className="bg-orange-500/5 rounded-2xl p-5 border
                                  border-orange-500/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <TrendingUp className="w-4 h-4 text-orange-400" />
                                            <p className="text-orange-400 text-sm font-semibold">
                                                Improvements
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {questions[activeQuestion].answer.improvements}
                                        </p>
                                    </div>
                                </div>

                            </>
                        ) : (
                            <div className="bg-gray-900 rounded-2xl p-8 border
                              border-gray-800 text-center">
                                <Clock className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                                <p className="text-gray-500">
                                    This question was not answered yet
                                </p>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="bg-gray-900 rounded-2xl p-8 border
                          border-gray-800 text-center">
                        <p className="text-gray-500">No questions available</p>
                    </div>
                )}

                {/* Try Again */}
                <button
                    onClick={() => navigate('/interview')}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700
                     text-white font-semibold py-3 rounded-2xl
                     transition-colors"
                >
                    Practice Again
                </button>

            </div>
        </div>
    );
};

export default InterviewDetail;