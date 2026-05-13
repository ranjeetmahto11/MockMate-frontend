import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Loader = ({ message = "Synchronizing..." }) => {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background for Loader */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Animated Logo Buffer */}
                <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20"
                    >
                        <Cpu className="w-10 h-10 text-white" />
                    </motion.div>
                    {/* Spinning Orbit Ring */}
                    <div className="absolute inset-[-12px] border-2 border-dashed border-indigo-500/30 rounded-full animate-[spin_8s_linear_infinite]" />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] animate-pulse">
                        {message}
                    </span>
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
};

export default Loader;
