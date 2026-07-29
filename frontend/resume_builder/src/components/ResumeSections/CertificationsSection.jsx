import React from "react";

const CertificationsSection = ({ data, onChange }) => {
  const items = Array.isArray(data) ? data : [];

  const handleItemChange = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(updated);
  };

  const addItem = () =>
    onChange([...items, { name: "", issuer: "", year: "" }]);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
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
                placeholder="AWS Certified Developer"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issuer
              </label>
              <input
                type="text"
                value={item.issuer || ""}
                onChange={(e) =>
                  handleItemChange(index, "issuer", e.target.value)
                }
                placeholder="Amazon Web Services"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="text"
                value={item.year || ""}
                onChange={(e) =>
                  handleItemChange(index, "year", e.target.value)
                }
                placeholder="2023"
                className="form-input"
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-small-light">
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationsSection;
