import express from "express";
 
import { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
 
const userRoutes = express.Router();
 
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
 
export default userRoutes;