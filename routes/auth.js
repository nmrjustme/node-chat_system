const express = require('express');
const router = express.Router();

router.post("/register", (request, response) => {
     response.json({
          message: "Register Route"
     });
});

router.post("/login", (request, response) => {
     response.json({
          message: "Login Route"
     });
});

module.exports = router;