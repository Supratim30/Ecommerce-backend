var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth.js")


router.post("/signup",
[
  check("name", "name should be atleast 3 characters").isLength({ min: 3 }), //can add custom messages using .withMessage
  check("email", "email is required").isEmail(),
  check("password", "should be at least 3 char").isLength({min: 3})
], signup);

router.post(
  "/signin",
[
  //check("name", "name should be atleast 3 characters").isLength({ min: 3 }), //can add custom messages using .withMessage
  check("email", "email is required").isEmail(),
  check("password", "paswword is required").isLength({min: 1})
], signin);



router.get("/signout", signout);

// router.get("/testroute",isSignedIn, (req, res) => {
//   res.send("PROTECTED ROUTE");
// })

module.exports = router;
