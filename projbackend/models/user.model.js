const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuid/v1")

// const { createHmac } = await import('node:crypto');
// import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname : {
        type: String,
        maxlength: 32,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userinfo : {
        type: String,
        trim: true,
    },
    encry_password : {
        type: String,
        required: true,
    },
    salt : {
        type: String,
    },
    role : {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    },
    accessToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// create virtuals
userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    });

// creating methods
userSchema.methods = {
    transform: function() {
        const transformed = {};
        const fields = ['_id', 'name','lastname', 'email', 'userinfo', 'role', 'purchases', 'accessToken', 'createdAt'];

        fields.forEach((field) => {
        transformed[field] = this[field];
        });

        return transformed;
    },

    // authenticate
    authenticate: function (plainpassword) {
        // console.log("coming here ====== ", plainpassword)
        // console.log("Secure password ====== ", this.securePassword(plainpassword))
        // console.log("Database password ====== ", this.encry_password)
        return this.securePassword(plainpassword) === this.encry_password;
    },
    // secure password
    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try {
            return crypto
                    .createHmac('sha256', this.salt)
                    .update(plainpassword)
                    .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);