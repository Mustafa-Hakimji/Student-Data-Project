const express = require('express');
const app = express();
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cors = require('cors');
const Nursary = require('../model/classNursary');
const LKG = require('../model/classLKG');
const UKG = require('../model/classUKG')
const class1 = require('../model/class1');



app.use(cors({
    origin:"*",
}))


router.get('/', (req, res) => {
    res.send("Home page Server side router JS")
});

router.get('/getAllUsers',(req,res)=>{
    User.find((error,response)=>{
        if(error){
            res.send(error)
            console.log("This error occured while getting user details", error)
        }
        else{
            res.status(200).send(response)
        }

    })
})

// this we are gettin g using the promises (.then and .catch)

// router.post('/register', (req,res)=>{

//     const {name,email,phone,work,password,cpassword} = req.body

//     if (!name || !email || !phone || !work || !password || !cpassword ){
//     return res.status(422).json({error:"All fields are require"})
//     }

//     User.findOne({email:email})
//     .then((userExists)=>{
//         if(userExists){
//           return  res.status(422).json({error:"This Email already exists"})
//         }

//         const user = new User({name,email,phone,work,password,cpassword})

//         user.save().then(()=>{
//             res.status(200).json({message:"User added successfully"})
//         }).catch((error)=>res.status(500).json({message:"Failed to register"}))

//     }).catch(err=>{console.log(err)})

// });


// This we are getting using the async await 

// Nursary class post request

router.post('/class-nursary', async (req,res)=>{
    const { name,father,mother,adhaar,phone,sssm,bank,ifsc} = req.body;

    if (!name || !father || !mother || !adhaar || !phone || !sssm || !bank || !ifsc){
        return res.status(422),json({error:"All fields are required..Registration failed."})
    }
    try{
        const studentExist = await Nursary.findOne({name:name})
        if(studentExist){
            return res.status(422).json({ error: "This Student already registered" })
        }else{
            const student = new Nursary ({name,father,mother,adhaar,phone,sssm,bank,ifsc})
            await student.save()

            res.status(200).json({message:"Student Regitered in Class Nursary successfully."})
        }
    } catch(err){
        console.log("not able to register due to ",err); 
        res.status(500).json({ message: "Failed to register" });
    }
});


// LKG class p[ost request
router.post('/class-lkg', async (req,res)=>{
    const { name,father,mother,adhaar,phone,sssm,bank,ifsc} = req.body;
    if (!name || !father || !mother || !adhaar || !phone || !sssm || !bank || !ifsc){
        return res.status(422),json({error:"All fields are required..Registration failed."})
    }

    try{
        const studentExist = await LKG.findOne({name:name})
        if(studentExist){
            res.status(422).json({error:"Student already registered"})
        }else{
            const student = new LKG({name,father,mother,adhaar,phone,sssm,bank,ifsc})
            await student.save();
            res.status(200).json({message:"Student registered in Class LKG successfully."})
        }

    }catch(err){
        console.log("cannot register student because = ",err)
        res.status(500).json({error:"Cannto register"})
    }

});

router.post('/class-ukg', async (req,res)=>{
    const { name,father,mother,adhaar,phone,sssm,bank,ifsc} = req.body;
    if (!name || !father || !mother || !adhaar || !phone || !sssm || !bank || !ifsc){
        res.status(422).json({error:"All fields are required"});
    }
    try{
        const studentExist = await UKG.findOne({name:name});
        if(studentExist){
            res.status(422).json({error:"Student is already registered !!"})
        }else{
            const student = new UKG({name,father,mother,adhaar,phone,sssm,bank,ifsc})
            await student.save();
            res.status(200).json({message:"Student registered in Class UKG successfully."})
        }

    }catch(error){
        console.log("Student cannot be registered because = ",error);
        res.status(500).json({error:"Cannot register Student."})
    }
});


router.post('./class-1',async (req,res)=>{
    const {name,father,mother,adhaar,phone,sssm,bank,ifsc} = req.body;

    if(!name || !father || !mother || !adhaar || !ifsc || !phone || !sssm || !bank){
        res.status(422).json({error:'All fields are required'})
    }
    try{
        const studentExist = await class1.findOne({name:name});
        if(studentExist){
            res.status(422).json({error:'This student alreqady exist'})
        }
        else{
            const student = new class1({name,father,mother,adhaar,phone,sssm,bank,ifsc})
            await student.save();
            res.status(200).json({message:'Student added successfully.'})
        }

    }catch(error){
        console.log("Student cannot be registered because = ",error);
        res.status(500).json({error:"Cannot register Student."})    }
   

})




router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email) {
        return res.status(422).json({ error: "Name and Email are required" })
    }

    else if (  !phone || !work ){
        return res.status(422).json({ error: "Phone and Work are required" })
    }else if( !password || !cpassword){
        return res.status(422).json({ error: "Passwords are required" })
    }

    try {

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({ error: "This Email already exists" })
            window.alert("This Email already exists")
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password and Conform Password are not same please check and try again..." })
        }else {
            const user = new User({ name, email, phone, work, password, cpassword })

            await user.save();

            res.status(200).json({ message: "User added successfully" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to register" })
    }

});


router.post('/signin', async (req, res) => {
    let token;
    console.log(req.body)

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ message: "This fields cannot be empty" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            // JWT Token Verification
            token = await userLogin.generateAuthToken();
            console.log("Token has been generated:-  ",token)

            res.cookie("jwToken",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly:true
            });            

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials...." });
            } else {
                res.status(200).json({ message: "User Signin successfully...." });
            }
        } else {
            res.status(400).json({ message: "Invalid credentials...." });
        }

    } catch (err) {
        console.log(err)
    }

});


// Aboute us Page Route


router.get('/about',authenticate,(request,response)=>{
    response.send(rootUser);
})



module.exports = router;
