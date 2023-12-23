const Auth = require("../models/Auth");
const { PermissionMongo } = require('../models/User');
const { attachPerm, detachPerm } = require('../models/permissions_utils');

exports.Register = async (req, res) => {
    additionalData = {
        pictureLink: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        profession: ""
    }
    const { email, username, password } = req.body;
    const checkUsername = await Auth.get({ username })
    const checkEmail = await Auth.get({ email })

    if (checkEmail) {
        res.status(400).json({ error: "Email already registered" });
        return;
    }
    if (checkUsername) {
        res.status(400).json({ error: "Username already exists" });
        return;
    }

    const user = await Auth.create({ additionalData, email, username, password });
    const userPerm = await PermissionMongo.findOne({ name: "member" });
    await attachPerm(user, userPerm);

    res.status(201).json({ message: "Successfully Registered" });
}

exports.Login = async (req, res) => {
    const { username, password } = req.body;
    const user = await Auth.get({ username });
    const is_authenticated = await Auth.authenticate(username, password);
    if (!user || !is_authenticated) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
    }
    const responseToken = Auth.generateToken(user);
    res.json({ message: "Login Successfull", responseToken });
}

