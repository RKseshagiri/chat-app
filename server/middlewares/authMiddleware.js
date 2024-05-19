const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const cookie = require('cookie');

const secret = process.env.JWT_SCERET; 


const verifyToken = (req, res, next) => {
  
  const token = req.cookies.jwt; 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
  
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
try{
  if (!token) {
    return next(new Error('Authentication error: No token found'));
  }
  jwt.verify(token, process.env.JWT_SCERET, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error: Invalid token'));
    }
    socket.user = decoded;
    next();
  });
}
catch(error){
  res.status(500).json({ message: 'Internal server error' });
}
};





module.exports = { verifyToken, authenticateSocket };
