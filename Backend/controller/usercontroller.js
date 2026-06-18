const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

    const {
        name,
        email,
        password,
        age,
        role
    } = req.body;

    const checkUser =
        "SELECT * FROM users WHERE email=?";

    db.query(
        checkUser,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {

                return res.status(400).json({
                    message: "Email Already Exists"
                });

            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            const insertQuery =
                `INSERT INTO users
                (name,email,password,age,role)
                VALUES(?,?,?,?,?)`;

            db.query(
                insertQuery,
                [
                    name,
                    email,
                    hashedPassword,
                    age,
                    role
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message:
                        "User Registered Successfully"
                    });

                }
            );

        }
    );

};

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=?";

    db.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }

            const user = result[0];

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(401).json({
                    message: "Invalid Credentials"
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "Login Successful",
                token,
                user
            });

        }
    );

};

exports.dashboard = (req, res) => {

    res.status(200).json({
        message: "Dashboard Access Success",
        user: req.user
    });

};

exports.getStudents = (req,res)=>{

    const sql =
    "SELECT * FROM users WHERE role ='student'";

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};

exports.getStaffs=(req,res)=>{

 const sql =
 "SELECT * FROM users WHERE role IN ('admin','teacher','principal')";

 db.query(sql,(err,result)=>{

  if(err){
   return res.status(500).json(err);
  }

  res.status(200).json(result);

 });

};

exports.getDashboard=(req,res)=>{

 const sql=`
 SELECT

 (SELECT COUNT(*) FROM users WHERE role='student')
 AS totalStudents,

 (SELECT COUNT(*) FROM users
 WHERE role IN ('admin','teacher','principal'))
 AS totalStaffs
 `;

 db.query(sql,(err,result)=>{

  if(err){
   return res.status(500).json(err);
  }

  res.status(200).json(result[0]);

 });

};
exports.getRoles = (req,res)=>{

 const sql =
 "SELECT * FROM role";

 db.query(sql,(err,result)=>{

   if(err){
      return res.status(500).json(err);
   }

   res.json(result);

 });

};
exports.addRole = (req,res)=>{

 const { role_name } = req.body;

 const sql =
 "INSERT INTO role(role_name) VALUES(?)";

 db.query(
  sql,
  [role_name],
  (err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json({
      message:"Role Added"
    });

  }
 );

};