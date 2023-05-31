const jwt = require('jsonwebtoken');
const   JWT_SECRET = 'mynameisyasif';


const fetchStaff = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"authenticate using valid token"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.staff = data.staff;
        next()
    } catch (error) {
        res.status(401).send({error:"authenticate using valid token"})
    }
   
}
module.exports = fetchStaff;