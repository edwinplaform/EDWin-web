import {Button, message, Upload} from 'antd';
import {useState} from "react";
import {supabase} from "../../supabase";
import {useCurrentUser} from "@/util/auth";

const UploadButton = ({setValue}) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const user = useCurrentUser();

    const handleFileUpload = async ({file, onSuccess, onError}) => {
        const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024;

        if (!isValidType) {
            message.error('You can only upload PDF, JPEG, or PNG files!');
            return false;
        }
        if (!isValidSize) {
            message.error('File size must be less than 5MB!');
            return false;
        }

        try {
            if (!user) {
                console.log("-----------user not logged in");
                return false;
            }

            setUploading(true);

            const fileName = `certificates/${user.id}_${Date.now()}_${file.name}`;
            const {data, error} = await supabase.storage
                .from('edwin')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error("----------supabase uploading err: ", error);
                message.error("Failed to upload certificate");
                onError(error);
                return false;
            }

            const {data: urlData} = supabase.storage
                .from('edwin')
                .getPublicUrl(fileName);

            const publicURL = urlData?.publicUrl;

            if (!publicURL) {
                console.error("------------supabase url error");
                return false;
            }

            setFileList([{
                name: file.name,
                status: 'done',
                url: publicURL,
            }]);

            setValue('certificateUrl', publicURL);

            message.success("Certificate uploaded successfully.");
            onSuccess(publicURL);
            return true;

        } catch (err) {
            setFileList([{
                name: file.name,
                status: 'error',
            }]);

            console.log("-----------------err for upload: ", err);
            message.error("Failed to upload certificate");
            onError(err);
            return false;

        } finally {
            setUploading(false);
        }
    };

    const props = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        fileList,
        customRequest: handleFileUpload,
        onChange(info) {
            setFileList(info.fileList.slice(-1));
        },
        onRemove: (file) => {
            setFileList((prev) => prev.filter((item) => item.name !== file.name));
        },
    };

    return (
        <div>
            <Upload {...props}>
                <Button
                    loading={uploading}>
                    Click to Upload
                </Button>
            </Upload>
        </div>
    );
};

export default UploadButton;