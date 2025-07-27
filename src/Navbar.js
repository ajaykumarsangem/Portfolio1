import React from "react";

function Navbar() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#333", // Base background color
      color: "#fff",
      position: "relative", // Needed for z-index and potential absolute children
      overflow: "hidden", // Hide overflow of background animation
      // Apply background gradient animation
      background: "linear-gradient(135deg, #333 0%, #555 100%)", // Initial gradient
      backgroundSize: "400% 400%", // Crucial for gradient animation
      animation: "gradientShift 10s ease infinite alternate", // Animation properties
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      // Add subtle hover effect for logo
      transition: "color 0.3s ease",
    },
    logoHover: {
      color: "#a78bfa", // A subtle purple on hover
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "16px",
      position: "relative", // Needed for pseudo-elements or underline animation
      // Add transition for smooth hover effects
      transition: "color 0.3s ease, transform 0.2s ease",
    },
    linkHover: {
      color: "#a78bfa", // A subtle purple on hover
      transform: "translateY(-2px)", // Slight lift on hover
    },
    // Styles for an animated underline (optional, can be added with pseudo-elements if desired)
    // For simplicity, we'll just animate color and lift on hover for now.
  };

  // This function returns a <style> tag with all the necessary CSS keyframes
  const GlobalAnimations = () => (
    <style>
      {`
        /* Keyframes for the background gradient animation */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}
    </style>
  );

  return (
    <>
      {/* Render the global animation keyframes */}
      <GlobalAnimations />

      <nav style={styles.navbar}>
        <div
          style={styles.logo}
          onMouseOver={(e) => (e.target.style.color = styles.logoHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.logo.color)}
        >
          MyPortfolio
        </div>
        <div style={styles.navLinks}>
          <a
            href="#home"
            style={styles.link}
            onMouseOver={(e) => {
              e.target.style.color = styles.linkHover.color;
              e.target.style.transform = styles.linkHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.color = styles.link.color;
              e.target.style.transform = "none";
            }}
          >
            Home
          </a>
          <a
            href="#about"
            style={styles.link}
            onMouseOver={(e) => {
              e.target.style.color = styles.linkHover.color;
              e.target.style.transform = styles.linkHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.color = styles.link.color;
              e.target.style.transform = "none";
            }}
          >
            About
          </a>
          <a
            href="#projects"
            style={styles.link}
            onMouseOver={(e) => {
              e.target.style.color = styles.linkHover.color;
              e.target.style.transform = styles.linkHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.color = styles.link.color;
              e.target.style.transform = "none";
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            style={styles.link}
            onMouseOver={(e) => {
              e.target.style.color = styles.linkHover.color;
              e.target.style.transform = styles.linkHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.color = styles.link.color;
              e.target.style.transform = "none";
            }}
          >
            Contact
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
