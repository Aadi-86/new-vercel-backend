
import SignupModel from "../../model/Login.model.js";
import ProductModel from "../../model/Product.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, error: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
};

const addProduct = async (req, res) => {
  const { id, name, image, category, new_price, old_price } = req.body;
  const product_arr = await ProductModel.find({});
  let Id;

  if (product_arr.length > 0) {
    let last_product_arry = product_arr.slice(-1);
    let last_product = last_product_arry[0];
    Id = last_product.id + 1;
  } else {
    Id = 1;
  }

  const product = new ProductModel({
    id: Id,
    name,
    image,
    category,
    new_price,
    old_price,
  });
  await product
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "data save successfully",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "error in data saving",
        error: err,
      });
    });
};

const productRemove = async (req, res) => {
  try {
    const id = req.body.id;

    const product = await ProductModel.findOneAndDelete({ id: id });

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({    
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

const displayAllProduct = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});

    res.json({
      success: true,
      products: allProducts, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const Signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if user already exists
    const existingUser = await SignupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    let cart = {};
    for(let i = 0;i<300; i++){
      cart[i]=0;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const Users = new SignupModel({
      name,
      email,
      password: hashPassword,
      cartData:cart,
    });
    await Users.save();
   const data = {
      user:{
        id:Users.id
      }
    }
    const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token:token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error:error
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await SignupModel.findOne({ email });
    if (!User) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // JWT token generate karna
    const data = {
      user: {
        id: User.id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      UserData: {
        name: User.name,
        email: User.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};
const newCollection = async (req, res) => {
  try {
    const products = await ProductModel.find({}).skip(1).limit(8);

    res.json({
      success: true,
      message: 'NewCollection Data Fetch',
      products 
    });
  } catch (error) {
    console.error("NewCollection error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
};


export { uploadImage, addProduct,productRemove,displayAllProduct,Signup,Login,newCollection };
