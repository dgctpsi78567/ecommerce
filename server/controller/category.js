const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");
const Product=require("../models/products")

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (e) {
        console.log(e);
        res.status(400).send("Create Category Failed");
    }


}

exports.list = async (req, res) => {
    const category = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(category);
}

exports.read = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    const product=await Product.find({category}).populate("category")
    // .populate("postedBy _id name")
    .exec();
    res.json({product,category});
    console.log(product,category);

}

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updateCategory = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true })
        res.json(updateCategory);
    } catch (err) {
        res.status(400).send("Category update Failed", err)
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (e) {
        res.status(400).send("Category Delete Failed", err)
    }
}

exports.getCategorySubs = async (req, res) => {
    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err) console.log(err);
         return res.json(subs);
    })
}