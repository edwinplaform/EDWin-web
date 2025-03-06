import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import Image from "next/image";
import {useCurrentUser} from "@/util/auth";
import {supabase} from "../../supabase";

const ProfilePicture = ({setValue}) => {
    const user = useCurrentUser();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('Image must smaller than 5MB!');
            return false;
        }
        return true;
    };

    const handleUpload = async (file) => {
        if (!file || !file.name) {
            console.error("Invalid file:", file);
            message.error("Invalid file selected.");
            return;
        }

        console.log("Uploading file:", file.name);
        // if (!file) return;
        setLoading(true);

        try {
            if (!user) {
                message.error('User not found!');
                setLoading(false);
                return;
            }

            const fileName = `profile/${user.id}_${Date.now()}_${file.name}`;
            const {data, error} = await supabase.storage
                .from('edwin')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error("----------supabase profile picture uploading err: ", error);
                message.error("Failed to upload profile picture");
                return false;
            }

            const {data: urlData} = supabase.storage
                .from('edwin')
                .getPublicUrl(fileName);

            const publicURL = urlData?.publicUrl;

            if (!publicURL) {
                console.error("------------supabase profile picture url error");
                return false;
            }

            setImageUrl(publicURL);

            setFileList([{
                name: file.name,
                status: 'done',
                url: publicURL,
            }]);

            setValue('profilePhotoUrl', publicURL);

            message.success("Profile picture uploaded successfully.");
            return true;

        } catch (err) {
            setFileList([{
                name: file.name,
                status: 'error',
            }]);

            console.log("-----------------err for profile photo upload: ", err);
            message.error("Failed to upload profile photo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div className="justify-self-center p-4">
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={({file, onSuccess, onError}) => {
                    handleUpload(file)
                        .then(() => onSuccess('ok'))
                        .catch((err) => onError(err));
                }}
            >
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="avatar"
                        width={200}
                        height={200}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </div>
    );
};
export default ProfilePicture;