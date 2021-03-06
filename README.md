# Beat Calories

## Mateusz Skibicki - 2018

## Full Stack - MERN - MongoDB(mongoose), Express.js, React & Redux, Node.js

Full Stack project, social media for people interested in a healthy lifestyle. CRUD operations - Diets, Recipes, Profiles, Likes, Comments.

Part with Trainings and Posts isn't finished yet.

User MODEL example :

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  facebook: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    },
    website: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
    }
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
    }
  ],
  diets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diets"
    }
  ],
  likedDiets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diets"
    }
  ],
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes"
    }
  ],
  likedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes"
    }
  ],
  trainings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trainings"
    }
  ],
  likedTrainings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trainings"
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
```
