import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "../Modal";
import TEMPLATES from "../../utils/templates";

const CreateResumeModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onCreate({
        title: title.trim(),
        templateId: selectedTemplate,
      });
      setTitle("");
      setSelectedTemplate(TEMPLATES[0].id);
      onClose();
    } catch {
      // error handled by parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Resume">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Software Engineer Resume"
            className="form-input"
            required
            autoFocus
          />
        </div>

        {/* Template selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Template
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((template) => (
              <button
                type="button"
                key={template.id}
                className={`relative flex flex-col items-center rounded-xl border-2 p-4 transition cursor-pointer ${
                  selectedTemplate === template.id
                    ? "border-purple-500 ring-2 ring-purple-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Template color preview */}
                <div
                  className="mb-2 h-20 w-full rounded-lg"
                  style={{ background: template.thumbnailBg }}
                />
                <span className="text-sm font-semibold text-gray-900">
                  {template.name}
                </span>
                <span className="mt-0.5 text-xs text-gray-500">
                  {template.description}
                </span>

                {/* check mark when selected */}
                {selectedTemplate === template.id && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="btn-primary flex-1"
          >
            {loading ? "Creating..." : "Create Resume"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateResumeModal;
