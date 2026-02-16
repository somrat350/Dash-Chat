import User from "../model/User.js";
import bcrypt from 'bcryptjs'
export const Register = async(req,res)=> {
    const {name, userName, email, password} = req.body
    try {
        if (!name || !userName || !email || !password) {
          return res.status(400).json({ message: "All Fields are required." });
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists." });
        
        //hashed pass
        const hashedPass = bcrypt.hashSync(password, 10)

        const newUser = new User({
            name,
            userName,
            email,
            password: hashedPass
        })
        if (newUser) {
            const savedUser = await newUser.save()
            res.send(savedUser)
        }

    } catch (error) {
        console.log(error);
        
    }
    
    
}