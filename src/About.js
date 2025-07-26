  import React from "react";

  function About() {
    const styles = {
      section: {
        padding: "80px 20px",
        backgroundImage: "url('/3409297.jpg')", // 🔁 Place your image in /public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      card: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "40px 30px",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      },
      title: {
        fontSize: "36px",
        marginBottom: "20px",
        color: "#222",
      },
      content: {
        fontSize: "18px",
        color: "#444",
        lineHeight: "1.6",
        maxWidth: "700px",
        margin: "0 auto",
      },
      imageWrapper: {
        width: "180px",
        height: "180px",
        margin: "20px auto",
        borderRadius: "50%",
        overflow: "hidden",
        border: "4px solid #fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#eee",
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    };

    return (
      <section id="about" style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.title}>About Me</h2>
          <div style={styles.imageWrapper}>
            <img
              src="/me.jpg" // Replace with your profile photo (in /public)
              alt="About"
              style={styles.image}
            />
          </div>
          <p style={styles.content}>
            I’m a frontend developer with a strong interest in creating visually
            appealing and responsive web apps using React. I love learning new
            tech, solving design problems, and building smooth user experiences.
          </p>
        </div>
      </section>
    );
  }

  export default About;
