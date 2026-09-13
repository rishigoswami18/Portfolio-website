import { useState } from "react";
import { defaultPortfolio, usePortfolio } from "../data/PortfolioContext";

const styles = {
  page: { minHeight: "100vh", padding: "40px 6vw", background: "#0b0d14", color: "#f2f3f4", fontFamily: "Inter, ui-sans-serif, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 28 },
  title: { margin: 0, fontSize: "clamp(28px, 5vw, 52px)" },
  muted: { color: "#9da3b4", marginTop: 8 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, alignItems: "start" },
  section: { background: "#131722", border: "1px solid #2b3142", borderRadius: 12, padding: 20, marginBottom: 18 },
  sectionTitle: { margin: "0 0 16px", fontSize: 20 },
  field: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 },
  label: { color: "#aeb6c9", fontSize: 13, fontWeight: 700 },
  input: { width: "100%", boxSizing: "border-box", padding: "11px 12px", border: "1px solid #343b4e", borderRadius: 7, background: "#0d1018", color: "#f2f3f4", font: "inherit" },
  textarea: { minHeight: 90, resize: "vertical" },
  button: { border: 0, borderRadius: 7, padding: "11px 16px", cursor: "pointer", fontWeight: 700, background: "#854CE6", color: "white" },
  secondary: { background: "#252b3a" },
  danger: { background: "#7d3045" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 },
  item: { borderTop: "1px solid #2b3142", paddingTop: 16, marginTop: 16 },
};

function Field({ label, value, onChange, multiline = false, type = "text" }) {
  const props = { value: value ?? "", onChange: (event) => onChange(event.target.value), type, style: { ...styles.input, ...(multiline ? styles.textarea : {}) } };
  return <label style={styles.field}><span style={styles.label}>{label}</span>{multiline ? <textarea {...props} /> : <input {...props} />}</label>;
}

function splitLines(value) {
  return value.split("\n").map((line) => {
    const [name, image = ""] = line.split("|");
    return { name: name.trim(), image: image.trim() };
  }).filter((item) => item.name);
}

export default function AdminPanel() {
  const { portfolio, savePortfolio, resetPortfolio } = usePortfolio();
  const [draft, setDraft] = useState(() => structuredClone(portfolio));
  const [message, setMessage] = useState("");

  const update = (section, key, value) => setDraft((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const updateItem = (section, index, key, value) => setDraft((current) => ({ ...current, [section]: current[section].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item) }));
  const removeItem = (section, index) => setDraft((current) => ({ ...current, [section]: current[section].filter((_, itemIndex) => itemIndex !== index) }));
  const addItem = (section, item) => setDraft((current) => ({ ...current, [section]: [...current[section], item] }));

  const save = (event) => {
    event.preventDefault();
    savePortfolio(draft);
    setMessage("Changes saved");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    const clean = structuredClone(defaultPortfolio);
    resetPortfolio();
    setDraft(clean);
    setMessage("Restored original content");
  };

  return (
    <main style={styles.page}>
      <form onSubmit={save}>
        <div style={styles.header}>
          <div><h1 style={styles.title}>Portfolio settings</h1><p style={styles.muted}>Fill in the fields below, then save your changes.</p></div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ color: "#75d6a4" }}>{message}</span><button type="button" style={{ ...styles.button, ...styles.secondary }} onClick={() => { window.location.hash = ""; }}>View portfolio</button><button style={styles.button}>Save changes</button></div>
        </div>

        <section style={styles.section}><h2 style={styles.sectionTitle}>Profile</h2><div style={styles.grid}>
          <Field label="Name" value={draft.bio.name} onChange={(value) => update("bio", "name", value)} />
          <Field label="Roles (one per line)" multiline value={draft.bio.roles?.join("\n")} onChange={(value) => update("bio", "roles", value.split("\n").filter(Boolean))} />
          <Field label="Profile description" multiline value={draft.bio.description} onChange={(value) => update("bio", "description", value)} />
          {Object.entries(draft.bio).filter(([key]) => ["github", "resume", "linkedin", "twitter", "insta", "facebook"].includes(key)).map(([key, value]) => <Field key={key} label={key} value={value} onChange={(next) => update("bio", key, next)} />)}
        </div></section>

        <section style={styles.section}><h2 style={styles.sectionTitle}>Theme colors</h2><div style={styles.grid}>{Object.entries(draft.theme).map(([key, value]) => <Field key={key} label={key} value={value} onChange={(next) => update("theme", key, next)} />)}</div></section>

        <section style={styles.section}><h2 style={styles.sectionTitle}>Section headings and descriptions</h2><div style={styles.grid}>{Object.entries(draft.sections).map(([key, section]) => <div key={key} style={styles.item}><h3 style={{ textTransform: "capitalize" }}>{key}</h3><Field label="Heading" value={section.title} onChange={(value) => setDraft((current) => ({ ...current, sections: { ...current.sections, [key]: { ...section, title: value } } }))} /><Field label="Description" multiline value={section.description} onChange={(value) => setDraft((current) => ({ ...current, sections: { ...current.sections, [key]: { ...section, description: value } } }))} /></div>)}</div></section>

        <section style={styles.section}><div style={styles.row}><h2 style={styles.sectionTitle}>Projects</h2><button type="button" style={styles.button} onClick={() => addItem("projects", { id: Date.now(), title: "New project", date: "", description: "", image: "", tags: [], category: "web app", github: "", webapp: "" })}>Add project</button></div>{draft.projects.map((project, index) => <div key={project.id ?? index} style={styles.item}><div style={styles.row}><strong>Project {index + 1}</strong><button type="button" style={{ ...styles.button, ...styles.danger }} onClick={() => removeItem("projects", index)}>Remove</button></div><div style={styles.grid}>{["title", "date", "image", "github", "webapp", "category"].map((key) => <Field key={key} label={key} value={project[key]} onChange={(value) => updateItem("projects", index, key, value)} />)}<Field label="Description" multiline value={project.description} onChange={(value) => updateItem("projects", index, "description", value)} /><Field label="Tags (comma separated)" value={project.tags?.join(", ")} onChange={(value) => updateItem("projects", index, "tags", value.split(",").map((tag) => tag.trim()).filter(Boolean))} /></div></div>)}</section>

        <section style={styles.section}><div style={styles.row}><h2 style={styles.sectionTitle}>Skills</h2><button type="button" style={styles.button} onClick={() => addItem("skills", { title: "New category", skills: [] })}>Add category</button></div>{draft.skills.map((group, index) => <div key={index} style={styles.item}><div style={styles.row}><Field label="Category name" value={group.title} onChange={(value) => updateItem("skills", index, "title", value)} /><button type="button" style={{ ...styles.button, ...styles.danger }} onClick={() => removeItem("skills", index)}>Remove</button></div><Field label="Skills (one per line: name | image URL)" multiline value={group.skills?.map((skill) => `${skill.name} | ${skill.image}`).join("\n")} onChange={(value) => updateItem("skills", index, "skills", splitLines(value))} /></div>)}</section>

        <section style={styles.section}><div style={styles.row}><h2 style={styles.sectionTitle}>Experience</h2><button type="button" style={styles.button} onClick={() => addItem("experiences", { id: Date.now(), role: "", company: "", date: "", desc: "", skills: [], img: "" })}>Add experience</button></div>{draft.experiences.map((item, index) => <div key={item.id ?? index} style={styles.item}><div style={styles.row}><strong>Experience {index + 1}</strong><button type="button" style={{ ...styles.button, ...styles.danger }} onClick={() => removeItem("experiences", index)}>Remove</button></div><div style={styles.grid}>{["role", "company", "date", "img"].map((key) => <Field key={key} label={key} value={item[key]} onChange={(value) => updateItem("experiences", index, key, value)} />)}<Field label="Description" multiline value={item.desc} onChange={(value) => updateItem("experiences", index, "desc", value)} /><Field label="Skills (comma separated)" value={item.skills?.join(", ")} onChange={(value) => updateItem("experiences", index, "skills", value.split(",").map((skill) => skill.trim()).filter(Boolean))} /></div></div>)}</section>

        <section style={styles.section}><div style={styles.row}><h2 style={styles.sectionTitle}>Education</h2><button type="button" style={styles.button} onClick={() => addItem("education", { id: Date.now(), school: "", date: "", grade: "", desc: "", degree: "", img: "" })}>Add education</button></div>{draft.education.map((item, index) => <div key={item.id ?? index} style={styles.item}><div style={styles.row}><strong>Education {index + 1}</strong><button type="button" style={{ ...styles.button, ...styles.danger }} onClick={() => removeItem("education", index)}>Remove</button></div><div style={styles.grid}>{["school", "date", "grade", "degree", "img"].map((key) => <Field key={key} label={key} value={item[key]} onChange={(value) => updateItem("education", index, key, value)} />)}<Field label="Description" multiline value={item.desc} onChange={(value) => updateItem("education", index, "desc", value)} /></div></div>)}</section>

        <div style={{ display: "flex", gap: 10, paddingBottom: 40 }}><button style={styles.button}>Save changes</button><button type="button" style={{ ...styles.button, ...styles.secondary }} onClick={reset}>Reset original content</button></div>
      </form>
    </main>
  );
}
