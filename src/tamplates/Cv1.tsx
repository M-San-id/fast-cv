import { useState, useCallback } from "react";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
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
  type Language,
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
    languages,
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
            <Text style={{ fontSize: 12 }}>
              {summary ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt orci vel tellus varius varius. Etiam elementum leo dolor, at mattis felis rhoncus eu. Mauris vel neque id lorem tristique."}
            </Text>
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
                <Text style={styles.itemTitle}>
                  {edu.institution || "Institusi"}
                </Text>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate || "Sekarang"}
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project</Text>
          {projects.map((proj: Project) => (
            <View key={proj.id} style={{ marginBottom: 0 }}>
              <Text>{proj.name || "Wiwok de Tok"}</Text>
              <Text>{proj.year}</Text>
              <Text>{proj.description}</Text>
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
  projects: [],
};

export default function Cv1() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);

  const handleDataUpdate = useCallback((data: CVData) => {
    setCvData(data);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <CVFormDynamic formType="Type 3" onDataUpdate={handleDataUpdate} />
      <div className="flex justify-center bg-white">
        <PDFDownloadLink document={<Cv1PDF data={cvData} />} fileName="cv.pdf">
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
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Cv1PDF data={cvData} />
      </PDFViewer>
    </div>
  );
}
