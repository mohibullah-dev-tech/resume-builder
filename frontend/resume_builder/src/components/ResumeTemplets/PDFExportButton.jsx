import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FiDownload } from "react-icons/fi";

const PDFExportButton = ({ resume }) => {
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${resume?.profileInfo?.fullName || "Resume"}_Resume`,
  });

  return (
    <div>
      {/* Hidden preview for PDF capture */}
      <div className="absolute -left-[9999px]">
        <div ref={contentRef}>
          <div className="bg-white p-8 max-w-[800px]">
            <h1 className="text-3xl font-bold text-center">
              {resume?.profileInfo?.fullName || "Resume"}
            </h1>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="btn-primary flex w-auto items-center gap-2 px-5 cursor-pointer"
      >
        <FiDownload size={15} />
        PDF
      </button>
    </div>
  );
};

export default PDFExportButton;
