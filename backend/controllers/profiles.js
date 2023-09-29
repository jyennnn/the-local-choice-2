const User = require('../models/user');

module.exports = {
    getProfile,
    updateProfile
}

async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({user});
    }
    catch (err) {
        res.status(500).json({ message: err.message, fail:"unable to get profile" });
    }
}

async function updateProfile(req, res) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;

        if (req.body.password && req.body.password !== user.password) {
            user.password = req.body.password;
        }

        if (req.body.profile) {
            for (let key in req.body.profile) {
                user.profile[key] = req.body.profile[key];
            }
            user.markModified('profile');  // this is required to tell mongoose that the profile object has been modified
        }

        const updatedUser = await user.save();

        // Log the updated user
        console.log(updatedUser);

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            profile: updatedUser.profile,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message, fail:"unable to update profile" });
    }
}