import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";

const ResumePreview = ({ resume }) => {
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
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {profile.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {profile.designation || "Designation"}
        </p>
      </div>

      {/* Contact */}
      {(contact.email ||
        contact.phone ||
        contact.location ||
        contact.linkedin ||
        contact.github ||
        contact.website) && (
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
          {contact.email && (
            <span className="flex items-center gap-1">
              <FiMail className="w-4 h-4" />
              {contact.email}
            </span>
          )}
          {contact.phone && (
            <span className="flex items-center gap-1">
              <FiPhone className="w-4 h-4" />
              {contact.phone}
            </span>
          )}
          {contact.location && (
            <span className="flex items-center gap-1">
              <FiMapPin className="w-4 h-4" />
              {contact.location}
            </span>
          )}
          {contact.linkedin && (
            <span className="flex items-center gap-1">
              <FiLinkedin className="w-4 h-4" />
              {contact.linkedin}
            </span>
          )}
          {contact.github && (
            <span className="flex items-center gap-1">
              <FiGithub className="w-4 h-4" />
              {contact.github}
            </span>
          )}
          {contact.website && (
            <span className="flex items-center gap-1">
              <FiGlobe className="w-4 h-4" />
              {contact.website}
            </span>
          )}
        </div>
      )}

      {/* Summary */}
      {profile.summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {exp.companyName || ""}
                  </h3>
                  <p className="text-sm text-gray-600">{exp.role || ""}</p>
                </div>
                <div className="text-sm text-gray-500 text-right shrink-0 ml-4">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
              )}
              {i < experience.length - 1 && (
                <hr className="my-4 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {edu.institution || ""}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.degree || ""}</p>
                </div>
                <div className="text-sm text-gray-500 text-right shrink-0 ml-4">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {skill.name || ""}
                  </span>
                  <span className="text-gray-500">{skill.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${skill.progress || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold text-gray-800">
                {proj.title || ""}
              </h3>
              {proj.description && (
                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
              )}
              <div className="flex gap-3 mt-1 text-xs text-purple-600">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {proj.liveDemo && (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Certifications
          </h2>
          <ul className="space-y-1 text-gray-700">
            {certifications.map((cert, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium">{cert.name || ""}</span>
                {cert.issuer && (
                  <span className="text-gray-500"> — {cert.issuer}</span>
                )}
                {cert.year && (
                  <span className="text-gray-400"> ({cert.year})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {lang.name || ""}
                  </span>
                  <span className="text-gray-500">{lang.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${lang.progress || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm font-medium"
              >
                {typeof interest === "string" ? interest : interest.name || ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
