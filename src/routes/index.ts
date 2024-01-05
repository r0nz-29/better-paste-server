import {Router} from "express";
import * as controller from "../controllers";

const router = Router();

router.post("/paste", controller.createPaste);
router.put("/paste/:_id", controller.updatePasteById);
router.get("/paste/:_id", controller.getPasteById);

export default router;