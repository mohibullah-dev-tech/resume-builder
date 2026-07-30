import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";

const TemplateModern = ({ resume }) => {
  const p = resume?.profileInfo || {};
  const c = resume?.contactInfo || {};
  const exp = resume?.workExperience || [];
  const edu = resume?.education || [];
  const skills = resume?.skills || [];
  const proj = resume?.projects || [];
  const certs = resume?.certifications || [];
  const langs = resume?.languages || [];
  const ints = resume?.interests || [];

  return (
    <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header with teal background */}
      <div className="bg-teal-500 p-6 text-white">
        <h1 className="text-3xl font-bold">{p.fullName || "Your Name"}</h1>
        <p className="text-teal-100 mt-1 text-lg">
          {p.designation || "Designation"}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-teal-50">
          {c.email && (
            <span className="flex items-center gap-1">
              <FiMail size={14} />
              {c.email}
            </span>
          )}
          {c.phone && (
            <span className="flex items-center gap-1">
              <FiPhone size={14} />
              {c.phone}
            </span>
          )}
          {c.location && (
            <span className="flex items-center gap-1">
              <FiMapPin size={14} />
              {c.location}
            </span>
          )}
          {c.linkedin && (
            <span className="flex items-center gap-1">
              <FiLinkedin size={14} />
              {c.linkedin}
            </span>
          )}
          {c.github && (
            <span className="flex items-center gap-1">
              <FiGithub size={14} />
              {c.github}
            </span>
          )}
          {c.website && (
            <span className="flex items-center gap-1">
              <FiGlobe size={14} />
              {c.website}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {p.summary && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{p.summary}</p>
          </div>
        )}

        {exp.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">
              Work Experience
            </h2>
            {exp.map((e, i) => (
              <div
                key={i}
                className="mb-4 pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {e.companyName || ""}
                    </p>
                    <p className="text-xs text-teal-500">{e.role || ""}</p>
                  </div>
                  <p className="text-xs text-gray-400 shrink-0">
                    {e.startDate} — {e.endDate}
                  </p>
                </div>
                {e.description && (
                  <p className="text-sm text-gray-600 mt-1">{e.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {edu.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">
              Education
            </h2>
            {edu.map((e, i) => (
              <div key={i} className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">
                    {e.institution || ""}
                  </p>
                  <p className="text-xs text-gray-500">{e.degree || ""}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {e.startDate} — {e.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">
                Skills
              </h2>
              {skills.map((s, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">
                      {s.name || ""}
                    </span>
                    <span className="text-gray-400">{s.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full"
                      style={{ width: `${s.progress || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {langs.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">
                Languages
              </h2>
              {langs.map((l, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">
                      {l.name || ""}
                    </span>
                    <span className="text-gray-400">{l.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-teal-400 h-1.5 rounded-full"
                      style={{ width: `${l.progress || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {proj.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-3">
              Projects
            </h2>
            {proj.map((pr, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-gray-800 text-sm">
                  {pr.title || ""}
                </p>
                {pr.description && (
                  <p className="text-xs text-gray-600">{pr.description}</p>
                )}
                <div className="flex gap-3 text-xs text-teal-600 mt-1">
                  {pr.github && (
                    <a
                      href={pr.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {pr.liveDemo && (
                    <a
                      href={pr.liveDemo}
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

        {certs.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">
              Certifications
            </h2>
            {certs.map((cert, i) => (
              <p key={i} className="text-xs text-gray-700">
                • {cert.name}
                {cert.issuer ? ` — ${cert.issuer}` : ""}
              </p>
            ))}
          </div>
        )}

        {ints.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {ints.map((it, i) => (
                <span
                  key={i}
                  className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full"
                >
                  {typeof it === "string" ? it : it.name || ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateModern;
