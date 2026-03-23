import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import CVFormDynamic, { type CVData } from "../component/form/CvFromDynamic";
import { templateRegistry } from "../tamplates/registry";
import { defaultCVData } from "../tamplates/CV1/Cv1";

export default function Builder() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  const template = templateId ? templateRegistry[templateId] : undefined;

  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const handleDataUpdate = useCallback((data: CVData) => {
    setCvData(data);
  }, []);

  // Redirect ke halaman templates jika templateId tidak valid
  useEffect(() => {
    if (!template) {
      navigate("/templates", { replace: true });
    }
  }, [template, navigate]);

  if (!template) {
    return null;
  }

  const { PreviewComponent, PDFComponent, formType } = template;

  return (
    <div className="flex flex-col md:flex-row md:p-20 py-20 gap-10 bg-neutral-50 dark:bg-zinc-950">
      <div className="max-h-screen overflow-y-scroll no-scrollbar flex-1">
        <CVFormDynamic formType={formType} onDataUpdate={handleDataUpdate} />
        <div className="flex justify-center bg-neutral-50 dark:bg-zinc-950">
          <PDFDownloadLink
            document={<PDFComponent data={cvData} />}
            fileName={`${cvData.personalInfo.fullName || "CV"}-CV.pdf`}
          >
            <button
              className="bg-blue-50 dark:bg-zinc-800 text-center my-10 w-100 rounded-2xl h-14 relative text-zinc-950 dark:text-neutral-50 text-lg font-semibold group"
              type="button"
            >
              <div className="bg-blue-400 dark:bg-violet-600 rounded-2xl h-12 w-1/6 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-98 z-10 hover:shadow-2xl hover:shadow-blue-500 dark:hover:shadow-violet-600 duration-500">
                <Download />
              </div>
              <p>Download</p>
            </button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="w-[210mm] h-[297mm] translate-x-1 scale-[0.48] md:scale-90 origin-top-left md:origin-top select-none">
        <PreviewComponent data={cvData} />
      </div>
    </div>
  );
}
