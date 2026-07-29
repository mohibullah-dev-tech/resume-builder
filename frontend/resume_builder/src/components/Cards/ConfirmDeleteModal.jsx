import React from "react";
import Modal from "../Modal";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  resumeTitle,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Resume">
      <div className="p-6 sm:p-8">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">
            "{resumeTitle || "this resume"}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
