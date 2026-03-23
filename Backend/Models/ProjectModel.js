import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description too long"],
    },

    codeLink: {
      type: String,
      default: "",
      trim: true,
    },

    projectLink: {
      type: String,
      default: "",
      trim: true,
    },

    //  TAGS FEATURE
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags) {
          return tags.length <= 10; // max 10 tags
        },
        message: "You can add up to 10 tags only",
      },
    },

    // FEATURED PROJECT (for portfolio highlight)
    featured: {
      type: Boolean,
      default: false,
    },

    //  PROJECT IMAGE (for UI improvement)
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//  INDEXING for fast search/filter
projectSchema.index({ title: "text", description: "text", tags: "text" });

const Project = mongoose.model("Project", projectSchema);

export default Project;