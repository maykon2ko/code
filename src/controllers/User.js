const User = require("../models/User");
const generateToken = require("../utils/generateToken");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: true,
        bearerToken: "Usuário já cadastrado!",
      });
    }
    try {
      const user = await User.create({
        name,
        email,
        password,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: true,
        bearerToken: "Usuário não cadastrado!",
      });
    }

    if (await user.matchPassword(password)) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({
        error: true,
        bearerToken: "Email e senha invalidos!",
      });
    }
  },
  // async update(req, res) {
  //   const user = await User.findById(req.params.id);

  //   if (!user) {
  //     return res.status(400).json("Usuário não existe!!");
  //   }
  //   user.name = req.body.name || user.name;
  //   user.email = req.body.email || user.email;

  //   try {
  //     const updateUser = await user.save();
  //     return res.status(201).json(updateUser);
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  // },
  async client(req, res) {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  },
};
