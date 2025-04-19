export interface ReceiverObj {
    receiverProfileImg?: string;
    receiverUsername: string;
    receiverId:string
  }
  

export interface Message {
  id: number;
  sender: string;
  receiver:string,
  content: string;
  timestamp: any; 
  fileUrl?: string;
}