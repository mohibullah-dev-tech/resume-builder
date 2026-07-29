import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";
import ResumeCard from "../../components/Cards/ResumeCard";
import CreateResumeModal from "../../components/Cards/CreateResumeModal";
import ConfirmDeleteModal from "../../components/Cards/ConfirmDeleteModal";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all resumes
  const fetchResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET);
      setResumes(response.data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Create resume
  const handleCreateResume = async ({ title, templateId }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
        template: { theme: templateId, colorPalette: templateId },
      });
      setResumes((prev) => [response.data, ...prev]);
      toast.success("Resume created!");
      navigate(`/resume/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create resume");
      throw error;
    }
  };

  // Delete resume
  const handleDeleteResume = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(deleteTarget._id));
      setResumes((prev) => prev.filter((r) => r._id !== deleteTarget._id));
      toast.success("Resume deleted");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume");
    } finally {
      setDeleting(false);
    }
  };

  // Navigate to edit
  const handleEditResume = (resumeId) => {
    navigate(`/resume/${resumeId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="text-xl font-bold">Resume Builder</div>
        <ProfileInfoCard />
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-1 text-sm text-gray-500">
              {resumes.length} {resumes.length === 1 ? "resume" : "resumes"}{" "}
              saved
            </p>
          </div>
          <button
            className="btn-small"
            onClick={() => setShowCreateModal(true)}
          >
            <FiPlus size={16} />
            New Resume
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />
          </div>
        )}

        {/* Empty state */}
        {!loading && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <FiPlus size={28} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              No resumes yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Create your first resume to get started.
            </p>
            <button
              className="btn-primary mt-6 w-auto px-6"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Resume
            </button>
          </div>
        )}

        {/* Resume grid */}
        {!loading && resumes.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onEdit={handleEditResume}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Resume Modal */}
      <CreateResumeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateResume}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteResume}
        resumeTitle={deleteTarget?.title}
        loading={deleting}
      />
    </div>
  );
};

export default Dashboard;
