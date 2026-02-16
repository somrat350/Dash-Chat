export async function Register(req,res) {
    const {name, userName, email, password} = req.body
    if (!name || !userName || !email || !password) {
        res.status(400).json({message: 'All Fields are required.'})
    }
    
    
}