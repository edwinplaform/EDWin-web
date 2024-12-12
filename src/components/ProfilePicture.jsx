import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import {useUser} from "@clerk/nextjs";
import Image from "next/image";

const ProfilePicture = () => {
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(user?.imageUrl);

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

    const handleUpload = async (info) => {
        const file = info.file;

        if (!file) return;

        setLoading(true);

        try {
            if (!user) {
                message.error('User not found!');
                setLoading(false);
                return;
            }

            await user.setProfileImage({file});
            await user.reload();

            setImageUrl(user.imageUrl);
            message.success('Profile picture uploaded successfully.');

        } catch (err) {
            console.log("-------------- Error uploading profile picture :", err);
            message.error('Failed to upload profile picture!');
        } finally {
            setLoading(false);
        }
    }

    // const handleChange = (info) =>{
    //     const {status} = info.file;
    //
    //     if (status === 'error'){
    //         const errorMsg = info.file.response.toString();
    //         alert(errorMsg);
    //     }
    // };


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
                customRequest={({file, onSuccess, onError}) =>{
                    handleUpload({file})
                        .then(() => onSuccess('ok'))
                        .catch((err) => onError(err));
                }}
                // onChange={handleChange}
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