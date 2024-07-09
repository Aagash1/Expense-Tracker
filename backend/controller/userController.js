const userModel = require('../db/userModel')
const { error, success } = require('../utils/handler')

const loginController = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) {
           return res.send(error(400,"Email and password Required!!"));
            
        }
         user = await userModel.findOne({email , password});
        if(!user)
        {
           return res.send(error(401 , "User Not Found!! Please Sign Up"))
        }
        return res.send(success(201 , user));
    } catch (err) {
        return res.send(error(401,err.message));
    }
}

const signupContorller =async (req,res)=>{
    try {
        const {username , email , password } = req.body;
        if(!username || !email || !password)
        {
           return res.send(error(401 , "Enter Every Field!!!"));
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log(existingUser);
            return res.send(error(409, "Email already registered. Please use a different email."));
        }
        const newUser = await userModel.create({
            username , 
            email,
            password
        })
        
        return res.send(success(201 , "user is created"));
    } catch (err) {
       return res.send(error(401 , err.message));
    }
}

const logoutController = async (req, res) => {
        return res.send(success(200, "Logged out successfully."));
};

module.exports = {
    loginController,
    logoutController,
    signupContorller
}