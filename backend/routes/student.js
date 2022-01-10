const router = require("express").Router();
const { response } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
const authorizationForProfile = require("../middleware/authorizationForProfile");

router.post("/login", validInfo, async(req, res) => {
  try {
      //1. destructure the req.body
      const { email, password } = req.body;
      res.status(401).json(req.body);
      //2. check if user dosen't exist(if not then thrwo error)

      const user = await pool.query("SELECT * FROM student WHERE stu_email= $1 " [
      email
      ]);

      if (user.rows.length === 0) {
          return res.status(401).json("Email or Password is incorrect1");
      }

      //3. check if incoming password is the same the db password

      const validPassword = await bcrypt.compare(
          password,
          user.rows[0].stu_password
      );
  
      if (!validPassword) {
          return res.status(401).json("Email or Password is incorrect2");
      }
  
      //4. give them the jwt token
  
      const token = jwtGenerator(user.rows[0].id);
  
      res.json({ token });

  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});



router.post("/add",async (req,res)=>{

    try {
         
    const { stu_name,stu_id,stu_grade,stu_mobile,stu_email } = req.body;

    console.log(req.body);
    const student = await pool.query("SELECT * FROM student WHERE student_id = $1 ", [
      stu_id,
    ]);

    if (student.rows.length !== 0) {
      return res.status(401).send("Student already exists");
    }
  const stu_password = stu_email;
    //4. enter new bus inside our database
    const newStudent = await pool.query(
      "INSERT INTO student (student_name, class, student_id, mobile_number,stu_email,stu_password ) VALUES ( $1, $2, $3, $4,$5,$6) RETURNING *",
      [stu_name,stu_grade,stu_id,stu_mobile,stu_email,stu_password]
    );

    if(newStudent) {
      res.json("Student was added");
    }

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

} );

router.get("/view",async (req,res)=>{

    try {

        const viewStudent = await pool.query(
            "SELECT id, student_name, class, student_id, mobile_number FROM student"
          );

          if (viewStudent.rows.length === 0) {
            return res.status(401).json("No any studen in the database.");
            //console.log('No any bus in the database.');
          }
      
          res.json(viewStudent.rows);
      

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

    

});

module.exports = router;
