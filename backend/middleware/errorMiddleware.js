module.exports = {
    errorHandler(err, req, res, next) {
        //If statuscode is same with controller then use that, else use 500 (SERVER ERROR)
        const statusCode = res.statusCode ? res.statusCode : 500

        res.status(statusCode)

        res.json({
            message: err.message, 
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
    }
}