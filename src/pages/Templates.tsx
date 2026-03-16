import { useNavigate } from "react-router-dom";
import {
  getTemplatesByCategory,
  type TemplateCategory,
} from "../tamplates/registry";

const categoryIcons: Record<TemplateCategory, string> = {
  Profesional: "💼",
  Kreatif: "🎨",
  Minimalis: "✨",
};

const categoryDescriptions: Record<TemplateCategory, string> = {
  Profesional:
    "Template formal dan rapi, cocok untuk melamar di perusahaan korporat dan institusi besar.",
  Kreatif:
    "Template dengan desain yang berani dan unik, sempurna untuk industri kreatif.",
  Minimalis:
    "Template bersih dengan fokus pada konten, ideal untuk tampilan yang elegan dan ringkas.",
};

function Templates() {
  const navigate = useNavigate();
  const grouped = getTemplatesByCategory();

  const categories = Object.keys(grouped) as TemplateCategory[];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Pilih Template CV
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Temukan template yang sesuai dengan kebutuhan Anda. Klik{" "}
            <strong>"Gunakan Template"</strong> untuk mulai membuat CV.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const templates = grouped[category];
          if (templates.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{categoryIcons[category]}</span>
                <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
              </div>
              <p className="text-gray-500 mb-8 ml-12">
                {categoryDescriptions[category]}
              </p>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-52 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      {template.thumbnail ? (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                          <svg
                            className="w-16 h-16 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium">Preview</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 flex-1">
                        {template.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        type="button"
                        onClick={() => navigate(`/builder/${template.id}`)}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        Gunakan Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Templates;
