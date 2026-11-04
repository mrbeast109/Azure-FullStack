const mongoose = require('mongoose');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is disconnected. Please ensure MONGO_URI is set in Render environment variables and 0.0.0.0/0 is allowed in MongoDB Atlas Network Access.',
      });
    }

    const { category, collection, badge, search, page = 1, limit = 100 } = req.query;

    const filter = {};
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (collection) filter.productCollection = { $regex: collection, $options: 'i' };
    if (badge) filter.badge = { $regex: badge, $options: 'i' };
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ productId: Number(id) });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name, price, category, collection, badge,
      description, sizes, colors, variants, productId, inStock,
    } = req.body;

    const files = req.files || {};
    const uploadedImages = (files.images || []).map((f) => `/uploads/${f.filename}`);
    const uploadedMainImage = files.image?.[0] ? `/uploads/${files.image[0].filename}` : null;
    const mainImage = uploadedMainImage || req.body.image;

    if (!mainImage) {
      return res.status(400).json({ success: false, message: 'Product image is required' });
    }

    let allImages = [];
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      allImages = [...bodyImages, ...uploadedImages];
    } else {
      allImages = uploadedImages;
    }

    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes || [];
    const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors || [];
    const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants || {};

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      productCollection: collection || null,
      badge: badge || null,
      description,
      sizes: parsedSizes,
      colors: parsedColors,
      variants: parsedVariants,
      image: mainImage,
      images: allImages,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      productId: productId ? Number(productId) : undefined,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updates = { ...req.body };

    const files = req.files || {};
    if (files.image?.[0]) {
      updates.image = `/uploads/${files.image[0].filename}`;
    }
    if (files.images?.length) {
      const newImages = files.images.map((f) => `/uploads/${f.filename}`);
      updates.images = [...(product.images || []), ...newImages];
    }

    if (typeof updates.sizes === 'string') updates.sizes = JSON.parse(updates.sizes);
    if (typeof updates.colors === 'string') updates.colors = JSON.parse(updates.colors);
    if (typeof updates.variants === 'string') updates.variants = JSON.parse(updates.variants);

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({ success: true, product: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

const seedProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ success: false, message: 'products array is required in body' });
    }

    const ops = products.map((p) => ({
      updateOne: {
        filter: { productId: p.id },
        update: {
          $setOnInsert: {
            name: p.name,
            price: p.price,
            category: p.category,
            productCollection: p.collection || null,
            badge: p.badge || null,
            description: p.description,
            sizes: p.sizes || [],
            colors: p.colors || [],
            variants: p.variants || {},
            image: p.image,
            images: p.images || [],
            productId: p.id,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(ops);

    res.status(201).json({
      success: true,
      message: `${result.upsertedCount} inserted, ${result.matchedCount} already existed`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to seed products' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};
