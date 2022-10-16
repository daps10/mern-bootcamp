const mongoose = require("mongoose")
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 32,
    }
}, {
    timestamps: true
});

// check name is taken or not
categorySchema.statics.isNameTaken = async function (name, excludeUserId) {
    const category = await this.findOne({ name, _id: { $ne: excludeUserId } });
    return !!category;
};

// creating methods
categorySchema.methods = {
    transform: function() {
        const transformed = {};
        const fields = ['_id', 'name', 'createdAt'];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    }
}

module.exports = mongoose.model("Category", categorySchema);