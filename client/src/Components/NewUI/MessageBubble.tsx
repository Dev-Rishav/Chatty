import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Message } from '../../interfaces/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MessageBubble = ({ message }: { message: Message }) =>{ 
    const { userDTO } = useSelector((state: RootState) => state.auth);
    if(userDTO === null) return null;

  // Temporary: mark all messages as encrypted
  message.encrypted = true;

  const isImage = (url: string) => {
    return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  };
    
  return (
    <div className={`flex ${message.from === userDTO.email ? 'justify-end' : 'justify-start'}`}>
      <div className="paper-message max-w-md p-4 relative bg-amber-50  border border-amber-100">
        <div className="absolute top-2 right-2 w-4 h-4 bg-amber-100/50 rounded-full" />

        {/* TEXT */}
        {message.content && (
          <p className="text-amber-900 font-crimson font-medium text-lg break-words whitespace-pre-wrap">
            {message.content}
          </p>
        )}

        {/* FILE PREVIEW */}
        {message.fileUrl && (
          <div className="mt-3">
            {isImage(message.fileUrl) ? (
              <img
                src={message.fileUrl}
                alt="sent file"
                className="max-h-60 rounded-lg border border-amber-200"
              />
            ) : (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue-700 hover:underline bg-amber-100 px-3 py-2 rounded shadow"
              >
                📄 View File
              </a>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-sm italic font-crimson text-amber-700/80">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
          {message.encrypted && (
            <LockClosedIcon className="w-3 h-3 text-amber-700/80" />
          )}
          <div className="flex space-x-1 ml-2">
            {message.reactions &&
              Object.entries(message.reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200"
                >
                  {emoji} {count}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble