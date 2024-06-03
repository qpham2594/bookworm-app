import mongoose, {Schema, model, models} from "mongoose";

const Favorites = new Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      bookId: {
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
      coverImage: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

export default models.Favorites || model("Favorites", Favorites);