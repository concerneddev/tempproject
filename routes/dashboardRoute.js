import express from "express";
import auth from "../middleware/auth.js";
import {
  dashboardGuide,
  dashboardTourist
} from "../controllers/dashboard.js";

const router = express.Router();

router.get("/guide", auth, dashboardGuide);
router.get("/tourist", auth, dashboardTourist);

export default router;
