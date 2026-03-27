'use client';

import { motion } from 'framer-motion';

// Built by stargirl | CAA | January 2026

export default function SimulationLoading({ progress = 0, message = 'Running simulation...' }) {
  return (
    <div className="fixed inset-0 bg-carbon-950/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        {/* Main Loading Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-noir-900 to-carbon-950 rounded-2xl border border-noir-800 p-12"
        >
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative w-24 h-24"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500 to-bronze-500 opacity-20 blur-xl" />
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeDasharray="60 200"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Status Text */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {message}
            </h3>
            <p className="text-platinum-400">
              Analyzing cultural impact across markets
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="h-2 bg-noir-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-bronze-500 to-gold-500"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${progress}%`,
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  width: { duration: 0.5, ease: 'easeOut' },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                }}
                style={{
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-platinum-500 text-sm">0%</span>
              <span className="text-gold-400 text-sm font-mono">{progress}%</span>
              <span className="text-platinum-500 text-sm">100%</span>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Entity Mapping', icon: '○' },
              { label: 'Impact Modeling', icon: '◐' },
              { label: 'Results Synthesis', icon: '◑' }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: progress > (i * 33) ? 1 : 0.3,
                  scale: progress > (i * 33) ? 1 : 0.95
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`text-3xl mb-2 ${
                  progress > (i * 33) ? 'text-gold-400' : 'text-platinum-600'
                }`}>
                  {step.icon}
                </div>
                <div className={`text-xs ${
                  progress > (i * 33) ? 'text-white' : 'text-platinum-600'
                }`}>
                  {step.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold-400 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0
                }}
                animate={{
                  y: '-10%',
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Powered by indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-platinum-500 text-sm">
            Powered by CultureOS simulation engine
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Compact inline loading indicator for smaller components
export function InlineLoading({ size = 'md', message }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-gold-500 border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {message && <span className="text-platinum-400 text-sm">{message}</span>}
    </div>
  );
}
