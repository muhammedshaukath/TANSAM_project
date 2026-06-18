const express = require("express");

const router = express.Router();

const {
    register,
    login,
    dashboard,
    getStudents,
    getStaffs,
    getDashboard,
    getRoutes,
    getRoles,
    addRole
} = require("../controller/usercontroller");

const authMiddleware =
require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/dashboard",
    authMiddleware,
    dashboard
);

router.get(
    "/students",
    authMiddleware,
    getStudents
)

router.get(
    "/staffs",
    authMiddleware,
    getStaffs
)

router.get(
    "/dashboard-count",
    authMiddleware,
    getDashboard
)

router.get(
    "/roles",
    authMiddleware,
    getRoles
)

module.exports = router;