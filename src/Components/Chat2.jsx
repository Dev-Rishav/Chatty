import React, { useState } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';

function ChatLayout() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="flex h-screen">
            {showSidebar && (
                <div className="w-1/4 min-w-[250px]">
                    <Sidebar />
                </div>
            )}
            <div className={`flex-1 ${showSidebar ? 'w-3/4' : 'w-full'}`}>
                <Chat showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </div>
        </div>
    );
}

export default ChatLayout;