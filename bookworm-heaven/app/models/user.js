import mongoose, {Schema, model, models} from "mongoose";


const User = new Schema({
    name: {
        type: String,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorites"
    }]
})

export default models.User || model("User", User)