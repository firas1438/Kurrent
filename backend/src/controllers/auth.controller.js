// import required libraries
const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

// token expiration time
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// register function
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    res.status(201).json({ message: "User registered successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create short-lived access token for API requests
    const accessToken = jwt.sign( { userId: user.id }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN } );

    // create long-lived refresh token to get new access tokens
    const refreshToken = jwt.sign( { userId: user.id }, process.env.JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN } );

    // set tokens as http-only cookie
    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Logged in successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// token refresh function
const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // create new access token (after expiration)
    const newAccessToken = jwt.sign( { userId: payload.userId }, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN } );

    // set token as http-only cookie
    res.cookie("accessToken", newAccessToken, { httpOnly: true, sameSite: "strict", secure: false, maxAge: 15 * 60 * 1000 });

    res.json({ message: "Access token refreshed" });

  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

// logout function
const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};


module.exports = {
  register,
  login,
  refresh,
  logout,
}