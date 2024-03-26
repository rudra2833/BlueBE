//a function for asyncHandler METH 1 (Meth 2 below)
const asyncHandler = (fn) => async (req, res,next) =>{
    try {
        await fn(req, res, next)
    } catch (error) {
        res.send(err.code || 500).json({
            message: err.message,
            success: false
        })
    }
}

export {asyncHandler}
//a function for asyncHandler METH 2
// const asyncHandler = (requestHandler) => {
//     // returning as a promise
//     (req,res,next) => {
//         Promise.resolve(requestHandler(req,res,next)).
//         catch((err) => next(err))
//     }
// }
