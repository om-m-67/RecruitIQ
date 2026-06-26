/*
application

roundNumber
roundName

interviewType
interviewMode

status

scheduledBy

interviewers

schedule
 ├── date
 ├── startTime
 ├── endTime
 └── timezone

meeting
 ├── meetingLink
 ├── meetingId
 └── meetingPassword

location

candidateConfirmation

feedback
 ├── rating
 ├── comments
 └── recommendation

result

isDeleted
deletedAt

timestamps
*/

const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    roundNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    roundName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    interviewType: {
      type: String,
      enum: [
        "Technical",
        "HR",
        "Managerial",
        "Behavioral",
        "Assignment",
        "Final",
      ],
      required: true,
    },

    interviewMode: {
      type: String,
      enum: ["Online", "Offline", "Phone"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Rescheduled",
        "Completed",
        "Cancelled",
        "No Show",
        "Pending Feedback",
      ],
      default: "Scheduled",
      index: true,
    },

    scheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    schedule: {
      startDateTime: {
        type: Date,
        required: true,
      },

      endDateTime: {
        type: Date,
        required: true,
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },

    meeting: {
      meetingLink: {
        type: String,
        trim: true,
      },

      meetingId: {
        type: String,
        trim: true,
      },

      meetingPassword: {
        type: String,
        trim: true,
      },
    },

    location: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    candidateConfirmation: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },

    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },

      comments: {
        type: String,
        maxlength: 5000,
      },

      recommendation: {
        type: String,
        enum: ["Strong Hire", "Hire", "Hold", "No Hire", "Strong No Hire"],
      },
    },

    result: {
      type: String,
      enum: ["Passed", "Failed", "Hold", "Next Round"],
      default: "Hold",
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
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
