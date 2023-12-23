const { PermissionMongo } = require('../models/User');
const mongoose = require("mongoose");
require('dotenv').config()

const main = async () => {
    mongoose.connect(process.env.MONGO_URL).then(() => console.log("Successfully connect to MongoDB."))
        .catch(err => console.error("Connection error", err));
    const permissions = [
        {
            name: "admin",
            description: "admin role",
            permission_type: "role"
        },
        {
            name: "staff",
            description: "staff role",
            permission_type: "role"
        },
        {
            name: "member",
            description: "member role",
            permission_type: "role"
        }
    ]
    try {
        for (let perm of permissions) {
            await PermissionMongo.create(perm);
        }

    } catch (e) {
        console.log(e);
    } finally {
        mongoose.connection.close();
    }
};
main();