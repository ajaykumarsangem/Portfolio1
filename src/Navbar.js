import React from "react";

function Navbar() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#333",
      color: "#fff",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyPortfolio</div>
      <div style={styles.navLinks}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#about" style={styles.link}>About</a>
        <a href="#projects" style={styles.link}>Projects</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
