import express from "express";
import auth from "../middleware/auth.js";
import {
  listCreate,
  listDisplayGuideList,
  listRegister,
  listStatusClose,
  listDisplayGuideDetail,
  listDisplayTouristList,
  listDisplayTouristDetail,
} from "../controllers/listActions.js";

const router = express.Router();

router.post("/listcreate", auth, listCreate);
router.post("/listregister/:listid", auth, listRegister);
router.post("/liststatusclose/:listid", auth, listStatusClose);
router.get("/listdiplayguidelist", auth, listDisplayGuideList);
router.get("/listdiplayguidedetail/:listid", auth, listDisplayGuideDetail);
router.get("/listdiplaytouristlist", auth, listDisplayTouristList);
router.get("/listdiplaytouristdetail/:listid", auth, listDisplayTouristDetail);

export default router;
