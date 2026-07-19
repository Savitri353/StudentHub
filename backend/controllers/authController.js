const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Check all fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Validate LDCE email
    const cleanEmail = email.trim().toLowerCase();

    const ldceEmailRegex = /^[a-zA-Z0-9._%+-]+@ldce\.ac\.in$/;

    if (!ldceEmailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Only LDCE email addresses (@ldce.ac.in) are allowed.",
      });
    }
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email:cleanEmail});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 4. Create new user  FIXED (await added)
    const user = await User.create({
      name,
      email:cleanEmail,
      password: hashedPassword,
      phone,
      isVerified: false,
      verificationToken,
    });

    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: cleanEmail,
      subject: "Verify your StudentHub Account",
      html: `
    <h2>Welcome to StudentHub!</h2>
    <p>Please click the button below to verify your email.</p>

    <a href="${verifyUrl}"
       style="
          background:#2563eb;
          color:white;
          padding:12px 20px;
          text-decoration:none;
          border-radius:5px;
       ">
       Verify Email
    </a>

    <p>If you didn't create this account, you can ignore this email.</p>
  `,
    });
    // 5. Generate JWT (AUTO-LOGIN)
    // const token = jwt.sign(
    //   { userId: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" },
    // );

    // // 6. Store JWT in cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // true in production
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 1000,
    // });
    return res.status(201).json({
      message: "Verification email sent. Please check your inbox.",
    });
    // // 7. Send response WITHOUT token
    // res.status(201).json({
    //   message: "Signup successful & logged in",
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    // });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res.send("Email verified successfully! You can now log in.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check all fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // ✅ 5. Store token in cookie
    res.cookie("token", token, {
      httpOnly: true, // JS cannot access it
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    // ✅ 6. Send response WITHOUT token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const userId = req.user.userId; // From authMiddleware

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logout successful" });
};
