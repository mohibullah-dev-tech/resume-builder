import React from "react";

const SkillsSection = ({ data, onChange }) => {
  const items = Array.isArray(data) ? data : [];

  const handleItemChange = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index
        ? { ...item, [field]: field === "progress" ? value : value }
        : item,
    );
    onChange(updated);
  };

  const addItem = () => onChange([...items, { name: "", progress: "" }]);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Skills</h2>
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
                Name
              </label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                placeholder="JavaScript"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Progress (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={item.progress || ""}
                onChange={(e) =>
                  handleItemChange(index, "progress", e.target.value)
                }
                placeholder="85"
                className="form-input"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-small-light">
        + Add Skill
      </button>
    </div>
  );
};

export default SkillsSection;
