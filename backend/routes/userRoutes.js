const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getUsers
);

router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    getUserById
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateUser
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);

module.exports = router;