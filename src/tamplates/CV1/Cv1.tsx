import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type {
  CVData,
  Education,
  Experience,
  Project,
  Skill,
  Certificate,
} from "../../component/form/CvFromDynamic";

import "./style.css";

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
            {personalInfo.expectedPosition || "Software Engineer"}
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

export const Cv1Preview = ({ data }: { data: CVData }) => {
  return (
    <PDFViewer showToolbar={false} style={{ width: "100%", height: "100%" }}>
      <Cv1PDF data={data} />
    </PDFViewer>
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
  ] as Certificate[],
};

export const defaultCVData: CVData = {
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
