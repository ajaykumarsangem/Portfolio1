import React from "react";

function Projects() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#f5f5f5",
      textAlign: "center",
    },
    title: {
      fontSize: "36px",
      marginBottom: "40px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    imagePlaceholder: {
      height: "150px",
      background: "#ddd",
      marginBottom: "15px",
    },
    projectTitle: {
      fontSize: "20px",
      marginBottom: "10px",
    },
    projectDesc: {
      fontSize: "16px",
      color: "#555",
    },
  };

  return (
    <section id="projects" style={styles.section}>
      <h2 style={styles.title}>Projects</h2>
      <div style={styles.grid}>
        {[1, 2, 3].map((project) => (
          <div key={project} style={styles.card}>
            <div style={styles.imagePlaceholder}>[ Project Image ]</div>
            <h3 style={styles.projectTitle}>Project {project}</h3>
            <p style={styles.projectDesc}>
              A brief description of what this project does and the tech used.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
