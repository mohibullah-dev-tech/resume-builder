import React, { useState } from "react";
import Modal from "./Modal";
import { FiCheck } from "react-icons/fi";

const COLOR_PALETTES = [
  {
    id: "sunset",
    colors: ["#FFF5E1", "#FFD6B0", "#FF8C42", "#333333", "#000000"],
  },
  {
    id: "rose",
    colors: ["#FFF0F3", "#FFB3C1", "#FF4D6D", "#590D22", "#1A000D"],
  },
  {
    id: "teal",
    colors: ["#E6F9F5", "#B3E5DC", "#00BFA5", "#004D40", "#001A15"],
  },
  {
    id: "lavender",
    colors: ["#F3E8FF", "#D8B4FE", "#9333EA", "#4C1D95", "#1A0033"],
  },
  {
    id: "ocean",
    colors: ["#E0F2FE", "#BAE6FD", "#0284C7", "#0F172A", "#020617"],
  },
  {
    id: "sage",
    colors: ["#F0FDF4", "#BBF7D0", "#22C55E", "#14532D", "#052E16"],
  },
  {
    id: "coral",
    colors: ["#FFF7ED", "#FED7AA", "#F97316", "#7C2D12", "#2D0B00"],
  },
  {
    id: "slate",
    colors: ["#F1F5F9", "#CBD5E1", "#64748B", "#1E293B", "#0F172A"],
  },
];

const ThemeModal = ({ isOpen, onClose, currentTheme, onSelect }) => {
  const [selected, setSelected] = useState(currentTheme || "sunset");
  const [tab, setTab] = useState("color");

  const palette =
    COLOR_PALETTES.find((p) => p.id === selected) || COLOR_PALETTES[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Theme">
      <div className="p-6 min-w-[700px]">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            className={`pb-2 text-sm font-semibold cursor-pointer ${tab === "template" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setTab("template")}
          >
            Templates
          </button>
          <button
            className={`pb-2 text-sm font-semibold cursor-pointer ${tab === "color" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setTab("color")}
          >
            Color Palettes
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left: Palette Grid */}
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {COLOR_PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`p-3 rounded-xl border-2 transition cursor-pointer ${
                    selected === p.id
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {p.colors.map((c, i) => (
                      <div
                        key={i}
                        className="h-8 flex-1 rounded"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-700 capitalize">
                    {p.id}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="w-1/2">
            <div
              className="flex rounded-lg overflow-hidden shadow-lg text-xs"
              style={{ fontFamily: "sans-serif" }}
            >
              {/* Sidebar */}
              <div
                className="w-[35%] p-4"
                style={{ backgroundColor: palette.colors[0] }}
              >
                <p
                  className="font-bold text-sm"
                  style={{ color: palette.colors[3] }}
                >
                  John Doe
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: palette.colors[4] }}
                >
                  Developer
                </p>
                <div className="mt-4 space-y-2">
                  <p style={{ color: palette.colors[3] }}>📍 Anywhere</p>
                  <p style={{ color: palette.colors[3] }}>📧 john@email.com</p>
                  <p style={{ color: palette.colors[3] }}>📞 +1234567890</p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{ color: palette.colors[2] }}
                  >
                    Education
                  </p>
                  <p
                    className="font-semibold mt-2"
                    style={{ color: palette.colors[3] }}
                  >
                    M.Sc. CS
                  </p>
                  <p style={{ color: palette.colors[4] }}>Tech University</p>
                </div>
              </div>
              {/* Main */}
              <div className="w-[65%] p-4 bg-white">
                <p
                  className="font-bold text-xs uppercase tracking-wider"
                  style={{ color: palette.colors[2] }}
                >
                  Professional Summary
                </p>
                <p className="mt-1" style={{ color: palette.colors[4] }}>
                  Experienced developer building web apps with React, Node.js &
                  MongoDB.
                </p>
                <div className="mt-4">
                  <p
                    className="font-bold text-xs uppercase tracking-wider"
                    style={{ color: palette.colors[2] }}
                  >
                    Work Experience
                  </p>
                  <div className="mt-2">
                    <p
                      className="font-semibold"
                      style={{ color: palette.colors[3] }}
                    >
                      Tech Solutions
                    </p>
                    <p style={{ color: palette.colors[4] }}>
                      Senior Frontend Engineer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Done button */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              onSelect(selected);
              onClose();
            }}
            className="flex items-center gap-2 bg-purple-100 text-purple-700 font-semibold text-sm px-6 py-2 rounded-lg hover:bg-purple-200 cursor-pointer"
          >
            <FiCheck size={16} /> Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ThemeModal;
