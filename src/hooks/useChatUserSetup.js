import {supabase} from "../../supabase";
import {useState} from "react";

export const useChatUserSetup = () => {
    const [isCreatingChatUser, setIsCreatingChatUser] = useState(false);
    const [chatUserError, setChatUserError] = useState(null);

    const setupChatUser = async (userId, userData) => {
        setIsCreatingChatUser(true);
        setChatUserError(null);

        try {
            const chatUserData = {
                id: userId,
                first_name: userData.firstName,
                last_name: userData.lastName,
                avatar_url: userData.profilePhotoUrl || '/avatar.png',
                created_at: new Date().toISOString()
            };

            const {error} = await supabase
                .from('users')
                .upsert(chatUserData, {
                    onConflict: 'id',
                    ignoreDuplicates: false
                });

            if (error) throw error;
            return true;
        } catch (error) {
            setChatUserError(error);
            return false;
        } finally {
            setIsCreatingChatUser(false);
        }
    };

    return {
        setupChatUser,
        isCreatingChatUser,
        chatUserError
    };
};