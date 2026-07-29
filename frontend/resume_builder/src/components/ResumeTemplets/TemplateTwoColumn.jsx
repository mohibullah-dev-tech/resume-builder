import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";

const TemplateTwoColumn = ({ resume }) => {
  const profile = resume?.profileInfo || {};
  const contact = resume?.contactInfo || {};
  const experience = resume?.workExperience || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const projects = resume?.projects || [];
  const certifications = resume?.certifications || [];
  const languages = resume?.languages || [];
  const interests = resume?.interests || [];

  return (
    <div className="flex max-w-[900px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Left Column — Lavender Sidebar */}
      <div className="w-[35%] bg-[#f0ecfa] p-6 flex flex-col gap-6">
        {/* Name & Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile.fullName || "Your Name"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {profile.designation || "Designation"}
          </p>
        </div>

        {/* Contact Info (icon + text) */}
        <div className="space-y-3 text-sm text-gray-700">
          {contact.email && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiMail size={14} className="text-purple-700" />
              </div>
              <span>{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiPhone size={14} className="text-purple-700" />
              </div>
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiMapPin size={14} className="text-purple-700" />
              </div>
              <span>{contact.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiLinkedin size={14} className="text-purple-700" />
              </div>
              <span className="truncate">{contact.linkedin}</span>
            </div>
          )}
          {contact.github && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiGithub size={14} className="text-purple-700" />
              </div>
              <span className="truncate">{contact.github}</span>
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center">
                <FiGlobe size={14} className="text-purple-700" />
              </div>
              <span className="truncate">{contact.website}</span>
            </div>
          )}
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  {edu.degree || ""}
                </p>
                <p className="text-xs text-gray-600">{edu.institution || ""}</p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Languages
            </h2>
            {languages.map((lang, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm text-gray-700">{lang.name || ""}</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2.5 h-2.5 rounded-full ${parseInt(lang.progress) / 20 >= dot ? "bg-purple-500" : "border border-purple-300"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Skills
            </h2>
            {skills.map((skill, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm text-gray-700">{skill.name || ""}</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2.5 h-2.5 rounded-full ${parseInt(skill.progress) / 20 >= dot ? "bg-purple-500" : "border border-purple-300"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column — White Content */}
      <div className="w-[65%] p-6 flex flex-col gap-5">
        {/* Contact row */}
        <div className="flex gap-4 text-sm text-gray-600">
          {contact.email && (
            <span className="flex items-center gap-1">
              <FiMail size={14} />
              {contact.email}
            </span>
          )}
          {contact.phone && (
            <span className="flex items-center gap-1">
              <FiPhone size={14} />
              {contact.phone}
            </span>
          )}
        </div>

        {/* Summary */}
        {profile.summary && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {profile.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Work Experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold text-gray-800">
                    {exp.companyName || ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} — {exp.endDate}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mb-1">{exp.role || ""}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Projects
            </h2>
            {projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  {proj.title || ""}
                </p>
                {proj.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {proj.description}
                  </p>
                )}
                <div className="flex gap-3 text-xs text-blue-600 mt-1">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
              Certifications
            </h2>
            {certifications.map((cert, i) => (
              <p key={i} className="text-sm text-gray-700">
                • {cert.name}
                {cert.issuer ? ` — ${cert.issuer}` : ""}
                {cert.year ? ` (${cert.year})` : ""}
              </p>
            ))}
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <span
                  key={i}
                  className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {typeof interest === "string"
                    ? interest
                    : interest.name || ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTwoColumn;
