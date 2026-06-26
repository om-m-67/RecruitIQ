/*
jobId

title

company
postedBy

department

employmentType
workMode

location
 ├── street
 ├── city
 ├── state
 ├── country
 └── postalCode

experience
 ├── minimum
 └── maximum

salary
 ├── minimum
 ├── maximum
 ├── currency
 ├── isNegotiable
 └── isVisible

vacancies

description

responsibilities

requirements

requiredSkills

preferredSkills

educationRequirement

benefits

screeningQuestions

applicationDeadline

status

isDeleted
deletedAt

timestamps
*/

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      index: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    department: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract",
        "Freelance",
        "Temporary",
      ],
      required: true,
    },

    workMode: {
      type: String,
      enum: [
        "On-site",
        "Hybrid",
        "Remote",
      ],
      required: true,
    },

    location: {
      street: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      country: {
        type: String,
        trim: true,
      },

      postalCode: {
        type: String,
        trim: true,
      },
    },

    experience: {
      minimum: {
        type: Number,
        required: true,
        min: 0,
      },

      maximum: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    salary: {
      minimum: {
        type: Number,
        min: 0,
      },

      maximum: {
        type: Number,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
        trim: true,
      },

      isNegotiable: {
        type: Boolean,
        default: true,
      },

      isVisible: {
        type: Boolean,
        default: true,
      },
    },

    vacancies: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      required: true,
      maxlength: 10000,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    preferredSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    educationRequirement: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    benefits: [
      {
        type: String,
        trim: true,
      },
    ],

    screeningQuestions: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
          maxlength: 500,
        },

        isRequired: {
          type: Boolean,
          default: true,
        },
      },
    ],

        applicationDeadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Open",
        "Paused",
        "Closed",
        "Expired",
      ],
      default: "Draft",
      index: true,
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

module.exports = mongoose.model("Job", jobSchema);  