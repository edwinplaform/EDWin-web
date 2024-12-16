import {supabase} from "../../supabase";

export const uploadFile = async (file, type) => {
    const filePath = `${type}/${file.name}_${Date.now()}`;
    const {data, error} = await supabase.storage
        .from('edwin')
        .upload(filePath, file);

    if (error) {
        console.error('Upload error:', {
            filePath,
            bucket: 'edwin',
            error: error.message,
        });
        throw error;
    }

    console.log("Upload successful, file path:", data.path);

    // const {publicURL, error: urlError} = supabase.storage
    //     .from('edwin')
    //     .getPublicUrl(data.path);

    const {data: urlData,error: urlError} = supabase.storage
        .from('edwin')
        .getPublicUrl(filePath);

    const publicURL = urlData?.publicUrl;

    if (urlError) {
        console.error('URL error:', urlError);
        throw urlError;
    }

    console.log("Generated public URL:", publicURL);

    return publicURL;
};