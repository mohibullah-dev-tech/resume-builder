const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");

//@desc create resume
//@route POST /resume
//@access Private
const createResume = async (req, res) => {
  try {
const { title, thumbnailLink } = req.body;
    const defaultResumeData = {
        profileInfo:{
            profileImg:null,
            previewUrl:"",
            fullName:"",
            designation:"",
            summary:"",
        },
        contactInfo:{
            email:"",
            phone:"",
            location:"",
            linkedin:"",
            github:"",
            website:"",
        },
        workExperience:[
            {
                companyName:"",
                role:"",
                startDate:"",
                endDate:"",
                description:"",
            },
        ],
        education:[
            {
                degree:"",
                institution:"",
                startDate:"",
                endDate:"",
            },
        ],
        skills:[
            {
                name:"",
                progress:"",

            },
        ],
        projects:[
            {
                title:"",
                description:"",
                github:"",
                liveDemo:"",
            },
        ],
        certifications:[
            {
                name:"",
                issuer:"",
                year:"",
            },
        ],
        languages:[
            {
                name:"",
                progress:"",
            },
        ],
        interests:[""],
    };
const newResume = await Resume.create({
  userId: req.user._id,
  title,
  thumbnailLink,
  ...defaultResumeData,
});
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  
  }
  };


//@desc get  single resumes by ID
//@route GET /resume
//@access Private
const getResumeById = async (req, res) => {};

//@desc get resumes by userId
//@route GET /resume
//@access Private
const getUserResumes = async (req, res) => {

    try{
        const resumes = await Resume.find({userId:req.user._id}).sort({updatedAt:-1});
        res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  
    }
  };

//@desc update resume
//@route PUT /resume
//@access Private
const updateResume = async (req, res) => {};

//@desc delete resume
//@route DELETE /resume
//@access Private
const deleteResume = async (req, res) => {};

module.exports = {
  createResume,
  getResumeById,
  getUserResumes,
  updateResume,
  deleteResume,
};