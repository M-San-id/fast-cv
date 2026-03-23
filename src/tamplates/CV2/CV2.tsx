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

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
  },
  header: {
    paddingBottom: 10,
    borderBottom: "2px",
    borderColor: "#000000",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
  },
  position: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  contactContainer: {
    flexDirection: "row",
  },
  contact: {
    fontSize: 11,
  },
  summary: {
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1px",
    borderColor: "#000000",
    paddingBottom: 5,
    marginBottom: 10,
  },
  section: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  skillRow: {
    flexDirection: "row",
    gap: 15,
  },
  itemSubtitle: {
    fontSize: 11,
  },
  itemDate: {
    fontSize: 11,
  },
  itemDescription: {
    fontSize: 11,
  },
  skillTag: {
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    width: 180,
  },
});

interface Cv2PDFProps {
  data: CVData;
}

export const Cv2PDF = ({ data }: Cv2PDFProps) => {
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
  const softSkills =
    data.softSkills.length > 0 ? data.softSkills : placeholderCVData.softSkills;
  const tools =
    data.devices.length > 0 ? data.devices : placeholderCVData.devices;
  const certificates =
    data.certificates.length > 0
      ? data.certificates
      : placeholderCVData.certificates;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {personalInfo.fullName || "Anna Croft"}
            </Text>
            <Text style={styles.position}>
              {personalInfo.expectedPosition || "Process Engineer"}
            </Text>
            <View style={styles.contactContainer}>
              <Text style={styles.contact}>
                {personalInfo.phone || "08123456789"} |{" "}
              </Text>
              <Text style={styles.contact}>
                {personalInfo.email || "budiono@gmail.com"} |{" "}
              </Text>
              <Text style={styles.contact}>
                {personalInfo.address ||
                  "Jl. Pegangsaan Timur No. 52, Jakarta Pusat"}
              </Text>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <View style={styles.summary}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ fontSize: 12 }}>{summary}</Text>
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((exp: Experience) => (
            <View key={exp.id} style={{ marginBottom: 6 }}>
              <Text style={styles.itemTitle}>
                {exp.position} - {exp.company}
              </Text>
              <Text style={styles.itemDate}>
                {exp.startDate} - {exp.endDate || "Present"}
              </Text>
              {exp.tasks.map((task) => (
                <Text key={task.id} style={styles.itemDescription}>
                  • {task.description}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Project Section */}
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
          <View style={styles.skillRow}>
            <View style={styles.skillTag}>
              <Text
                style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
              >
                Hard Skills
              </Text>
              {hardSkills.map((s: Skill) => (
                <Text key={s.id}>• {s.name}</Text>
              ))}
            </View>
            <View style={styles.skillTag}>
              <Text
                style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
              >
                Soft Skills
              </Text>
              {softSkills.map((s: Skill) => (
                <Text key={s.id}>• {s.name}</Text>
              ))}
            </View>
            <View style={styles.skillTag}>
              <Text
                style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
              >
                Tools
              </Text>
              {tools.map((s: Skill) => (
                <Text key={s.id}>• {s.name}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu: Education) => (
            <View key={edu.id} style={{ marginBottom: 6 }}>
              <View>
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

        {/* Certificate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificates</Text>
          {certificates.map((cert: Certificate) => (
            <View key={cert.id} style={{ marginBottom: 4 }}>
              <View>
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

export const Cv2Preview = ({ data }: { data: CVData }) => {
  return (
    <PDFViewer showToolbar={false} style={{ width: "100%", height: "100%" }}>
      <Cv2PDF data={data} />
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
  ] as Skill[],
  softSkills: [
    { id: "placeholder-ss-1", name: "Communication" },
    { id: "placeholder-ss-2", name: "Teamwork" },
    { id: "placeholder-ss-3", name: "Problem Solving" },
  ] as Skill[],
  devices: [
    { id: "placeholder-d-1", name: "Laptop" },
    { id: "placeholder-d-2", name: "Smartphone" },
    { id: "placeholder-d-3", name: "Tablet" },
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
