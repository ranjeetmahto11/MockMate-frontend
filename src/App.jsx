import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InterviewSetup from './pages/InterviewSetup';
import InterviewRoom from './pages/InterviewRoom';
import History from './pages/History';
import InterviewDetail from './pages/InterviewDetail';
import ResumeAnalysis from './pages/ResumeAnalysis';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#020617',
                            color:      '#f9fafb',
                            border:     '1px solid #1e293b',
                        },
                    }}
                />
                <Routes>
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    }/>
                    <Route path="/interview" element={
                        <ProtectedRoute><InterviewSetup /></ProtectedRoute>
                    }/>
                    <Route path="/interview/room" element={
                        <ProtectedRoute><InterviewRoom /></ProtectedRoute>
                    }/>
                    <Route path="/history" element={
                        <ProtectedRoute><History /></ProtectedRoute>
                    }/>
                    <Route path="/history/:id" element={
                        <ProtectedRoute><InterviewDetail /></ProtectedRoute>
                    }/>
                    <Route path="/resume" element={
                        <ProtectedRoute><ResumeAnalysis /></ProtectedRoute>
                    }/>

                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;