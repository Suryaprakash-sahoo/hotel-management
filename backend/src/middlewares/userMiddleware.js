const jwt = require('jsonwebtoken');

module.exports = (req , res , next)=>{
    try {
        let token;

        if(req.cookies && req.cookies.token){
            token = req.cookies.token;
        }else if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token found , authorization denied"
            });
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = {id:decoded.userId}
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Token is not valid"
        });
    }
}