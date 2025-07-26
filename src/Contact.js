import React from "react";

function Contact() {
  const styles = {
    section: {
      padding: "80px 20px",
      background: "#fff",
      textAlign: "center",
    },
    title: {
      fontSize: "36px",
      marginBottom: "20px",
    },
    input: {
      padding: "12px",
      margin: "10px 0",
      width: "100%",
      maxWidth: "400px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    button: {
      marginTop: "20px",
      padding: "12px 24px",
      background: "#667eea",
      color: "#fff",
      border: "none",
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.title}>Contact Me</h2>
      <form>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea
          placeholder="Your Message"
          style={{ ...styles.input, height: "100px" }}
        ></textarea>
        <br />
        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;
