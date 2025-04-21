import axios from "axios";

/**
 * Fetch all messages from the API.
 * @param apiUrl - The API endpoint to fetch messages from.
 * @param token - The authentication token to include in the request.
 * @returns A promise that resolves to the list of messages.
 */
const fetchAllChats= async ( token:string) => {
  try {
    const apiUrl:string = `http://localhost:8080/allChats`
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export default fetchAllChats;