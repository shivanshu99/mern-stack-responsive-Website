const mongoose=require("mongoose");
const validator=require("validator");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3
	},
	email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },

	phone: {
		type: Number,
		required: true,
		min: 10
	},
	message: {
		type: String,
		required: true,
		minLength: 3
	}
});

const User = mongoose.model("User", userSchema);

module.exports=User;