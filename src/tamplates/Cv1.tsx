import { useState, useCallback } from "react";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import CVFormDynamic, {
  type CVData,
  type Education,
  type Experience,
  type Project,
  type Skill,
  type Certificate,
} from "../component/form/CvFromDynamic";
import { Download } from "lucide-react";

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
  },
  header: {
    borderColor: "#000",
    padding: "1cm",
    gap: 10,
    justifyContent: "space-between",
  },
  name: {
    textAlign: "center",
    fontSize: 36,
    width: "100%",
  },
  position: {
    textAlign: "center",
    fontSize: 18,
    width: "100%",
  },
  divider: {
    borderColor: "#278067",
    borderWidth: 1,
    width: "100%",
  },

  personalInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  summary: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    textAlign: "center",
  },

  contact: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 100,
    fontSize: 12,
  },
  contactCard: {
    maxWidth: 150,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 16,
    color: "#278067",
    fontWeight: "bold",
  },

  itemRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },

  itemSubtitle: {
    fontSize: 11,
    color: "#555",
  },

  itemDate: {
    fontSize: 10,
    color: "#777",
  },

  itemDescription: {
    fontSize: 10,
    color: "#333",
    marginLeft: 10,
  },

  skillTag: {
    fontSize: 10,
    color: "#333",
  },
});

interface Cv1PDFProps {
  data: CVData;
}

export const Cv1PDF = ({ data }: Cv1PDFProps) => {
  const { personalInfo } = data;

  const summary = data.summary || placeholderCVData.summary;
  const education =
    data.education.length > 0 ? data.education : placeholderCVData.education;
  const experiences =
    data.experiences.length > 0
      ? data.experiences
      : placeholderCVData.experiences;
  const projects =
    data.projects.length > 0 ? data.projects : placeholderCVData.projects;
  const hardSkills =
    data.hardSkills.length > 0 ? data.hardSkills : placeholderCVData.hardSkills;
  const certificates =
    data.certificates.length > 0
      ? data.certificates
      : placeholderCVData.certificates;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Budiono Siregar"}
          </Text>
          <Text style={styles.position}>
            {personalInfo.expectedPosition || "Human Resource"}
          </Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.personalInfo}>
          <View style={styles.summary}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Professional Summary
            </Text>
            <Text style={{ fontSize: 12 }}>{summary}</Text>
          </View>
          <View style={styles.contact}>
            <View style={styles.contactCard}>
              <Text style={{ fontWeight: "bold", color: "#278067" }}>
                Phone
              </Text>
              <Text>{personalInfo.phone || "08123456789"}</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={{ fontWeight: "bold", color: "#278067" }}>
                Email
              </Text>
              <Text>{personalInfo.email || "budiono@gmail.com"}</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={{ fontWeight: "bold", color: "#278067" }}>
                Address
              </Text>
              <Text>
                {personalInfo.address ||
                  "Jl. Pegangsaan Timur No. 52, Jakarta Pusat"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu: Education) => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>{edu.institution}</Text>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>
                {edu.degree} {edu.field ? `- ${edu.field}` : ""}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((exp: Experience) => (
            <View key={exp.id} style={{ marginBottom: 6 }}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>
                  {exp.position} - {exp.company}
                </Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || "Sekarang"}
                </Text>
              </View>
              {exp.tasks.map((task) => (
                <Text key={task.id} style={styles.itemDescription}>
                  • {task.description}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project</Text>
          {projects.map((proj: Project) => (
            <View key={proj.id} style={{ marginBottom: 0 }}>
              <View>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                <Text style={styles.itemDate}>{proj.year}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{proj.description}</Text>
              {proj.details.map((detail) => (
                <Text key={detail.id} style={styles.itemDescription}>
                  • {detail.description}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View>
            <Text style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}>
              Skills
            </Text>
            <Text style={styles.skillTag}>
              {hardSkills
                .map((s: Skill) => s.name)
                .filter(Boolean)
                .join(", ")}
            </Text>
          </View>
        </View>

        {/* Certificate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificates</Text>
          {certificates.map((cert: Certificate) => (
            <View key={cert.id} style={{ marginBottom: 4 }}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>{cert.name}</Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
              {cert.issuer && (
                <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const previewStyles = {
  page: {
    padding: "1cm",
  } as React.CSSProperties,
  header: {
    borderColor: "#000",
    padding: "1cm",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 10,
    justifyContent: "space-between" as const,
  },
  name: {
    textAlign: "center" as const,
    fontSize: 36,
    width: "100%",
    margin: 0,
  },
  position: {
    textAlign: "center" as const,
    fontSize: 18,
    width: "100%",
    margin: 0,
  },
  divider: {
    borderColor: "#278067",
    borderWidth: 1,
    borderStyle: "solid" as const,
    width: "100%",
  },
  personalInfo: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 20,
  },
  summary: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 5,
    textAlign: "center" as const,
  },
  contact: {
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "space-evenly" as const,
    gap: 100,
    fontSize: 11,
  },
  contactCard: {
    maxWidth: 150,
  },
  section: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#278067",
    fontWeight: "bold" as const,
    margin: 0,
  },
  itemRow: {
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold" as const,
    margin: 0,
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#555",
    margin: 0,
  },
  itemDate: {
    fontSize: 11,
    color: "#777",
    margin: 0,
  },
  itemDescription: {
    fontSize: 11,
    color: "#333",
    marginLeft: 10,
    margin: 0,
    marginTop: 2,
  },
  skillTag: {
    fontSize: 11,
    color: "#333",
    margin: 0,
  },
};

export const Cv1Preview = ({ data }: { data: CVData }) => {
  const { personalInfo } = data;

  const summary = data.summary || placeholderCVData.summary;
  const education =
    data.education.length > 0 ? data.education : placeholderCVData.education;
  const experiences =
    data.experiences.length > 0
      ? data.experiences
      : placeholderCVData.experiences;
  const projects =
    data.projects.length > 0 ? data.projects : placeholderCVData.projects;
  const hardSkills =
    data.hardSkills.length > 0 ? data.hardSkills : placeholderCVData.hardSkills;
  const certificates =
    data.certificates.length > 0
      ? data.certificates
      : placeholderCVData.certificates;

  return (
    <div className="flex items-center justify-center min-h-screen rounded-2xl bg-gray-100 py-10">
      <div
        className="bg-white w-[210mm] h-[297mm] scale-[1] origin-center shadow-lg shadow-indigo-300 hover:shadow-xl hover:shadow-indigo-400 transition-shadow"
        style={previewStyles.page}
      >
        <div style={previewStyles.header}>
          <p style={previewStyles.name}>
            {personalInfo.fullName || "Budiono Siregar"}
          </p>
          <p style={previewStyles.position}>
            {personalInfo.expectedPosition || "Human Resource"}
          </p>
          <div style={previewStyles.divider}></div>
        </div>
        <div style={previewStyles.personalInfo}>
          <div style={previewStyles.summary}>
            <p style={{ fontSize: 14, fontWeight: "bold", margin: 0 }}>
              Professional Summary
            </p>
            <p style={{ fontSize: 12, margin: 0 }}>
              {summary ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt orci vel tellus varius varius. Etiam elementum leo dolor, at mattis felis rhoncus eu. Mauris vel neque id lorem tristique."}
            </p>
          </div>
          <div style={previewStyles.contact}>
            <div style={previewStyles.contactCard}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#278067",
                  margin: 0,
                }}
              >
                Phone
              </p>
              <p style={{ margin: 0 }}>{personalInfo.phone || "08123456789"}</p>
            </div>

            <div style={previewStyles.contactCard}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#278067",
                  margin: 0,
                }}
              >
                Email
              </p>
              <p style={{ margin: 0 }}>
                {personalInfo.email || "budiono@gmail.com"}
              </p>
            </div>

            <div style={previewStyles.contactCard}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#278067",
                  margin: 0,
                }}
              >
                Address
              </p>
              <p style={{ margin: 0 }}>
                {personalInfo.address ||
                  "Jl. Pegangsaan Timur No. 52, Jakarta Pusat"}
              </p>
            </div>
          </div>
        </div>

        <div style={previewStyles.section}>
          <p style={previewStyles.sectionTitle}>Education</p>
          {education.map((edu: Education) => (
            <div key={edu.id} style={{ marginBottom: 6 }}>
              <div style={previewStyles.itemRow}>
                <p style={previewStyles.itemTitle}>
                  {edu.institution || "Institusi"}
                </p>
                <p style={previewStyles.itemDate}>
                  {edu.startDate} - {edu.endDate || "Sekarang"}
                </p>
              </div>
              <p style={previewStyles.itemSubtitle}>
                {edu.degree} {edu.field ? `- ${edu.field}` : ""}
              </p>
            </div>
          ))}
        </div>

        <div style={previewStyles.section}>
          <p style={previewStyles.sectionTitle}>Experience</p>
          {experiences.map((exp: Experience) => (
            <div key={exp.id} style={{ marginBottom: 6 }}>
              <div style={previewStyles.itemRow}>
                <p style={previewStyles.itemTitle}>
                  {exp.position || "Posisi"} – {exp.company || "Perusahaan"}
                </p>
                <p style={previewStyles.itemDate}>
                  {exp.startDate} – {exp.endDate || "Sekarang"}
                </p>
              </div>
              {exp.tasks.map((task) => (
                <p key={task.id} style={previewStyles.itemDescription}>
                  • {task.description}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div style={previewStyles.section}>
          <p style={previewStyles.sectionTitle}>Project</p>
          {projects.map((proj: Project) => (
            <div key={proj.id} style={{ marginBottom: 0 }}>
              <div>
                <p style={previewStyles.itemTitle}>
                  {proj.name || "Wiwok de Tok"}
                </p>
                <p style={previewStyles.itemDate}>{proj.year}</p>
              </div>
              <p style={previewStyles.itemSubtitle}>{proj.description}</p>
              {proj.details.map((detail) => (
                <p key={detail.id} style={previewStyles.itemDescription}>
                  • {detail.description}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div style={previewStyles.section}>
          <p style={previewStyles.sectionTitle}>Skills</p>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 2,
                margin: 0,
              }}
            >
              Skills
            </p>
            <p style={previewStyles.skillTag}>
              {hardSkills
                .map((s: Skill) => s.name)
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>

        {/* Certificate Section */}
        <div style={previewStyles.section}>
          <p style={previewStyles.sectionTitle}>Certificates</p>
          {certificates.map((cert: Certificate) => (
            <div key={cert.id} style={{ marginBottom: 4 }}>
              <div style={previewStyles.itemRow}>
                <p style={previewStyles.itemTitle}>{cert.name}</p>
                <p style={previewStyles.itemDate}>{cert.date}</p>
              </div>
              {cert.issuer && (
                <p style={previewStyles.itemSubtitle}>{cert.issuer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const placeholderCVData = {
  summary:
    "Profesional berpengalaman dengan keahlian dalam pengembangan perangkat lunak dan manajemen proyek. Memiliki rekam jejak yang kuat dalam membangun aplikasi web modern dan memimpin tim pengembang. Bersemangat dalam menciptakan solusi teknologi yang inovatif dan berdampak.",
  education: [
    {
      id: "placeholder-edu-1",
      institution: "Universitas Indonesia",
      degree: "S1",
      field: "Ilmu Komputer",
      startDate: "2018-08",
      endDate: "2022-07",
      description: "",
    },
    {
      id: "placeholder-edu-2",
      institution: "SMA Negeri 1 Jakarta",
      degree: "SMA",
      field: "IPA",
      startDate: "2015-07",
      endDate: "2018-06",
      description: "",
    },
  ] as Education[],
  experiences: [
    {
      id: "placeholder-exp-1",
      type: "Work" as const,
      company: "PT Teknologi Nusantara",
      position: "Frontend Developer",
      startDate: "2022-08",
      endDate: "",
      tasks: [
        {
          id: "placeholder-task-1",
          description:
            "Mengembangkan dan memelihara aplikasi web menggunakan React dan TypeScript",
        },
        {
          id: "placeholder-task-2",
          description:
            "Berkolaborasi dengan tim desain untuk mengimplementasikan UI/UX yang responsif",
        },
        {
          id: "placeholder-task-3",
          description:
            "Melakukan code review dan mentoring untuk developer junior",
        },
      ],
    },
    {
      id: "placeholder-exp-2",
      type: "Work" as const,
      company: "Startup Digital Indonesia",
      position: "Web Developer Intern",
      startDate: "2021-06",
      endDate: "2022-06",
      tasks: [
        {
          id: "placeholder-task-4",
          description:
            "Membangun fitur-fitur baru pada platform e-commerce perusahaan",
        },
        {
          id: "placeholder-task-5",
          description:
            "Mengoptimasi performa website yang meningkatkan kecepatan loading 40%",
        },
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "placeholder-proj-1",
      name: "Sistem Manajemen Inventaris",
      year: "2023",
      description:
        "Aplikasi web full-stack untuk mengelola inventaris gudang secara real-time",
      details: [
        {
          id: "placeholder-detail-1",
          description:
            "Menggunakan React, Node.js, dan PostgreSQL sebagai tech stack utama",
        },
        {
          id: "placeholder-detail-2",
          description:
            "Implementasi fitur barcode scanning dan notifikasi stok otomatis",
        },
      ],
    },
    {
      id: "placeholder-proj-2",
      name: "Aplikasi Booking Lapangan Olahraga",
      year: "2022",
      description:
        "Platform pemesanan lapangan olahraga online dengan sistem pembayaran terintegrasi",
      details: [
        {
          id: "placeholder-detail-3",
          description: "Membangun REST API dan integrasi payment gateway",
        },
      ],
    },
  ] as Project[],
  hardSkills: [
    { id: "placeholder-hs-1", name: "React" },
    { id: "placeholder-hs-2", name: "TypeScript" },
    { id: "placeholder-hs-3", name: "Node.js" },
    { id: "placeholder-hs-4", name: "PostgreSQL" },
    { id: "placeholder-hs-5", name: "Git" },
    { id: "placeholder-hs-6", name: "Tailwind CSS" },
  ] as Skill[],

  certificates: [
    {
      id: "placeholder-cert-1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023-05",
    },
    {
      id: "placeholder-cert-2",
      name: "Meta Front-End Developer Certificate",
      issuer: "Meta (Coursera)",
      date: "2022-12",
    },
  ] as Certificate[],
};

const defaultCVData: CVData = {
  personalInfo: {
    profilePhoto: "",
    fullName: "",
    expectedPosition: "",
    email: "",
    phone: "",
    address: "",
  },
  summary: "",
  education: [],
  experiences: [],
  hardSkills: [],
  softSkills: [],
  devices: [],
  certificates: [],
  languages: [],
  projects: [],
};

export default function Cv1() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);

  const handleDataUpdate = useCallback((data: CVData) => {
    setCvData(data);
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-20 gap-10 mb-50">
      <div className="max-h-screen overflow-y-scroll no-scrollbar flex-1">
        <CVFormDynamic formType="Type 3" onDataUpdate={handleDataUpdate} />
        <div className="flex justify-center bg-white">
          <PDFDownloadLink
            document={<Cv1PDF data={cvData} />}
            fileName={`${cvData.personalInfo.fullName}-CV.pdf`}
          >
            <button
              className="bg-blue-50 text-center w-100 rounded-2xl h-14 relative text-black text-lg font-semibold group"
              type="button"
            >
              <div className="bg-blue-400 rounded-xl h-12 w-1/6 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-98 z-10 hover:shadow-2xl hover:shadow-blue-500 duration-500">
                <Download />
              </div>
              <p>Download</p>
            </button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="max-h-screen max-w-1/2 flex-1">
        <Cv1Preview data={cvData} />
      </div>
    </div>
  );
}
