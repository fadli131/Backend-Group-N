exports.is_authenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "You are not authenticated" })
    }
    next();
}

exports.is_admin = async (req, res, next) => {
    await exports.is_authenticated(req, res, async () => {
        const isAdmin = await req.user.is_admin();
        if (!isAdmin) {
            res.status(403).json({ error: "Not authorized" });
            return;
        }
        next();
    });
};

exports.is_staff = async (req, res, next) => {
    await exports.is_authenticated(req, res, async () => {
        const isStaff = await req.user.is_staff();
        if (!isStaff) {
            res.status(403).json({ error: "Not authorized" });
            return;
        }
        next();
    });
};

exports.is_member = async (req, res, next) => {
    await exports.is_authenticated(req, res, async () => {
        const isMember = await req.user.is_member();
        if (!isMember) {
            res.status(403).json({ error: "Not authorized" });
            return;
        }
        next();
    });
};

exports.is_adminOrStaff = async (req, res, next) => {
    await exports.is_authenticated(req, res, async () => {
        const isAdmin = await req.user.is_admin();
        const isStaff = await req.user.is_staff();
        if (!isAdmin && !isStaff) {
            res.status(403).json({ error: "Not authorized" });
            return;
        }
        next();
    });
};
