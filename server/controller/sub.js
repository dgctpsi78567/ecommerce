const Sub = require("../models/sub")
const slugify = require("slugify")
const Product=require("../models/products")

exports.create = async (req, res) => {
    try {
        const { name, parent} = req.body;
        const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
        res.json(sub);
    } catch (e) {
        console.log("Sub Created Error", e);
        res.status(400).send("Sub Category Failed");
    }
}

exports.list = async (req, res) => {
    const sub = await Sub.find({}).sort({ createdAt: -1 }).exec();
    res.json(sub);
}

exports.read = async (req, res) => {
    console.log(req.params);
    const sub = await Sub.findOne({ slug: req.params.slug }).exec();

    const product=await Product.find({sub:sub}).populate("category")
    .exec();
    res.json({sub,product});
}

exports.update = async (req, res) => {
    const { name,parent } = req.body;
    try {
        const updateSubCategory = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
             { name, parent, slug: slugify(name) },
             { new: true });
        res.json(updateSubCategory);
    } catch (err) {
        console.log("_______________",err.message)
        res.status(400).send("Sub Category update Failed", err)
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (e) {
        res.status(400).send("Sub Category Delete Failed", err)
    }
}