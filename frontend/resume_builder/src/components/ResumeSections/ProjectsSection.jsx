import React from "react";

const ProjectsSection = ({ data, onChange }) => {
  const items = Array.isArray(data) ? data : [];

  const handleItemChange = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(updated);
  };

  const addItem = () =>
    onChange([
      ...items,
      { title: "", description: "", github: "", liveDemo: "" },
    ]);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Projects</h2>
      {items.map((item, index) => (
        <div key={index} className="border-l-2 border-purple-200 pl-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) =>
                  handleItemChange(index, "title", e.target.value)
                }
                placeholder="E-commerce App"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                value={item.github || ""}
                onChange={(e) =>
                  handleItemChange(index, "github", e.target.value)
                }
                placeholder="https://github.com/..."
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Live Demo URL
              </label>
              <input
                type="url"
                value={item.liveDemo || ""}
                onChange={(e) =>
                  handleItemChange(index, "liveDemo", e.target.value)
                }
                placeholder="https://..."
                className="form-input"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={item.description || ""}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              placeholder="Brief description of the project..."
              rows={3}
              className="form-input resize-y"
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-small-light">
        + Add Project
      </button>
    </div>
  );
};

export default ProjectsSection;
