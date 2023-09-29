const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profile: {
        address: {
            type: String,
            default: ''
        },
        postalCode: {
            type: String,
            default: ''
        },
        unitNumber: {
            type: String,
            default: ''
        },
        country:{
            type: String,
            default: ''
        },
        city:{
            type: String,
            default: ''
        },
        phoneNumber: {
            type: String,
            default: ''
        },
    }
}, {
    timestamps: true
});

// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 12);
// });


userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);