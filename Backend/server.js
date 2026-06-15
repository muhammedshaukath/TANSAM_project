// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log("MySQL Connected");
//     }
// });

// app.post("/register", (req, res) => {

//     const { name, email, password, age } = req.body;

//     const token = jwt.sign(
//         { email: email },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//     );

//     const sql =
//         "INSERT INTO users(name,email,password,age) VALUES(?,?,?,?)";

//     db.query(
//         sql,
//         [name, email, password, age],
//         (err, result) => {

//             if(err){
//                 return res.status(500).json({
//                     message: "Database Error"
//                 });
//             }

//             res.json({
//                 message: "User Registered Successfully",
//                 token: token
//             });
//         }
//     );
// });

// app.listen(process.env.PORT, () => {
//     console.log(
//         `Server running on port ${process.env.PORT}`
//     );
// });

const app = require("./app");

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});