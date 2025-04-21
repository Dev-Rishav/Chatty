import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react'

const EmptyState = ({ onNewChat }: { onNewChat: () => void }) => (
    <div className="paper-container h-full flex flex-col items-center justify-center rounded-sm shadow-paper bg-amber-50">
      <div className="text-center max-w-md space-y-4">
        <div className="inline-flex p-6 rounded-full bg-amber-100">
          <SparklesIcon className="w-12 h-12 text-amber-700 animate-pulse" />
        </div>
        <h2 className="text-2xl font-playfair tracking-wide text-amber-900">
          Welcome to Chatty
        </h2>
        <p className="text-amber-700/80 font-crimson text-lg">
          Begin your parchment-bound conversation.
          Messages sealed with care and tradition.
        </p>
        <button className="paper-send-button mt-6" onClick={onNewChat}>
          Start New Chat
        </button>
      </div>
    </div>
  );

export default EmptyState