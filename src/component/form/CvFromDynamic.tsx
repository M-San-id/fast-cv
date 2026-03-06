import React, { useState, useCallback, useEffect } from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

export type FormType = "Type 1" | "Type 2" | "Type 3";

export interface BaseEntity {
  id: string;
}

export interface PersonalInfo {
  profilePhoto: string;
  fullName: string;
  expectedPosition: string;
  email: string;
  phone: string;
  address: string;
}

export interface Education extends BaseEntity {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Task extends BaseEntity {
  description: string;
}

export interface Experience extends BaseEntity {
  type: "Work" | "Organizational";
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

export interface Skill extends BaseEntity {
  name: string;
  level?: string;
}

export interface Certificate extends BaseEntity {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language extends BaseEntity {
  name: string;
  proficiency: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experiences: Experience[];
  hardSkills: Skill[];
  softSkills: Skill[];
  devices: Skill[];
  certificates: Certificate[];
  languages: Language[];
}

export interface CVFormDynamicProps {
  /**
   * Tipe form CV yang menentukan bagian mana saja yang akan ditampilkan.
   * - Type 1: Complete Form
   * - Type 2: Modern Form
   * - Type 3: Compact Form
   */
  formType: FormType;
  /**
   * Callback yang dipanggil setiap kali terjadi perubahan data pada form.
   */
  onDataUpdate: (data: CVData) => void;
}

// Helper untuk menghasilkan ID unik
const generateId = () =>
  Date.now().toString() + "-" + Math.random().toString(36).substring(2, 9);

// ============================================================================
// Main Component
// ============================================================================

export interface GenericItemHandlers {
  addItem: <T extends BaseEntity>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    defaultItem: Omit<T, "id">,
  ) => void;
  updateItem: <T extends BaseEntity>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: string,
    field: keyof T,
    value: any,
  ) => void;
  removeItem: <T extends BaseEntity>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: string,
  ) => void;
}

export interface PersonalInfoSectionProps {
  showPhoto: boolean;
  showExpectedPosition: boolean;
  personalInfo: PersonalInfo;
  handlePersonalInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: () => void;
}

export interface SummarySectionProps {
  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
}

export interface ExperienceSectionProps extends GenericItemHandlers {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  addTask: (expId: string) => void;
  updateTask: (expId: string, taskId: string, value: string) => void;
  removeTask: (expId: string, taskId: string) => void;
}

export interface EducationSectionProps extends GenericItemHandlers {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

export interface SkillSectionProps extends GenericItemHandlers {
  showHardSoftDevices: boolean;
  showCombinedSkills: boolean;
  hardSkills: Skill[];
  softSkills: Skill[];
  devices: Skill[];
  setHardSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setSoftSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setDevices: React.Dispatch<React.SetStateAction<Skill[]>>;
}

export interface CertificateSectionProps extends GenericItemHandlers {
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

export interface LanguageSectionProps extends GenericItemHandlers {
  languages: Language[];
  setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export function PersonalInfoSection({
  showPhoto,
  showExpectedPosition,
  personalInfo,
  handlePersonalInfoChange,
  handlePhotoUpload,
  removePhoto,
}: PersonalInfoSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold text-gray-800">
          1. Informasi Pribadi
        </h3>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        {showPhoto && (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start space-y-3 pb-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700">
              Foto Profil
            </label>
            <div className="flex items-center gap-6">
              {personalInfo.profilePhoto ? (
                <div className="relative group">
                  <img
                    src={personalInfo.profilePhoto}
                    alt="Profile Preview"
                    className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute bottom-0 right-0 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600 transition"
                    title="Hapus Foto"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-md text-gray-400">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Maks. ukuran direkomendasikan 2MB (JPG, PNG).
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 transition-colors"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 transition-colors"
            placeholder="+62 812-3456-7890"
            required
          />
        </div>

        {showExpectedPosition && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi yang Dituju <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="expectedPosition"
              value={personalInfo.expectedPosition}
              onChange={handlePersonalInfoChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 transition-colors"
              placeholder="Software Engineer"
              required
            />
          </div>
        )}

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat (Opsional)
          </label>
          <textarea
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalInfoChange}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 transition-colors"
            rows={2}
            placeholder="Jl. Jendral Sudirman No. 1, Jakarta"
          />
        </div>
      </div>
    </section>
  );
}

export function SummarySection({ summary, setSummary }: SummarySectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        2. Ringkasan Profesional
      </h3>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 transition-colors bg-gray-50"
        rows={4}
        placeholder="Tuliskan secara singkat tentang diri Anda, pengalaman, dan apa yang bisa Anda tawarkan..."
      />
    </section>
  );
}

export function ExperienceSection({
  experiences,
  setExperiences,
  addItem,
  updateItem,
  removeItem,
  addTask,
  updateTask,
  removeTask,
}: ExperienceSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          3. Pengalaman Kerja / Organisasi
        </h3>
        <button
          type="button"
          onClick={() =>
            addItem(setExperiences, {
              type: "Work",
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              tasks: [],
            })
          }
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tambah Pengalaman
        </button>
      </div>

      <div className="space-y-4">
        {experiences.length === 0 && (
          <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
            Belum ada pengalaman yang ditambahkan.
          </div>
        )}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 md:p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm relative group"
          >
            <button
              type="button"
              onClick={() => removeItem(setExperiences, exp.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              title="Hapus Pengalaman"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Pengalaman
                </label>
                <select
                  value={exp.type}
                  onChange={(e) =>
                    updateItem(setExperiences, exp.id, "type", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                >
                  <option value="Work">Pengalaman Kerja</option>
                  <option value="Organizational">Pengalaman Organisasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {exp.type === "Work" ? "Nama Perusahaan" : "Nama Organisasi"}
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateItem(
                      setExperiences,
                      exp.id,
                      "company",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  placeholder={
                    exp.type === "Work" ? "PT. Angin ribut" : "BEM Universitas"
                  }
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jabatan / Posisi
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateItem(
                      setExperiences,
                      exp.id,
                      "position",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  placeholder="Misal: Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mulai Periode
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateItem(
                      setExperiences,
                      exp.id,
                      "startDate",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Akhir Periode
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateItem(
                      setExperiences,
                      exp.id,
                      "endDate",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Biarkan kosong jika masih berlangsung.
                </p>
              </div>
            </div>

            {/* Deskripsi Tugas Dinamis */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi Tugas / Pencapaian
                </label>
                <button
                  type="button"
                  onClick={() => addTask(exp.id)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-50 text-green-700 font-semibold rounded-md border border-green-200 hover:bg-green-100 transition"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Tambah Tugas
                </button>
              </div>

              <ul className="space-y-3">
                {exp.tasks.map((task) => (
                  <li key={task.id} className="flex gap-2 items-start">
                    <span className="text-gray-400 mt-2">•</span>
                    <textarea
                      value={task.description}
                      onChange={(e) =>
                        updateTask(exp.id, task.id, e.target.value)
                      }
                      className="flex-1 rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 text-sm min-h-[40px] bg-white resize-y"
                      placeholder="Jelaskan deskripsi tugas atau pencapaian yang dilakukan..."
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => removeTask(exp.id, task.id)}
                      className="mt-2 text-gray-400 hover:text-red-500 transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </li>
                ))}
                {exp.tasks.length === 0 && (
                  <li className="text-sm text-gray-500 italic">
                    Belum ada deskripsi tugas.
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({
  education,
  setEducation,
  addItem,
  updateItem,
  removeItem,
}: EducationSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">4. Pendidikan</h3>
        <button
          type="button"
          onClick={() =>
            addItem(setEducation, {
              institution: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tambah Pendidikan
        </button>
      </div>

      <div className="space-y-4">
        {education.length === 0 && (
          <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
            Belum ada institusi pendidikan yang ditambahkan.
          </div>
        )}
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm relative group"
          >
            <button
              type="button"
              onClick={() => removeItem(setEducation, edu.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              title="Hapus Pendidikan"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Institusi
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateItem(
                      setEducation,
                      edu.id,
                      "institution",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  placeholder="Universitas Indonesia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gelar
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateItem(setEducation, edu.id, "degree", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  placeholder="S1 / Sarjana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bidang / Jurusan
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) =>
                    updateItem(setEducation, edu.id, "field", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  placeholder="Ilmu Komputer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mulai Tahun
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateItem(
                      setEducation,
                      edu.id,
                      "startDate",
                      e.target.value,
                    )
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lulus Tahun
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateItem(setEducation, edu.id, "endDate", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillSection({
  showHardSoftDevices,
  showCombinedSkills,
  hardSkills,
  softSkills,
  devices,
  setHardSkills,
  setSoftSkills,
  setDevices,
  addItem,
  updateItem,
  removeItem,
}: SkillSectionProps) {
  return (
    <>
      {/* Type 1: Separated Hard/Soft Skills and Devices */}
      {showHardSoftDevices && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hard Skills */}
          <section className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Hard Skills</h3>
              <button
                type="button"
                onClick={() => addItem(setHardSkills, { name: "" })}
                className="p-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                title="Tambah Hard Skill"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {hardSkills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      updateItem(
                        setHardSkills,
                        skill.id,
                        "name",
                        e.target.value,
                      )
                    }
                    className="flex-1 rounded-md border border-gray-300 py-1.5 px-3 focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
                    placeholder="e.g. React.js"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setHardSkills, skill.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </li>
              ))}
              {hardSkills.length === 0 && (
                <span className="text-sm text-gray-500">Belum ada.</span>
              )}
            </ul>
          </section>

          {/* Soft Skills */}
          <section className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Soft Skills</h3>
              <button
                type="button"
                onClick={() => addItem(setSoftSkills, { name: "" })}
                className="p-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition"
                title="Tambah Soft Skill"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {softSkills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      updateItem(
                        setSoftSkills,
                        skill.id,
                        "name",
                        e.target.value,
                      )
                    }
                    className="flex-1 rounded-md border border-gray-300 py-1.5 px-3 focus:border-purple-500 focus:ring-purple-500 text-sm bg-white"
                    placeholder="e.g. Komunikasi Baik"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setSoftSkills, skill.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </li>
              ))}
              {softSkills.length === 0 && (
                <span className="text-sm text-gray-500">Belum ada.</span>
              )}
            </ul>
          </section>

          {/* Devices / Tools */}
          <section className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Perangkat / Tools</h3>
              <button
                type="button"
                onClick={() => addItem(setDevices, { name: "" })}
                className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                title="Tambah Tools"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {devices.map((device) => (
                <li key={device.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={device.name}
                    onChange={(e) =>
                      updateItem(setDevices, device.id, "name", e.target.value)
                    }
                    className="flex-1 rounded-md border border-gray-300 py-1.5 px-3 focus:border-green-500 focus:ring-green-500 text-sm bg-white"
                    placeholder="e.g. Git, Figma"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setDevices, device.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </li>
              ))}
              {devices.length === 0 && (
                <span className="text-sm text-gray-500">Belum ada.</span>
              )}
            </ul>
          </section>
        </div>
      )}

      {/* Type 2 / 3: Combined General Skills */}
      {showCombinedSkills && (
        <section className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">
              Kemampuan / Skills
            </h3>
            <button
              type="button"
              onClick={() => addItem(setHardSkills, { name: "" })}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Tambah Skill
            </button>
          </div>

          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[80px]">
            {hardSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center bg-white border border-indigo-200 hover:border-indigo-400 rounded-full px-3 py-1 shadow-sm transition-colors group"
              >
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    updateItem(setHardSkills, skill.id, "name", e.target.value)
                  }
                  className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm text-gray-700 w-32 outline-none"
                  placeholder="Nama skill"
                />
                <button
                  type="button"
                  onClick={() => removeItem(setHardSkills, skill.id)}
                  className="text-indigo-300 hover:text-red-500 ml-1 opacity-50 group-hover:opacity-100 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
            {hardSkills.length === 0 && (
              <p className="text-gray-500 text-sm italic w-full text-center my-auto">
                Belum ada skill yang ditambahkan.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export function CertificateSection({
  certificates,
  setCertificates,
  addItem,
  updateItem,
  removeItem,
}: CertificateSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          Sertifikat / Penghargaan
        </h3>
        <button
          type="button"
          onClick={() =>
            addItem(setCertificates, { name: "", issuer: "", date: "" })
          }
          className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow hover:bg-yellow-600 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tambah Sertifikat
        </button>
      </div>

      <div className="space-y-3">
        {certificates.length === 0 && (
          <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
            Belum ada sertifikat.
          </div>
        )}
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm relative items-end md:items-center"
          >
            <div className="w-full md:flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Nama Sertifikat
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) =>
                  updateItem(setCertificates, cert.id, "name", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 py-1.5 px-3 focus:border-yellow-500 focus:ring-yellow-500 text-sm bg-white"
                placeholder="AWS Certified Developer"
              />
            </div>
            <div className="w-full md:flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Penerbit (Issuer)
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) =>
                  updateItem(setCertificates, cert.id, "issuer", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 py-1.5 px-3 focus:border-yellow-500 focus:ring-yellow-500 text-sm bg-white"
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="w-full md:w-32">
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                Bulan/Tahun
              </label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) =>
                  updateItem(setCertificates, cert.id, "date", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 py-1.5 px-3 focus:border-yellow-500 focus:ring-yellow-500 text-sm bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(setCertificates, cert.id)}
              className="absolute top-4 right-4 md:static md:ml-2 text-gray-400 hover:text-red-500 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LanguageSection({
  languages,
  setLanguages,
  addItem,
  updateItem,
  removeItem,
}: LanguageSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">Bahasa</h3>
        <button
          type="button"
          onClick={() =>
            addItem(setLanguages, { name: "", proficiency: "Pemula" })
          }
          className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg shadow hover:bg-teal-700 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tambah Bahasa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
            Belum ada bahasa yang ditambahkan.
          </div>
        )}
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm items-center"
          >
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={lang.name}
                onChange={(e) =>
                  updateItem(setLanguages, lang.id, "name", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 py-1.5 px-3 focus:border-teal-500 focus:ring-teal-500 text-sm bg-white"
                placeholder="e.g. Bahasa Inggris"
              />
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  updateItem(
                    setLanguages,
                    lang.id,
                    "proficiency",
                    e.target.value,
                  )
                }
                className="w-full rounded-md border border-gray-300 py-1.5 px-3 focus:border-teal-500 focus:ring-teal-500 text-sm bg-white"
              >
                <option value="Pemula">Pemula (Beginner)</option>
                <option value="Menengah">Menengah (Intermediate)</option>
                <option value="Mahir">Mahir (Advanced)</option>
                <option value="Fasih">Fasih / Native (Fluent)</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeItem(setLanguages, lang.id)}
              className="text-gray-400 hover:text-red-500 transition px-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// Main Component
// ============================================================================

const CVFormDynamic: React.FC<CVFormDynamicProps> = ({
  formType,
  onDataUpdate,
}) => {
  // --------------------------------------------------------------------------
  // State Initialization
  // --------------------------------------------------------------------------
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    profilePhoto: "",
    fullName: "",
    expectedPosition: "",
    email: "",
    phone: "",
    address: "",
  });
  const [summary, setSummary] = useState<string>("");
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [hardSkills, setHardSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [devices, setDevices] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  // --------------------------------------------------------------------------
  // Data Communication to Parent
  // --------------------------------------------------------------------------
  useEffect(() => {
    onDataUpdate({
      personalInfo,
      summary,
      education,
      experiences,
      hardSkills,
      softSkills,
      devices,
      certificates,
      languages,
    });
  }, [
    personalInfo,
    summary,
    education,
    experiences,
    hardSkills,
    softSkills,
    devices,
    certificates,
    languages,
    onDataUpdate,
  ]);

  // --------------------------------------------------------------------------
  // Event Handlers - Personal Info & Photo
  // --------------------------------------------------------------------------
  const handlePersonalInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPersonalInfo((prev) => ({
            ...prev,
            profilePhoto: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const removePhoto = useCallback(() => {
    setPersonalInfo((prev) => ({ ...prev, profilePhoto: "" }));
  }, []);

  // --------------------------------------------------------------------------
  // Generic Handlers for Dynamic Arrays
  // --------------------------------------------------------------------------
  const addItem = useCallback(
    <T extends BaseEntity>(
      setter: React.Dispatch<React.SetStateAction<T[]>>,
      defaultItem: Omit<T, "id">,
    ) => {
      setter((prev) => [...prev, { id: generateId(), ...defaultItem } as T]);
    },
    [],
  );

  const updateItem = useCallback(
    <T extends BaseEntity>(
      setter: React.Dispatch<React.SetStateAction<T[]>>,
      id: string,
      field: keyof T,
      value: any,
    ) => {
      setter((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback(
    <T extends BaseEntity>(
      setter: React.Dispatch<React.SetStateAction<T[]>>,
      id: string,
    ) => {
      setter((prev) => prev.filter((item) => item.id !== id));
    },
    [],
  );

  // --------------------------------------------------------------------------
  // Specific Handlers for Experience Tasks
  // --------------------------------------------------------------------------
  const addTask = useCallback((expId: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            tasks: [...exp.tasks, { id: generateId(), description: "" }],
          };
        }
        return exp;
      }),
    );
  }, []);

  const updateTask = useCallback(
    (expId: string, taskId: string, value: string) => {
      setExperiences((prev) =>
        prev.map((exp) => {
          if (exp.id === expId) {
            return {
              ...exp,
              tasks: exp.tasks.map((task) =>
                task.id === taskId ? { ...task, description: value } : task,
              ),
            };
          }
          return exp;
        }),
      );
    },
    [],
  );

  const removeTask = useCallback((expId: string, taskId: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            tasks: exp.tasks.filter((t) => t.id !== taskId),
          };
        }
        return exp;
      }),
    );
  }, []);

  // --------------------------------------------------------------------------
  // Visibility Logic Based on Form Type
  // --------------------------------------------------------------------------
  const showPhoto = formType === "Type 2";
  const showExpectedPosition = formType === "Type 2" || formType === "Type 3";

  // Skills Breakdown
  const showHardSoftDevices = formType === "Type 1";
  const showCombinedSkills = formType === "Type 2" || formType === "Type 3"; // Use hardSkills to store combined skills

  const showCertificates = formType === "Type 1" || formType === "Type 3";
  const showLanguages = formType === "Type 1" || formType === "Type 2";

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-xl space-y-10 border border-gray-100">
      {/* Header Form */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          CV Builder
        </h2>
        <p className="text-gray-500 mt-1">
          Lengkapi form berikut untuk memformat CV Anda secara otomatis (
          {formType}).
        </p>
      </div>

      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        {/* =======================================================================
            1. PERSONAL INFORMATION 
            ======================================================================= */}
        <PersonalInfoSection
          showPhoto={showPhoto}
          showExpectedPosition={showExpectedPosition}
          personalInfo={personalInfo}
          handlePersonalInfoChange={handlePersonalInfoChange}
          handlePhotoUpload={handlePhotoUpload}
          removePhoto={removePhoto}
        />

        {/* =======================================================================
            2. SUMMARY 
            ======================================================================= */}
        <SummarySection summary={summary} setSummary={setSummary} />

        {/* =======================================================================
            3. EXPERIENCES
            ======================================================================= */}
        <ExperienceSection
          experiences={experiences}
          setExperiences={setExperiences}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          addTask={addTask}
          updateTask={updateTask}
          removeTask={removeTask}
        />

        {/* =======================================================================
            4. EDUCATION
            ======================================================================= */}
        <EducationSection
          education={education}
          setEducation={setEducation}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
        />

        {/* =======================================================================
            5. SKILLS / PERANGKAT (Based on Form Type)
            ======================================================================= */}
        <SkillSection
          showHardSoftDevices={showHardSoftDevices}
          showCombinedSkills={showCombinedSkills}
          hardSkills={hardSkills}
          softSkills={softSkills}
          devices={devices}
          setHardSkills={setHardSkills}
          setSoftSkills={setSoftSkills}
          setDevices={setDevices}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
        />

        {/* =======================================================================
            6. CERTIFICATES
            ======================================================================= */}
        {showCertificates && (
          <CertificateSection
            certificates={certificates}
            setCertificates={setCertificates}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        )}

        {/* =======================================================================
            7. LANGUAGES
            ======================================================================= */}
        {showLanguages && (
          <LanguageSection
            languages={languages}
            setLanguages={setLanguages}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        )}
      </form>
    </div>
  );
};

export default CVFormDynamic;
