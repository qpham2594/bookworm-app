import mongoose, {Schema, model, models} from "mongoose";

const Wishlist = new Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      created: {
        type: Date,
        default: Date.now,
      },
    });

export default models.Wishlist || model("Wishlist", Wishlist);