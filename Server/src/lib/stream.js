import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Missing Stream API key or secret");    
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
       await streamClient.upsertUsers([userData]);
    } catch (error) {
        console.error("Error upserting Stream user:", error);        
    }
};