import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser'; // <--- ADD THIS IMPORT

// Define the number of particles (stars) for the background animation
const NUM_CONTACT_PARTICLES = 150; // Increased for a denser starfield

function Contact() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // State to manage success message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // State to manage error message visibility
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // State to hold the properties (position, size, speed, opacity, shape) of each particle
  const [particles, setParticles] = useState([]);
  // Ref to get the dimensions of the main contact section, crucial for particle positioning
  const containerRef = useRef(null);
  // Ref to store the animation frame ID for cleanup, declared at the top level
  const animationFrameId = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => { // Made async to handle fetch request
    e.preventDefault();

    console.log("Form data to send:", formData);

    // Hide any previous messages
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    setErrorMessage("");

    try {
      // --- EMAILJS INTEGRATION ---
      // 1. Replace 'YOUR_EMAILJS_SERVICE_ID' with your actual EmailJS Service ID.
      // 2. Replace 'YOUR_EMAILJS_TEMPLATE_ID' with your actual EmailJS Template ID.
      // 3. Replace 'YOUR_EMAILJS_PUBLIC_KEY' with your actual EmailJS Public Key (User ID).
      //    (The Private Key should NEVER be used in frontend code.)
      const serviceId = 'service_taw3xip';   // <--- PASTE YOUR SERVICE ID HERE 
      const templateId = 'template_rx0npr8'; // <--- PASTE YOUR TEMPLATE ID HERE (from Email Templates section)
      const publicKey = '2M2Rb94vW0LZYPwa-';   // <--- PASTE YOUR PUBLIC KEY (User ID) HERE (from Account section)

      // These parameters must match the variables defined in your EmailJS email template.
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'ajaykumarsangem555@gmail.com', // This should match the recipient variable in your EmailJS template
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log("Email sent successfully!");
      setShowSuccessMessage(true); // Show success message
      setFormData({ name: "", email: "", message: "" }); // Clear form

    } catch (error) {
      console.error("Failed to send email:", error);
      setErrorMessage("Failed to send message. Please try again later.");
      setShowErrorMessage(true); // Show error message
    } finally {
      // Set a timeout to hide messages after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
        setErrorMessage("");
      }, 3000);
      // Cleanup the timer if the component unmounts before it fires
      return () => clearTimeout(timer);
    }
  };

  // --- Particle generation and animation logic using useEffect ---
  useEffect(() => {
    // Exit if the container reference is not yet available (component not mounted)
    if (!containerRef.current) return;

    // Function to initialize the particles with random properties
    const generateParticles = () => {
      const newParticles = [];
      // Get current dimensions of the contact section for particle placement
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      for (let i = 0; i < NUM_CONTACT_PARTICLES; i++) {
        const size = Math.random() * 3 + 1; // Particle size between 1px and 4px (small stars)
        const shape = Math.random() > 0.7 ? "ellipse" : "circle"; // Mostly circles, some ellipses for variety
        newParticles.push({
          id: i, // Unique ID for React's key prop
          left: Math.random() * width, // Random initial horizontal position
          top: Math.random() * height, // Random initial vertical position
          size: size,
          opacity: Math.random() * 0.7 + 0.1, // Random opacity between 0.1 and 0.8
          speedX: (Math.random() - 0.5) * 0.1, // Very slow random horizontal speed (-0.05 to 0.05)
          speedY: (Math.random() - 0.5) * 0.1, // Very slow random vertical speed (-0.05 to 0.05)
          shape: shape, // Shape of the particle
        });
      }
      setParticles(newParticles); // Update state with the new particles
    };

    // Function to animate the particles frame by frame
    const animateParticles = () => {
      setParticles((prevParticles) => {
        // Get current dimensions again, in case of window resize
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        return prevParticles.map((p) => {
          let newLeft = p.left + p.speedX;
          let newTop = p.top + p.speedY;

          // Wrap particles around the screen
          if (newLeft + p.size < 0) newLeft = width;
          if (newLeft > width) newLeft = -p.size;
          if (newTop + p.size < 0) newTop = height;
          if (newTop > height) newTop = -p.size;

          return { ...p, left: newLeft, top: newTop }; // Return updated particle properties
        });
      });
      // Request the next animation frame for a smooth loop
      animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    // Initial generation of particles when the component mounts
    generateParticles();

    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(animateParticles);

    // Add event listener for window resize to regenerate particles
    const handleResize = () => {
      generateParticles(); // Regenerate particles on resize to fit new dimensions
    };
    window.addEventListener('resize', handleResize);


    // Cleanup function: This runs when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId.current); // Stop the animation loop
      window.removeEventListener('resize', handleResize); // Remove resize listener
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const styles = {
    section: {
      padding: "80px 20px",
      textAlign: "center",
      position: "relative", // Needed for absolute positioning of particles
      overflow: "hidden", // Hide particles if they go out of bounds
      minHeight: "100vh", // Ensure section takes full height
      display: "flex", // To center content vertically
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // Universe background gradient
      background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1d 50%, #000000 100%)",
      color: "#fff", // Default text color for the section
    },
    title: {
      fontSize: "36px",
      marginBottom: "20px",
      color: "#fff", // White title for contrast
      zIndex: 1, // Ensure title is above particles
      position: "relative",
    },
    formContainer: { // New style for the form wrapper to make it smaller and styled
      maxWidth: "350px", // REDUCED MAX-WIDTH FOR SMALLER FORM
      margin: "0 auto",
      padding: "25px", // REDUCED PADDING
      background: "rgba(255, 255, 255, 0.1)", // Semi-transparent white background
      borderRadius: "15px", // More rounded corners
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)", // Deeper shadow
      backdropFilter: "blur(10px)", // Frosted glass effect
      border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
      zIndex: 1, // Ensure form is above particles
      position: "relative",
    },
    input: {
      padding: "10px", // REDUCED PADDING
      margin: "8px 0", // REDUCED MARGIN
      width: "100%",
      fontSize: "15px", // SLIGHTLY SMALLER FONT
      borderRadius: "6px",
      border: "1px solid #444", // Darker border for inputs
      background: "rgba(255, 255, 255, 0.1)", // Semi-transparent input background
      color: "#fff", // White text in inputs
      outline: "none", // Remove default outline
      transition: "border-color 0.3s ease", // Smooth transition for focus
    },
    inputFocus: { // Style for input on focus
        borderColor: "#667eea", // Highlight border on focus
    },
    textarea: {
        height: "100px", // SLIGHTLY SMALLER TEXTAREA HEIGHT
        resize: "vertical", // Allow vertical resizing
    },
    button: {
      marginTop: "15px", // REDUCED MARGIN TOP
      padding: "10px 20px", // REDUCED PADDING
      background: "#667eea",
      color: "#fff",
      border: "none",
      fontSize: "15px", // SLIGHTLY SMALLER FONT
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.2s ease", // Smooth transitions
    },
    buttonHover: {
        background: "#764ba2", // Darker on hover
        transform: "translateY(-2px)", // Slight lift on hover
    }
  };

  return (
    <section id="contact" style={styles.section} ref={containerRef}>
      {/* Render the dynamically created moving particles (stars) */}
      {particles.map((p) => (
        <div
          key={p.id} // Unique key for React list rendering
          style={{
            position: "absolute", // Position particles relative to the section
            left: `${p.left}px`,
            top: `${p.top}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Vary borderRadius for different star/galaxy shapes
            borderRadius: p.shape === "circle" ? "50%" : "20% / 50%",
            backgroundColor: `rgba(255, 255, 255, ${p.opacity})`, // White color with dynamic opacity
            // Apply blur based on size or randomly for depth effect
            filter: p.size < 2 ? "blur(0.5px)" : "none",
            zIndex: 0, // Places particles behind the main content
            pointerEvents: "none", // Ensures particles don't interfere with form interaction
          }}
        />
      ))}

      <h2 style={styles.title}>Contact Me</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#444"}
            value={formData.name}
            onChange={handleChange}
            name="name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#444"}
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
          <textarea
            placeholder="Your Message"
            style={{ ...styles.input, ...styles.textarea }}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = "#444"}
            value={formData.message}
            onChange={handleChange}
            name="message"
            required
          ></textarea>
          <br />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
                e.target.style.background = styles.buttonHover.background;
                e.target.style.transform = styles.buttonHover.transform;
            }}
            onMouseOut={(e) => {
                e.target.style.background = styles.button.background;
                e.target.style.transform = "none";
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Success Message Pop-up */}
      {showSuccessMessage && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "20px 30px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          zIndex: 100, // Ensure it's on top of everything
          display: "flex",
          alignItems: "center",
          color: "#333",
          fontSize: "18px",
          fontWeight: "bold",
        }}>
          {/* Using a simple checkmark emoji as Lucide-React is not imported in this version */}
          <span style={{ color: "#28a745", fontSize: "24px", marginRight: "10px" }}>✓</span>
          Message sent successfully!
        </div>
      )}

      {/* Error Message Pop-up */}
      {showErrorMessage && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 0, 0, 0.9)", // Red background for error
          padding: "20px 30px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          zIndex: 100, // Ensure it's on top of everything
          display: "flex",
          alignItems: "center",
          color: "#fff", // White text for error
          fontSize: "18px",
          fontWeight: "bold",
        }}>
          {/* Using a simple cross emoji */}
          <span style={{ color: "#fff", fontSize: "24px", marginRight: "10px" }}>✖</span>
          {errorMessage}
        </div>
      )}
    </section>
  );
}

export default Contact;
