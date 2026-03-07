import { useState, useCallback } from "react";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import CVFormDynamic, {
  type CVData,
  type Experience,
  type Education,
  type Skill,
  type Language,
} from "../component/form/CvFromDynamic";

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
    hardSkills,
    softSkills,
    languages,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header: Name & Position */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Nama Lengkap"}
          </Text>
          <Text style={styles.position}>
            {personalInfo.expectedPosition || "Posisi"}
          </Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.personalInfo}>
          {/* Summary */}
          {summary ? (
            <View style={styles.summary}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Professional Summary
              </Text>
              <Text style={{ fontSize: 12 }}>{summary}</Text>
            </View>
          ) : null}

          {/* Contact Info */}
          <View style={styles.contact}>
            {personalInfo.phone ? (
              <View style={styles.contactCard}>
                <Text style={{ fontWeight: "bold", color: "#278067" }}>
                  Phone
                </Text>
                <Text>{personalInfo.phone}</Text>
              </View>
            ) : null}
            {personalInfo.email ? (
              <View style={styles.contactCard}>
                <Text style={{ fontWeight: "bold", color: "#278067" }}>
                  Email
                </Text>
                <Text>{personalInfo.email}</Text>
              </View>
            ) : null}
            {personalInfo.address ? (
              <View style={styles.contactCard}>
                <Text style={{ fontWeight: "bold", color: "#278067" }}>
                  Address
                </Text>
                <Text>{personalInfo.address}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Education Section */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu: Education) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>
                    {edu.institution || "Institusi"}
                  </Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} – {edu.endDate || "Sekarang"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {edu.degree} {edu.field ? `- ${edu.field}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experiences.map((exp: Experience) => (
              <View key={exp.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>
                    {exp.position || "Posisi"} – {exp.company || "Perusahaan"}
                  </Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} – {exp.endDate || "Sekarang"}
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
        )}

        {/* Skills Section */}
        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {hardSkills.length > 0 && (
              <View>
                <Text
                  style={{ fontSize: 11, fontWeight: "bold", marginBottom: 2 }}
                >
                  Hard Skills
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

        {/* Language Section */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang: Language) => (
              <Text key={lang.id} style={styles.skillTag}>
                {lang.name} {lang.proficiency ? `(${lang.proficiency})` : ""}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
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
};

export default function Cv1() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);

  const handleDataUpdate = useCallback((data: CVData) => {
    setCvData(data);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <CVFormDynamic formType="Type 2" onDataUpdate={handleDataUpdate} />
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Cv1PDF data={cvData} />
      </PDFViewer>
    </div>
  );
}
