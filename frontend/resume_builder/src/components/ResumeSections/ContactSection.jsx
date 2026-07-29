import React from "react";

const ContactSection = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Contact</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={data?.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john@example.com"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={data?.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 234 567 8900"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={data?.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="New York, NY"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          type="url"
          value={data?.linkedin || ""}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/johndoe"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GitHub</label>
        <input
          type="url"
          value={data?.github || ""}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/johndoe"
          className="form-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          value={data?.website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="https://johndoe.com"
          className="form-input"
        />
      </div>
    </div>
  );
};

export default ContactSection;