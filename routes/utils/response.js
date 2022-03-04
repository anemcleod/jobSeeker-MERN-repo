// handles server response to request

const response = (res, statusCode, isError, message ) => {
    return (
        res
        .status(statusCode)
        .json({
          message : {
            msgBody : message, 
            msgError: isError
          }
      })
    )
};

module.exports = response;