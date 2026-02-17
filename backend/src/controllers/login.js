import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const login = async (req, res,next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All Fileds are required" });
        }

        const dbUser = await User.findOne({ email })
        
        if (!dbUser) {
            return res.status(400).json({message:"acount not found please check your email or register",
            });
        }

        const isPassOk = await bcrypt.compare(password, dbUser.password)
        if (!isPassOk) {
            return res.status(400).json({message: 'Password incorrect, Please try again'})
        }
         res.status(200).json({
           _id: dbUser._id,
           name: dbUser.name,
           email: dbUser.email,
         });

    } catch (error) {
        next(error)
    }
}