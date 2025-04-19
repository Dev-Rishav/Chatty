import { useEffect, useRef } from "react";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";

const Test2 = () => {
  const stompClient = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // 👇 Append token as a query parameter since SockJS doesn't support headers
    const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);

    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, (frame) => {
      console.log("Connected: ", frame);

      stompClient.current?.subscribe("/user/queue/messages", (payload) => {
        // const payload = JSON.parse(message.body);
        const message = JSON.parse(payload.body);
        console.log("Received:", message);
        alert(`Received: ${message.content}`);
      });

      // Example send
      stompClient.current?.send(
        "/app/private-message",
        {},
        JSON.stringify({
          content: "Hello from React!",
          to: "t@t.com", // Change this to a valid username or userId on your backend
        })
      );
    });

    return () => {
      if (stompClient.current?.connected) {
        stompClient.current.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  return <h1>Check the console for STOMP WebSocket communication</h1>;
};

export default Test2;
