import { Router } from "express";
import { isAdmin, signInAuthenticate } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
  getCategoryPhoto,
  updateCategoryWithPhoto,
} from "../controllers/categoryController.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.post("/create-category", signInAuthenticate, isAdmin, createCategory);
router.put("/update-category/:id", signInAuthenticate, isAdmin, updateCategory);
router.put(
  "/update-category-with-photo/:id",
  ExpressFormidable(),
  signInAuthenticate,
  isAdmin,
  updateCategoryWithPhoto
);
router.get("/category-photo/:id", getCategoryPhoto);
router.get("/get-all-category", getAllCategory);
router.get("/get-category/:slug", getCategory);
router.delete(
  "/delete-category/:id",
  signInAuthenticate,
  isAdmin,
  deleteCategory
);

export default router;
