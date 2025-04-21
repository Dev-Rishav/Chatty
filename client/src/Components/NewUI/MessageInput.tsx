import { FaceSmileIcon } from '@heroicons/react/24/outline';
import React from 'react'

const MessageInput = ({
    value,
    onChange,
    onSend
  }: {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
  }) => (
    <div className="bg-amber-50 p-6 border-t border-amber-200">
      <div className="flex items-center space-x-4">
        <button className="paper-button">
          <FaceSmileIcon className="w-6 h-6 text-amber-700" />
        </button>
        <input
          type="text"
          placeholder="Write your message..."
          className="paper-input flex-1 py-3 px-4"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="paper-send-button" onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  );

export default MessageInput