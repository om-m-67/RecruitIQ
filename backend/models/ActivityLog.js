/*
user

company

job

application

interview

note

notification

activityType

action

description

performedBy

clientInfo
 ├── ipAddress
 ├── device
 ├── browser
 └── operatingSystem

metadata

isDeleted
deletedAt

timestamps
*/

const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
      index: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
      index: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
      index: true,
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      default: null,
      index: true,
    },

    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      default: null,
      index: true,
    },

    notification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      default: null,
      index: true,
    },

    activityType: {
      type: String,
      enum: [
        "Authentication",
        "Profile",
        "Company",
        "Job",
        "Application",
        "Interview",
        "Note",
        "Notification",
        "System",
      ],
      required: true,
      index: true,
    },

    action: {
      type: String,
      enum: [
        "Created",
        "Updated",
        "Deleted",
        "Applied",
        "Scheduled",
        "Rescheduled",
        "Completed",
        "Cancelled",
        "Accepted",
        "Rejected",
        "Viewed",
        "Downloaded",
        "Uploaded",
        "Login",
        "Logout",
        "Password Changed",
      ],
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    clientInfo: {
      ipAddress: {
        type: String,
        trim: true,
      },

      device: {
        type: String,
        trim: true,
      },

      browser: {
        type: String,
        trim: true,
      },

      operatingSystem: {
        type: String,
        trim: true,
      },
    },

metadata: {
  type: Map,
  of: mongoose.Schema.Types.Mixed,
  default: {},
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

module.exports = mongoose.model("ActivityLog", activityLogSchema);