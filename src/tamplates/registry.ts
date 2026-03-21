import type { ComponentType } from "react";
import type { FormType, CVData } from "../component/form/CvFromDynamic";

// Komponen dari CV1
import { Cv1Preview, Cv1PDF } from "./CV1/Cv1";

// =============================================================================
// Types
// =============================================================================

export type TemplateCategory = "Professional" | "Creative" | "Minimalist";

export interface TemplateEntry {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  thumbnail?: string;
  formType: FormType;
  PreviewComponent: ComponentType<{ data: CVData }>;
  PDFComponent: ComponentType<{ data: CVData }>;
}

// =============================================================================
// Registry
// =============================================================================

export const templateRegistry: Record<string, TemplateEntry> = {
  cv1: {
    id: "cv1",
    name: "Modern Minimalis",
    description:
      "Clean and professional CV design with a modern minimalist layout. Suitable for applying to corporate companies.",
    category: "Professional",
    formType: "Type 3",
    PreviewComponent: Cv1Preview,
    PDFComponent: Cv1PDF,
  },
  cv2: {
    id: "cv2",
    name: "Elegant Clean",
    description:
      "CV template with an elegant touch and neat layout. Ideal for managerial and executive positions.",
    category: "Minimalist",
    formType: "Type 2",
    // Reuse Cv1 components sebagai placeholder sampai template baru dibuat
    PreviewComponent: Cv1Preview,
    PDFComponent: Cv1PDF,
  },
  cv3: {
    id: "cv3",
    name: "Creative Bold",
    description:
      "Creative CV template with a bold and eye-catching look. Perfect for creative and design industries.",
    category: "Creative",
    formType: "Type 1",
    // Reuse Cv1 components sebagai placeholder sampai template baru dibuat
    PreviewComponent: Cv1Preview,
    PDFComponent: Cv1PDF,
  },
};

// =============================================================================
// Helpers
// =============================================================================

/** Ambil semua template sebagai array */
export function getAllTemplates(): TemplateEntry[] {
  return Object.values(templateRegistry);
}

/** Ambil template yang dikelompokkan berdasarkan kategori */
export function getTemplatesByCategory(): Record<
  TemplateCategory,
  TemplateEntry[]
> {
  const grouped: Record<TemplateCategory, TemplateEntry[]> = {
    Professional: [],
    Creative: [],
    Minimalist: [],
  };

  for (const entry of Object.values(templateRegistry)) {
    grouped[entry.category].push(entry);
  }

  return grouped;
}
