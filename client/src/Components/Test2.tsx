import { useEffect, useRef } from "react";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";


const Test2 = () =>  {
    const stompClient = useRef<Stomp.Client | null>(null);
  
    useEffect(() => {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient.current = Stomp.over(socket);
  
      stompClient.current.connect({}, (frame) => {
        console.log("Connected: ", frame);
        stompClient.current?.subscribe("/user/queue/messages", (message) => {
          console.log("Received:", JSON.parse(message.body));
        });
  
        // Example send
        stompClient.current?.send(
          "/app/private-message",
          {},
          JSON.stringify({
            content: "Hello from React!",
            to: "recipientUsername",
          })
        );
      });
  
      return () => {
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.disconnect(() => {
            console.log("Disconnected");
          });
        }
      };
    }, []);
  
    return <h1>Check the console for STOMP WebSocket communication</h1>;
  }


export default Test2