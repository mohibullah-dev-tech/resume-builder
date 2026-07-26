const express = require("express");
const{
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} = require("../controllers/resumeController");
const {protect} = require("../middlewares/authMiddleware");
// const {uploadResumeImage} = require("../controllers/uploadImage");
const router = express.Router();

router.post("/",protect,createResume);//create resume
router.get("/",protect,getUserResumes);//get resumes
router.get("/:id",protect,getResumeById);//get resume by id
router.put("/:id",protect,updateResume);//update resume
// router.put("/:id/upload-image",protect,uploadResumeImage);//upload resume image
router.delete("/:id",protect,deleteResume);//delete resume
module.exports = router;    

