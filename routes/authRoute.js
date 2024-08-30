import express from "express";
import { registerTourist, loginTourist } from "../controllers/authTourist.js";
import { registerGuide, loginGuide } from "../controllers/authGuide.js";

const router = express.Router();

router.post("/registertourist", registerTourist);
router.post("/logintourist", loginTourist);

router.post("/registerguide", registerGuide);
router.post("/loginguide", loginGuide);


export default router;