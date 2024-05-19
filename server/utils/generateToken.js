const jwt=require("jsonwebtoken");

const generateToken=(userId, res)=>{
    const token =jwt.sign({userId},process.env.JWT_SCERET,{
        expiresIn:'1d'
    })

    res.cookie("jwt",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict"
    })
    return token;

}

module.exports = generateToken;