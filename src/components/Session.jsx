// components/Session.js
import React, { useState } from 'react';
import { Typography } from 'antd';
import Chat from './Chat';
import MaterialUpload from './MaterialUpload';
import MaterialList from './MaterialList';
import PaymentUpload from './PaymentUpload';

const { Title } = Typography;

const Session = ({ tutor, materials }) => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, message]);
    };

    return (
        <div>
            <Title level={2}>Session with {tutor.name}</Title>
            <Chat messages={messages} onSend={handleSendMessage} />
            <MaterialUpload />
            <MaterialList materials={materials} />
            <PaymentUpload />
        </div>
    );
};

export default Session;