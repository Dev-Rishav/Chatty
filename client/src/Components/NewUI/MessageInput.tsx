import { FaceSmileIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent } from 'react';

const MessageInput = ({
  value,
  onChange,
  onSend,
  onFileSelect,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileSelect: (file: File) => void;
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file); // Send file to parent
    }
  };

  return (
    <div className="bg-amber-50 p-6 border-t border-amber-200">
      <div className="flex items-center space-x-4">
        <button className="paper-button">
          <FaceSmileIcon className="w-6 h-6 text-amber-700" />
        </button>

        {/* File Upload Button */}
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <PaperClipIcon className="w-6 h-6 text-amber-700" />
        </label>

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
};

export default MessageInput;
