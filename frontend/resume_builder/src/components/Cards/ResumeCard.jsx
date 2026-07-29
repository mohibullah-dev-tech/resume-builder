import React from "react";
import { FiEdit2, FiTrash2, FiClock } from "react-icons/fi";
import moment from "moment";

const ResumeCard = ({ resume, onEdit, onDelete }) => {
  const updatedAt = moment(resume.updatedAt).format("MMM D, YYYY");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {resume.thumbnailLink ? (
          <img
            src={resume.thumbnailLink}
            alt={resume.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold text-gray-300">
              {resume.title?.charAt(0)?.toUpperCase() || "R"}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-base font-semibold text-gray-900">
          {resume.title || "Untitled Resume"}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <FiClock size={12} />
          {updatedAt}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
        <button
          className="btn-small-light flex-1 justify-center"
          onClick={() => onEdit(resume._id)}
        >
          <FiEdit2 size={14} />
          Edit
        </button>
        <button
          className="flex items-center justify-center gap-1 rounded border border-red-200 px-3 py-1.5 text-[12px] font-semibold text-red-600 transition hover:bg-red-50 cursor-pointer"
          onClick={() => onDelete(resume)}
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
