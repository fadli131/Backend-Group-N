const { UserMongo } = require('./User');
exports.attachPerm = async (user, perm) => {
    await UserMongo.findOneAndUpdate({ _id: user._id }, { $set: { permissions: perm } });
};
exports.detachPerm = async (user, perm) => {
    user.permissions.pull(perm);
    await user.save();
};