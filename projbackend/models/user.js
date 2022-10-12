import mongoose from 'mongoose';
const { createHmac } = await import('node:crypto');
import { v4 as uuidv4 } from 'uuid';
const { Schema } = mongoose;

const userSchema = new Schema({
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
    }
});

// create virtuals
userSchema.virtaul("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv4()
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    });

// creating methods
userSchema.method = {
    // authenticate
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    // secure password
    securePassword: function(plainpassword) {
        if(!password) return "";
        try {
            return createHmac('sha256', this.salt)
                    .update(plainpassword)
                    .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);