import React from "react";

const EducationSection = ({ data, onChange }) => {
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
      { degree: "", institution: "", startDate: "", endDate: "" },
    ]);
  };

  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Education</h2>
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
                Degree
              </label>
              <input
                type="text"
                value={item.degree || ""}
                onChange={(e) =>
                  handleItemChange(index, "degree", e.target.value)
                }
                placeholder="B.Sc. in Computer Science"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <input
                type="text"
                value={item.institution || ""}
                onChange={(e) =>
                  handleItemChange(index, "institution", e.target.value)
                }
                placeholder="University of Example"
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
                placeholder="Sep 2016"
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
                placeholder="Jun 2020"
                className="form-input"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-small-light">
        + Add Education
      </button>
    </div>
  );
};

export default EducationSection;
