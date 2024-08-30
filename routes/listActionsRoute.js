import express from "express";
import auth from "../middleware/auth.js";
import { listCreate, listRegister } from "../controllers/listActions.js";

const router = express.Router();

router.post("/listcreate", auth, listCreate);
router.post("/listregister/:listid", auth, listRegister);

export default router;