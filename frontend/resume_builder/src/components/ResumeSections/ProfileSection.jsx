import React from "react";

const ProfileSection = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Profile</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          value={data?.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Designation
        </label>
        <input
          type="text"
          value={data?.designation || ""}
          onChange={(e) => handleChange("designation", e.target.value)}
          placeholder="Software Engineer"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          value={data?.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief professional summary..."
          rows={4}
          className="form-input resize-y"
        />
      </div>
    </div>
  );
};

export default ProfileSection;
