import React from 'react';

const Message = ({message}) => {
    return (
        <p className="error-message">{message.msgBody}</p>
    )
}

export default Message;