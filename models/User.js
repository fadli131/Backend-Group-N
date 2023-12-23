const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

exports.PermissionMongo = model("Permission", new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    permission_type: {
        type: String,
        enum: ['object', 'role'],
        default: 'role'
    }
}));

exports.UserMongo = model("User", new Schema({
    pictureLink: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    address: { type: String },
    profession: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    News: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'News' }],
        default: [], 
    }
}, {
    methods: {
        has_perm(name) {
            return this.permissions.filter((perm) => perm.name === name).length > 0;
        },
        // usage user is admin
        is_admin() {
            return this.has_perm("admin");
        },
        // usage user is staff
        is_staff() {
            return this.has_perm("staff");
        },
        // usage user is member
        is_member() {
            return this.has_perm("member");
        }
    }
}));
