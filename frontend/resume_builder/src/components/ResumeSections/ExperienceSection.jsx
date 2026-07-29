import React from "react";

const ExperienceSection = ({ data, onChange }) => {
  const items = Array.isArray(data) ? data : [];

  const handleItemChange = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
      </div>

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
                Company
              </label>
              <input
                type="text"
                value={item.companyName || ""}
                onChange={(e) =>
                  handleItemChange(index, "companyName", e.target.value)
                }
                placeholder="Company Inc."
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={item.role || ""}
                onChange={(e) =>
                  handleItemChange(index, "role", e.target.value)
                }
                placeholder="Software Engineer"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="text"
                value={item.startDate || ""}
                onChange={(e) =>
                  handleItemChange(index, "startDate", e.target.value)
                }
                placeholder="Jan 2020"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="text"
                value={item.endDate || ""}
                onChange={(e) =>
                  handleItemChange(index, "endDate", e.target.value)
                }
                placeholder="Present"
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
              placeholder="Describe your responsibilities..."
              rows={3}
              className="form-input resize-y"
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addItem} className="btn-small-light">
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceSection;
