import express from "express";
import auth from "../middleware/auth.js";
import { listCreate, listDisplayGuideList, listRegister, listStatusClose } from "../controllers/listActions.js";

const router = express.Router();

router.post("/listcreate", auth, listCreate);
router.post("/listregister/:listid", auth, listRegister);
router.post("/liststatusclose/:listid", auth, listStatusClose);
router.get("/listdiplayguidelist", auth, listDisplayGuideList);

export default router;