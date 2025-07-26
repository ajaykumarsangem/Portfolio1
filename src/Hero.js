import React from "react";

function Hero() {
  const styles = {
    section: {
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "#f9f9f9",
      padding: "0 20px",
    },
    heading: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    subheading: {
      fontSize: "20px",
      color: "#666",
      marginBottom: "30px",
    },
    button: {
      padding: "12px 24px",
      fontSize: "16px",
      background: "#667eea",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <section id="home" style={styles.section}>
      <h1 style={styles.heading}>Hi, I'm [Your Name]</h1>
      <p style={styles.subheading}>Frontend Developer | React Enthusiast</p>
      <button style={styles.button}>Download Resume</button>
    </section>
  );
}

export default Hero;
