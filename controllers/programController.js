const { Program } = require("../models/Program");

const dateNow = new Date();

exports.createProgram = async (req, res) => {
    const {
        pictureLink,
        title,
        description,
        programDate
    } = req.body;

    const checkTitle = await Program.findOne({ title: title });
    if (checkTitle) {
        res.status(400).json({ error: "Program title is already exists" });
        return;
    }

    const program = await Program.create({ pictureLink, title, description, programDate });

    program.publishedBy = req.user._id;

    await program.save();
    res.status(201).json({ message: "Program successfully created" });
}

exports.getAllProgram = async (req, res) => {
    const program = await Program.find().select("-__v");

    res.status(200).json(program);
}

exports.getProgramById = async (req, res) => {
    const { id } = req.params;

    const program = await Program.findOne({ _id: id }).select("-__v");

    if (!program) {
        res.status(401).json({ error: "Program is Not Found" });
        return;
    }

    res.status(200).json(program);
}

exports.updateProgram = async (req, res) => {
    const {
        pictureLink,
        title,
        description,
        programDate
    } = req.body;

    const { id } = req.params;
    let query = { _id: id };

    const checkData = await Program.findOne(query);

    if (!checkData) {
        res.status(401).json({ error: "Program is Not Found" });
        return;
    }
    let UpdateRequest = {}

    const checkTitle = await Program.findOne({ title: title });
    if (checkTitle) {

        UpdateRequest = {
            pictureLink,
            description,
            programDate
        }
    }
    else {

        UpdateRequest = {
            pictureLink,
            title,
            description,
            programDate
        }
    }

    if (checkData) {
        const update = await Program.updateOne({ _id: id }, { $set: UpdateRequest });
        if (update.modifiedCount >= 1) {
            res.status(201).json({ message: "Program Successfully Updated" });
        } else {
            res.status(200).json({ message: "Nothing updated" });
        }

    } else {
        res.status(401).json({ error: "Error occured during update process" });
        return;
    }
}

exports.deleteProgram = async (req, res) => {
    const { id } = req.params;
    const getById = await Program.findOne({ _id: id });

    if (!getById) {
        res.status(401).json({ error: "Program is Not Found" });
        return;
    }

    if (getById) {
        await Program.deleteOne({ _id: id });
        res.status(201).json({ message: "Program Successfully Deleted" })
    } else {
        res.status(401).json({ error: "Error occured during delete process" });
        return;
    }
}