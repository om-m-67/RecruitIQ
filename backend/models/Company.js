/*
name
legalName
tagline
description

logo
bannerImage

industry
companyType
specializations

website
careersPage
companyEmail
phone



address
 ├── street
 ├── city
 ├── state
 ├── country
 └── postalCode

companySize
foundedYear

socialLinks
 ├── linkedin
 ├── github
 ├── twitter
 ├── facebook
 ├── instagram
 └── youtube

owner
recruiters

isVerified
isActive

subscriptionPlan
subscriptionStatus

isDeleted
deletedAt

timestamps

*/

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    legalName: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    tagline: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      maxlength: 3000,
    },


    logo: {
      type: String,
      default: "",
    },

    bannerImage: {
      type: String,
      default: "",
    },

    
    industry: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    companyType: {
      type: String,
      enum: [
        "Startup",
        "Private",
        "Public",
        "Government",
        "Nonprofit",
        "Enterprise",
      ],
      default: "Private",
    },

    specializations: [
      {
        type: String,
        trim: true,
      },
    ],

    website: {
      type: String,
      trim: true,
      lowercase: true,
    },

    careersPage: {
      type: String,
      trim: true,
      lowercase: true,
    },

    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
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

    companySize: {
      type: String,
      enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
    },

    foundedYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },

    // Social Links
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
      },

      github: {
        type: String,
        trim: true,
      },

      twitter: {
        type: String,
        trim: true,
      },

      facebook: {
        type: String,
        trim: true,
      },

      instagram: {
        type: String,
        trim: true,
      },

      youtube: {
        type: String,
        trim: true,
      },
    },

    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    recruiters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],


    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },


    subscriptionPlan: {
      type: String,
      enum: ["free", "starter", "pro", "enterprise"],
      default: "free",
    },

    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expired", "cancelled"],
      default: "active",
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


module.exports = mongoose.model("Company", companySchema);