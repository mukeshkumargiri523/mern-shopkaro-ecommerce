import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";
//creating category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in creating category",
    });
  }
};

//updating category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res
      .status(200)
      .send({ success: true, message: "Category name updated", category });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in updating category",
    });
  }
};

//updating category with photo
export const updateCategoryWithPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
    }
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
    res.status(201).send({
      success: true,
      message: "category updated Successfully with photo",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in updating product with photo",
    });
  }
};

//getting photo of category
export const getCategoryPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id).select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting photo of category",
    });
  }
};

//getting all category
export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "List of all category", category });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting all category",
    });
  }
};

//getting single category
export const getCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res
      .status(200)
      .send({ success: true, message: "single category", category });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in getting single category",
    });
  }
};

//getting single category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "category deleted success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error in deleting category",
    });
  }
};
