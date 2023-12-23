const Auth = require('../models/Auth');
const { PermissionMongo, UserMongo } = require('../models/User');
const { attachPerm, detachPerm } = require('../models/permissions_utils');

exports.getUserProfile = async (req, res) => {
    let query = { _id: req.user._id };

    const user = await UserMongo.findOne(query).select("-password").select("-__v");
    res.status(200).json(user);
}

exports.updateUserData = async (req, res) => {
    const {
        email,
        username,
        pictureLink,
        firstName,
        lastName,
        phone,
        address,
        profession
    } = req.body;

    const id = req.user._id;
    let query = { _id: id };

    const filter = await UserMongo.findOne(query);

    if (!filter) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    let UpdateRequest = {}

    const checkEmail = await Auth.get({ email })
    const checkUsername = await Auth.get({ username })

    if (checkUsername && checkEmail) {
        UpdateRequest = {
            pictureLink,
            firstName,
            lastName,
            phone,
            address,
            profession
        }
    }

    else if (!checkUsername || !checkEmail) {
        if (checkUsername && !checkEmail) {
            if (checkEmail) {
                res.status(400).json({ error: "Email already registered" });
                return;
            }

        }

        if (!checkUsername && checkEmail) {
            if (checkUsername) {
                res.status(400).json({ error: "Username already exists" });
                return;
            }
        }

        UpdateRequest = {
            email,
            username,
            pictureLink,
            firstName,
            lastName,
            phone,
            address,
            profession
        }
    }

    if (filter) {
        const update = await UserMongo.updateOne({ _id: id }, { $set: UpdateRequest });
        res.status(201).json({ message: "Successfully Updated" });
    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.updateUserPassword = async (req, res) => {
    res.send('Hello, this is updateUserPassword!');
}

exports.getAllUser = async (req, res) => {
    const user = await UserMongo.find().populate("permissions").select("-password").select("-__v");

    res.status(200).json(user);
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    const getById = await UserMongo.findOne({ _id: id }).select("-password").select("-__v");

    if (!getById) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    res.status(200).json(getById);
}

exports.updateUserDataByAdmin = async (req, res) => {
    const {
        email,
        username,
        pictureLink,
        firstName,
        lastName,
        phone,
        address,
        profession
    } = req.body;

    const { id } = req.params;
    let query = { _id: id };

    const filter = await UserMongo.findOne(query);

    if (!filter) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    let UpdateRequest = {}

    const checkEmail = await Auth.get({ email })
    const checkUsername = await Auth.get({ username })

    if (checkEmail && checkUsername) {
        UpdateRequest = {
            pictureLink,
            firstName,
            lastName,
            phone,
            address,
            profession
        }
    }

    else if (!checkEmail || !checkUsername) {

        UpdateRequest = {
            email,
            username,
            pictureLink,
            firstName,
            lastName,
            phone,
            address,
            profession
        }
    }

    if (filter) {
        const update = await UserMongo.updateOne({ _id: id }, { $set: UpdateRequest });
        res.status(201).json({ message: "Successfully Updated" });
    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.addUserRole = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    const getById = await UserMongo.findOne({ _id: id });

    if (!getById) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    const user = getById;
    const perm = await PermissionMongo.findOne({ name: permissions });

    if (!perm) {
        res.status(401).json({ error: "Role is not found" });
        return;
    }

    await attachPerm(user, perm);
    res.json({ message: "Add User Role Success" });
}

exports.removeUserRole = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    const getById = await UserMongo.findOne({ _id: id });

    if (!getById) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    const user = getById;
    const perm = await PermissionMongo.findOne({ name: permissions });

    if (!perm) {
        res.status(401).json({ error: "Role is not found" });
        return;
    }
    await detachPerm(user, perm);
    res.json({ message: "Remove User Role Success" });
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const getById = await UserMongo.findOne({ _id: id });

    if (!getById) {
        res.status(401).json({ error: "User is Not Found" });
        return;
    }

    if (getById) {
        await UserMongo.deleteOne({ _id: id });
        res.status(201).json({ message: "User is successfully deleted" })
    } else {
        res.status(401).json({ error: "Error occured during delete process" });
        return;
    }
}