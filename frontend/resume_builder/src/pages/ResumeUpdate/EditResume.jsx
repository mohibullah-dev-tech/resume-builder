import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiSave,
  FiTrash2,
  FiEye,
  FiDownload,
} from "react-icons/fi";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";
import ProfileSection from "../../components/ResumeSections/ProfileSection";
import ContactSection from "../../components/ResumeSections/ContactSection";
import ExperienceSection from "../../components/ResumeSections/ExperienceSection";
import EducationSection from "../../components/ResumeSections/EducationSection";
import SkillsSection from "../../components/ResumeSections/SkillsSection";
import CertificationsSection from "../../components/ResumeSections/CertificationsSection";
import LanguagesSection from "../../components/ResumeSections/LanguagesSection";
import ProjectsSection from "../../components/ResumeSections/ProjectsSection";
import TemplateTwoColumn from "../../components/ResumeTemplets/TemplateTwoColumn";

const SECTIONS = [
  {
    key: "profile",
    label: "Profile",
    comp: ProfileSection,
    dataKey: "profileInfo",
  },
  {
    key: "contact",
    label: "Contact",
    comp: ContactSection,
    dataKey: "contactInfo",
  },
  {
    key: "experience",
    label: "Experience",
    comp: ExperienceSection,
    dataKey: "workExperience",
  },
  {
    key: "education",
    label: "Education",
    comp: EducationSection,
    dataKey: "education",
  },
  { key: "skills", label: "Skills", comp: SkillsSection, dataKey: "skills" },
  {
    key: "projects",
    label: "Projects",
    comp: ProjectsSection,
    dataKey: "projects",
  },
  {
    key: "certifications",
    label: "Certifications",
    comp: CertificationsSection,
    dataKey: "certifications",
  },
  {
    key: "languages",
    label: "Languages",
    comp: LanguagesSection,
    dataKey: "languages",
  },
];

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATHS.RESUME.GET_BY_ID(resumeId),
        );
        setResume(res.data);
      } catch {
        toast.error("Failed to load resume");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleChange = (dataKey, value) => {
    setResume((prev) => ({ ...prev, [dataKey]: value }));
  };

  const handleSave = async () => {
    if (!resume) return;
    setSaving(true);
    try {
      const res = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        resume,
      );
      setResume(res.data);
      toast.success("Saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Deleted");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("profileImage", file);
      const res = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGE(resumeId),
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setResume((prev) => ({
        ...prev,
        profileInfo: {
          ...prev.profileInfo,
          profilePreviewUrl:
            res.data.profilePreviewUrl || prev.profileInfo?.profilePreviewUrl,
        },
      }));
      toast.success("Photo uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />
      </div>
    );
  }
  if (!resume) return null;

  const section = SECTIONS[step];
  const ActiveComp = section?.comp;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <FiArrowLeft size={16} /> Resume Builder
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-800">
            {resume.title || "Untitled"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="btn-small-light cursor-pointer"
          >
            <FiDownload size={14} /> Preview & Download
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 cursor-pointer"
          >
            <FiTrash2 size={14} /> Delete
          </button>
          <ProfileInfoCard />
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-white p-6">
          {/* Profile photo */}
          <div className="relative inline-block mb-6">
            {resume.profileInfo?.profilePreviewUrl ? (
              <img
                src={resume.profileInfo.profilePreviewUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold">
                {resume.profileInfo?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-purple-700">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {uploading ? "..." : "+"}
            </label>
          </div>

          {/* Section step indicator */}
          <div className="flex gap-1 mb-6">
            {SECTIONS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStep(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium cursor-pointer transition ${i === step ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active section form */}
          {ActiveComp && (
            <ActiveComp
              data={resume[section.dataKey]}
              onChange={(val) => handleChange(section.dataKey, val)}
            />
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="btn-small-light cursor-pointer disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary w-auto px-6 cursor-pointer"
            >
              <FiSave size={15} /> {saving ? "Saving..." : "Save & Exit"}
            </button>
            <button
              onClick={() => setStep(Math.min(SECTIONS.length - 1, step + 1))}
              disabled={step === SECTIONS.length - 1}
              className="bg-purple-600 text-white text-sm font-semibold px-5 py-1.5 rounded cursor-pointer hover:bg-purple-700 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
          <TemplateTwoColumn resume={resume} />
        </div>
      </div>
    </div>
  );
};

export default EditResume;
