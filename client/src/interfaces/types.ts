export interface ReceiverObj {
    receiverProfileImg?: string;
    receiverUsername: string;
    receiverId:string
  }
  

export interface Message {
  id: number;
  from: string;
  to:string,
  content: string;
  timestamp: any; 
  fileUrl?: string;
  reactions?: Record<string, number>;
  encrypted?: boolean;
}

export interface Chat {
  id: number;
  email:string
  username: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  isGroup?: boolean;
  online?: boolean;
  profilePic?: string;
}

export interface UserDTO{
  user_id:number;
  email:string;
  username:string
  profilePic?:string
}

export interface Notification {
  id: string;
  text: string;
  read: boolean;
}