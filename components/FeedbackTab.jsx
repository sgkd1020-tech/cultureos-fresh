'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackTab({ currentUser, onSubmitFeedback }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmitFeedback(feedback);
      setFeedback('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-premium rounded-2xl p-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Share Your Feedback</h2>
        <p className="text-platinum-400">Help us improve CultureOS by sharing your thoughts and suggestions</p>
      </div>

      <div className="card-premium rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-platinum-300 mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts on features, bugs, improvements, or anything else..."
              rows="8"
              className="w-full bg-noir-800 border border-platinum-700 rounded-lg px-4 py-3 text-white placeholder-platinum-600 focus:outline-none focus:border-champagne-500 focus:ring-2 focus:ring-champagne-500/20 resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-platinum-500">
              Submitting as: <span className="text-champagne-500 font-medium">{currentUser}</span>
            </div>
            <button
              type="submit"
              disabled={!feedback.trim() || submitted}
              className="px-8 py-3 bg-gradient-champagne text-noir-900 font-bold rounded-xl hover:glow-subtle disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitted ? 'Submitted!' : 'Submit Feedback'}
            </button>
          </div>
        </form>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-status-success/10 border border-status-success/30 rounded-lg"
          >
            <p className="text-status-success">Thank you! Your feedback has been submitted to the admin team.</p>
          </motion.div>
        )}
      </div>

      <div className="card-premium rounded-2xl p-6">
        <h3 className="text-xl font-display font-bold text-white mb-4">What to share:</h3>
        <ul className="space-y-2 text-platinum-300">
          <li className="flex items-start gap-2">
            <span className="text-champagne-500 mt-1">•</span>
            <span>Feature requests or improvements you'd like to see</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-champagne-500 mt-1">•</span>
            <span>Bugs or issues you've encountered</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-champagne-500 mt-1">•</span>
            <span>Data accuracy concerns or suggestions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-champagne-500 mt-1">•</span>
            <span>UI/UX feedback on any tab or feature</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-champagne-500 mt-1">•</span>
            <span>General thoughts on how CultureOS is working for you</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
