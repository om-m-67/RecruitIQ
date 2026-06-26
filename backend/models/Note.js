/*
application

interview

createdBy

title

content

attachments
 ├── fileName
 ├── fileUrl
 ├── fileType
 └── uploadedAt

visibility

isEdited
editedAt

isDeleted
deletedAt

timestamps
*/

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      default: null,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    attachments: [
      {
        fileName: {
          type: String,
          trim: true,
        },

        fileUrl: {
          type: String,
          trim: true,
        },

        fileType: {
          type: String,
          trim: true,
        },

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    visibility: {
      type: String,
      enum: [
        "Internal",
        "Hiring Team",
        "Admin Only",
      ],
      default: "Internal",
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },

        isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);