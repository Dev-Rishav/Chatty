import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

/**
 * Fetch all messages from the API.
 * @param apiUrl - The API endpoint to fetch messages from.
 * @param token - The authentication token to include in the request.
 * @returns A promise that resolves to the list of messages.
 */
const fetchAllMessages = async ( token:string ,user: string) => {
  try {
    const apiUrl:string = `http://localhost:8080/api/messages/between?user=${user}`
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("messages",response.data);
    return response.data; // Return the fetched messages

    
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export default fetchAllMessages;