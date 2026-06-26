/*
user

profilePhoto
headline
summary

dateOfBirth
gender
nationality

phone

socialLinks
 ├── linkedin
 ├── github
 ├── portfolio
 ├── leetcode
 ├── codeforces
 ├── kaggle
 ├── behance
 ├── dribbble
 ├── stackoverflow
 ├── medium
 └── x

address
 ├── street
 ├── city
 ├── state
 ├── country
 └── postalCode

currentJobTitle
currentCompany

experienceLevel
totalExperience

resume

skills
languages

education
workExperience
projects
certifications

jobPreferences
availability

isProfileComplete
isVerified

isDeleted
deletedAt

timestamps
*/

const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    headline: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    summary: {
      type: String,
      maxlength: 3000,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Non-Binary", "Prefer not to say"],
    },

    phone: {
      type: String,
      trim: true,
    },

    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
      },

      github: {
        type: String,
        trim: true,
      },

      portfolio: {
        type: String,
        trim: true,
      },

      leetcode: {
        type: String,
        trim: true,
      },

      codeforces: {
        type: String,
        trim: true,
      },

      kaggle: {
        type: String,
        trim: true,
      },

      behance: {
        type: String,
        trim: true,
      },

      dribbble: {
        type: String,
        trim: true,
      },

      stackoverflow: {
        type: String,
        trim: true,
      },

      medium: {
        type: String,
        trim: true,
      },

      x: {
        type: String,
        trim: true,
      },
    },

    address: {
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

    currentJobTitle: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    currentCompany: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead", "Manager"],
      default: "Fresher",
    },

    totalExperience: {
      type: Number,
      default: 0,
      min: 0,
    },

    resume: {
      fileType: {
        type: String,
        trim: true,
      },

      fileName: {
        type: String,
        trim: true,
      },

      fileUrl: {
        type: String,
        trim: true,
      },

      fileSize: {
        type: Number,
      },

      uploadedAt: {
        type: Date,
      },
    },

    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },

        category: {
          type: String,
          enum: [
            "Frontend",
            "Backend",
            "Database",
            "Mobile",
            "Cloud",
            "DevOps",
            "AI/ML",
            "Cybersecurity",
            "Testing",
            "Programming Language",
            "Framework",
            "Tool",
            "Other",
          ],
          default: "Other",
        },
      },
    ],

    languages: [
      {
        language: {
          type: String,
          required: true,
          trim: true,
        },

        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Professional", "Native"],
          default: "Beginner",
        },
      },
    ],

    education: [
      {
        institution: {
          type: String,
          required: true,
          trim: true,
          maxlength: 150,
        },

        degree: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },

        fieldOfStudy: {
          type: String,
          trim: true,
          maxlength: 100,
        },

        grade: {
          type: String,
          trim: true,
          maxlength: 30,
        },

        startDate: {
          type: Date,
          required: true,
        },

        endDate: {
          type: Date,
        },

        currentlyStudying: {
          type: Boolean,
          default: false,
        },

        description: {
          type: String,
          maxlength: 1000,
        },
      },
    ],

    workExperience: [
      {
        company: {
          type: String,
          required: true,
          trim: true,
          maxlength: 150,
        },

        jobTitle: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },

        employmentType: {
          type: String,
          enum: [
            "Full-time",
            "Part-time",
            "Internship",
            "Freelance",
            "Contract",
            "Temporary",
          ],
        },

        location: {
          type: String,
          trim: true,
          maxlength: 100,
        },

        startDate: {
          type: Date,
          required: true,
        },

        endDate: {
          type: Date,
        },

        currentlyWorking: {
          type: Boolean,
          default: false,
        },

        description: {
          type: String,
          maxlength: 3000,
        },
      },
    ],

    projects: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          maxlength: 150,
        },

        description: {
          type: String,
          maxlength: 3000,
        },

        technologies: [
          {
            type: String,
            trim: true,
          },
        ],

        projectUrl: {
          type: String,
          trim: true,
        },

        githubUrl: {
          type: String,
          trim: true,
        },
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 150,
        },

        issuingOrganization: {
          type: String,
          trim: true,
          maxlength: 150,
        },

        issueDate: {
          type: Date,
        },

        expiryDate: {
          type: Date,
        },

        credentialId: {
          type: String,
          trim: true,
        },

        credentialUrl: {
          type: String,
          trim: true,
        },
      },
    ],

    jobPreferences: {
      preferredJobTypes: [
        {
          type: String,
          enum: [
            "Full-time",
            "Part-time",
            "Internship",
            "Freelance",
            "Contract",
            "Temporary",
          ],
        },
      ],

      preferredLocations: [
        {
          type: String,
          trim: true,
        },
      ],

      preferredWorkModes: [
        {
          type: String,
          enum: ["On-site", "Hybrid", "Remote"],
        },
      ],

      expectedSalary: {
        type: Number,
        min: 0,
      },

      noticePeriod: {
        type: String,
        enum: [
          "Immediate",
          "15 Days",
          "30 Days",
          "45 Days",
          "60 Days",
          "90 Days",
        ],
      },
    },

    availability: {
      openToWork: {
        type: Boolean,
        default: true,
      },

      candidateStatus: {
        type: String,
        enum: ["Active", "Open to Work", "Not Looking", "Unavailable"],
        default: "Active",
      },

      availableFrom: {
        type: Date,
      },
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("CandidateProfile", candidateProfileSchema);
