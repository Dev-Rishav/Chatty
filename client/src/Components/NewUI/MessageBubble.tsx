import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Message } from '../../interfaces/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MessageBubble = ({ message }: { message: Message }) =>{ 
    const { userDTO } = useSelector((state: RootState) => state.auth);
    if(userDTO === null) return null;

    //for now bind encryption to user
    message.encrypted = true;
    
    return(
    <div className={`flex ${message.from === userDTO.email ? 'justify-end' : 'justify-start'}`}>
      <div className="paper-message max-w-md p-4 relative">
        <div className="absolute top-2 right-2 w-4 h-4 bg-amber-100/50 rounded-full" />
        <p className="text-amber-900 font-crimson font-medium text-lg">
          {message.content}
        </p>
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