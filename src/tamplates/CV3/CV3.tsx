import {
  Document,
  Image,
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
  Language,
} from "../../component/form/CvFromDynamic";
import YoungMan from "../../assets/dummy-image/formal-young-man.jpg";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  // section styles
  leftSide: {
    width: "40%",
    padding: "1cm",
    height: "100%",
    backgroundColor: "#323b4c",
    color: "white",
  },
  rightSide: {
    width: "60%",
    padding: "1cm",
    height: "100%",
  },
  firstSection: {
    height: "27%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  secondSection: {
    height: "15%",
    fontSize: 12,
  },
  thirdSection: {
    height: "20%",
    fontSize: 12,
  },
  fourthSection: {
    height: "25%",
    fontSize: 12,
  },
  fifthSection: {
    height: "10%",
    fontSize: 12,
  },
  // image styles

  photoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#3e4d69",
    alignSelf: "center",
  },
  profilePhoto: {
    borderRadius: 100,
    objectFit: "cover",
  },

  // text styles
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottom: "2px solid #3e4d69",
    marginBottom: 6,
    paddingBottom: 6,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 2,
  },
  itemDate: {
    fontSize: 12,
    margin: 3,
  },
  itemSubtitle: {
    fontSize: 12,
    margin: 3,
  },
  // specific styles
  name: {
    fontSize: 42,
    fontWeight: "bold",
  },
  position: {
    fontSize: 24,
  },
  location: {
    fontSize: 12,
  },
  itemDescription: {
    margin: 3,
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 12,
  },
});

interface Cv3PDFProps {
  data: CVData;
}

export const Cv3PDF = ({ data }: Cv3PDFProps) => {
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
  const languages =
    data.languages.length > 0 ? data.languages : placeholderCVData.languages;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left side */}
        <View style={styles.leftSide}>
          {/* Hedaer (left) */}
          <View style={styles.firstSection}>
            <View style={styles.photoContainer}>
              <Image
                src={personalInfo.profilePhoto || YoungMan}
                style={styles.profilePhoto}
              />
            </View>
          </View>
          {/* Contact */}
          <View style={styles.secondSection}>
            <View style={styles.sectionTitle}>
              <Text>Contact</Text>
            </View>
            <View style={styles.contactContainer}>
              <Text>• {personalInfo.email || "example@gmail.com"}</Text>
              <Text>• {personalInfo.phone || "08123456789"}</Text>
              <Text>{personalInfo.address}</Text>
            </View>
          </View>
          {/* Education */}
          <View style={styles.thirdSection}>
            <View style={styles.sectionTitle}>
              <Text>Education</Text>
            </View>
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
          {/* Skills */}
          <View style={styles.fourthSection}>
            <View style={styles.sectionTitle}>
              <Text>Skills</Text>
            </View>
            {hardSkills.map((skill: Skill) => (
              <View key={skill.id} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{skill.name}</Text>
              </View>
            ))}
          </View>
          {/* Language */}
          <View style={styles.fifthSection}>
            <View style={styles.sectionTitle}>
              <Text>Language</Text>
            </View>
            {languages.map((language: Language) => (
              <View key={language.id} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{language.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Right side */}
        <View style={styles.rightSide}>
          {/* Header (right) */}
          <View style={styles.firstSection}>
            <Text style={styles.name}>
              {personalInfo.fullName || "Rizky Febian"}
            </Text>
            <Text style={styles.position}>
              {personalInfo.expectedPosition || "Senior Administrator"}
            </Text>
          </View>
          {/* Summary */}
          <View style={styles.secondSection}>
            <View style={styles.sectionTitle}>
              <Text>Summary</Text>
            </View>
            <Text>{summary}</Text>
          </View>
          {/* Experience */}
          <View style={styles.thirdSection}>
            <View style={styles.sectionTitle}>
              <Text>Experience</Text>
            </View>
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
          {/* Projects */}
          <View style={styles.fourthSection}>
            <View style={styles.sectionTitle}>
              <Text>Projects</Text>
            </View>
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
          {/* Certificates */}
          <View style={styles.fifthSection}>
            <View style={styles.sectionTitle}>
              <Text>Certificates</Text>
            </View>
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
        </View>
      </Page>
    </Document>
  );
};

export const Cv3Preview = ({ data }: { data: CVData }) => {
  return (
    <PDFViewer showToolbar={false} style={{ width: "100%", height: "100%" }}>
      <Cv3PDF data={data} />
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
      field: "Bisnis",
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
      id: "admin-exp-1",
      type: "Work" as const,
      company: "PT Teknologi Nusantara",
      position: "Senior Office Administrator",
      startDate: "2022-08",
      endDate: "", // Present
      tasks: [
        {
          id: "admin-task-1",
          description:
            "Mengelola operasional harian kantor dan mengawasi koordinasi antar departemen untuk memastikan efisiensi alur kerja.",
        },
        {
          id: "admin-task-2",
          description:
            "Menyusun kebijakan administratif perusahaan serta mengelola anggaran operasional tahunan untuk optimalisasi pengeluaran.",
        },
      ],
    },
  ] as Experience[],

  projects: [
    {
      id: "admin-proj-1",
      name: "Digitalisasi Sistem Administrasi Terpadu",
      year: "2023",
      description:
        "Transformasi proses administrasi manual ke platform digital untuk mempercepat birokrasi internal.",
      details: [
        {
          id: "admin-detail-1",
          description:
            "Memimpin migrasi seluruh arsip fisik ke sistem manajemen dokumen berbasis cloud dengan standar keamanan tinggi.",
        },
        {
          id: "admin-detail-2",
          description:
            "Implementasi sistem persetujuan otomatis (E-Approval) yang mengurangi waktu pemrosesan dokumen hingga 50%.",
        },
      ],
    },
  ] as Project[],

  hardSkills: [
    { id: "admin-hs-1", name: "Strategic Planning" },
    { id: "admin-hs-2", name: "Budget Management" },
    { id: "admin-hs-3", name: "Enterprise Resource Planning (ERP)" },
  ] as Skill[],

  certificates: [
    {
      id: "admin-cert-1",
      name: "Certified Administrative Professional (CAP)",
      issuer: "International Association of Administrative Professionals",
      date: "2023-05",
    },
  ] as Certificate[],
  languages: [
    {
      id: "placeholder-lang-1",
      name: "English",
      proficiency: "Fluent",
    },
    {
      id: "placeholder-lang-2",
      name: "Indonesian",
      proficiency: "Native",
    },
  ] as Language[],
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
