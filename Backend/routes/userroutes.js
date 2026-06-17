const express = require("express");

const router = express.Router();

const {
    register,
    login,
    dashboard,
    getUsers,
    getAdmins,
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
    "/users",
    authMiddleware,
    getUsers
)

router.get(
    "/admin",
    authMiddleware,
    getAdmins
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