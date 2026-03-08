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
  const {
    personalInfo,
    summary,
    education,
    experiences,
    projects,
    hardSkills,
    softSkills,
    certificates,
  } = data;

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
              <Text>{personalInfo.phone}</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={{ fontWeight: "bold", color: "#278067" }}>
                Email
              </Text>
              <Text>{personalInfo.email}</Text>
            </View>

            <View style={styles.contactCard}>
              <Text style={{ fontWeight: "bold", color: "#278067" }}>
                Address
              </Text>
              <Text>{personalInfo.address}</Text>
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
        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {hardSkills.length > 0 && (
              <View>
                <Text
                  style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
                >
                  Skills
                </Text>
                <Text style={styles.skillTag}>
                  {hardSkills
                    .map((s: Skill) => s.name)
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            )}
            {softSkills.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text
                  style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
                >
                  Soft Skills
                </Text>
                <Text style={styles.skillTag}>
                  {softSkills
                    .map((s: Skill) => s.name)
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Certificate Section */}
        {certificates.length > 0 && (
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
        )}
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
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: "bold" as const,
    margin: 0,
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#555",
    margin: 0,
  },
  itemDate: {
    fontSize: 10,
    color: "#777",
    margin: 0,
  },
  itemDescription: {
    fontSize: 10,
    color: "#333",
    marginLeft: 10,
    margin: 0,
    marginTop: 2,
  },
  skillTag: {
    fontSize: 10,
    color: "#333",
    margin: 0,
  },
};

export const Cv1Preview = ({ data }: { data: CVData }) => {
  const {
    personalInfo,
    summary,
    education,
    experiences,
    projects,
    hardSkills,
    softSkills,
    certificates,
  } = data;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
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
              <p style={{ fontWeight: "bold", color: "#278067", margin: 0 }}>
                Phone
              </p>
              <p style={{ margin: 0 }}>{personalInfo.phone || "08123456789"}</p>
            </div>

            <div style={previewStyles.contactCard}>
              <p style={{ fontWeight: "bold", color: "#278067", margin: 0 }}>
                Email
              </p>
              <p style={{ margin: 0 }}>
                {personalInfo.email || "budiono@gmail.com"}
              </p>
            </div>

            <div style={previewStyles.contactCard}>
              <p style={{ fontWeight: "bold", color: "#278067", margin: 0 }}>
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
        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <div style={previewStyles.section}>
            <p style={previewStyles.sectionTitle}>Skills</p>
            {hardSkills.length > 0 && (
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
            )}
            {softSkills.length > 0 && (
              <div style={{ marginTop: 4 }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    marginBottom: 2,
                    margin: 0,
                  }}
                >
                  Soft Skills
                </p>
                <p style={previewStyles.skillTag}>
                  {softSkills
                    .map((s: Skill) => s.name)
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Certificate Section */}
        {certificates.length > 0 && (
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
        )}
      </div>
    </div>
  );
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
      </div>
      <div className="max-h-screen max-w-1/2 flex-1">
        <Cv1Preview data={cvData} />
        <div className="flex justify-center bg-white">
          <PDFDownloadLink
            document={<Cv1PDF data={cvData} />}
            fileName={`${cvData.personalInfo.fullName}-CV.pdf`}
          >
            <button
              className="bg-blue-50 text-center w-48 rounded-2xl h-14 relative text-black text-lg font-semibold group"
              type="button"
            >
              <div className="bg-blue-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                <Download />
              </div>
              <p>Download</p>
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
