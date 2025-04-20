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
}