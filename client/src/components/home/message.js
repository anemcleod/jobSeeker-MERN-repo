import React from 'react';

const Message = ({message}) => {
    return (
        <p className={message.msgError ? "error-message" : "success-message"}>{message.msgBody}</p>
    )
}

export default Message;