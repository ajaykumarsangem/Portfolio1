import React, { useState, useEffect, useRef } from "react";

// Define the number of particles for the background animation
const NUM_PARTICLES = 50;

function Hero() {
  // State to hold the properties (position, size, speed, opacity) of each particle
  const [particles, setParticles] = useState([]);
  // Ref to get the dimensions of the main hero section, crucial for particle positioning
  const containerRef = useRef(null);
  // CORRECTED: Ref to store the animation frame ID for cleanup, declared at the top level
  const animationFrameId = useRef(null);

  // Inline styles for the "Download Resume" button (now an anchor tag)
  const inlineResumeButtonStyles = {
    display: "inline-block", // Makes the <a> tag behave like a block for padding/margin
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#ff6a00", // Orange call-to-action color
    color: "#fff",
    textDecoration: "none", // Removes default underline from the link
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Subtle shadow for depth
    transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
    zIndex: 2, // Ensures the button is above the animated particles
    position: "relative", // Needed for z-index to take effect
  };

  // Inline styles for the main content (h1, p, button) to ensure it's layered above particles
  const heroContentStyles = {
    position: "relative", // Establishes a positioning context for z-index
    zIndex: 2, // Ensures content is above particles
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
    color: "#fff",
  };

  // Inline styles for the main hero section container
  const heroSectionBaseStyles = {
    height: "100vh", // Full viewport height
    display: "flex", // Centers the content (heroContentStyles div)
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Hides particles if they move outside the section boundaries
    position: "relative", // Crucial for absolutely positioning the particles within it
    // Your original gradient background for the section
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };

  // --- Particle generation and animation logic using useEffect ---
  useEffect(() => {
    // Exit if the container reference is not yet available (component not mounted)
    if (!containerRef.current) return;

    // Function to initialize the particles with random properties
    const generateParticles = () => {
      const newParticles = [];
      // Get current dimensions of the hero section for particle placement
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const size = Math.random() * 8 + 2; // Random size between 2px and 10px
        newParticles.push({
          id: i, // Unique ID for React's key prop
          left: Math.random() * width, // Random initial horizontal position
          top: Math.random() * height, // Random initial vertical position
          size: size,
          opacity: Math.random() * 0.5 + 0.2, // Random opacity between 0.2 and 0.7
          speedX: (Math.random() - 0.5) * 0.5, // Random horizontal speed (-0.25 to 0.25)
          speedY: (Math.random() - 0.5) * 0.5, // Random vertical speed (-0.25 to 0.25)
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

          // Logic to make particles "bounce" off the edges of the container
          if (newLeft <= 0 || newLeft >= width - p.size) {
            p.speedX *= -1; // Reverse horizontal direction
          }
          if (newTop <= 0 || newTop >= height - p.size) {
            p.speedY *= -1; // Reverse vertical direction
          }

          // Optional: Uncomment the following block if you prefer particles to "wrap around"
          // the screen instead of bouncing.
          /*
          if (newLeft + p.size < 0) newLeft = width;
          if (newLeft > width) newLeft = -p.size;
          if (newTop + p.size < 0) newTop = height;
          if (newTop > height) newTop = -p.size;
          */

          return { ...p, left: newLeft, top: newTop }; // Return updated particle properties
        });
      });
      // Request the next animation frame for a smooth loop
      animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    // Initial generation of particles when the component mounts
    generateParticles();

    // Start the animation loop
    // animationFrameId is now declared at the top level of the component
    animationFrameId.current = requestAnimationFrame(animateParticles);

    // Cleanup function: This runs when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId.current); // Stop the animation loop
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    // The main hero section container, with a ref to get its dimensions
    <section id="home" style={heroSectionBaseStyles} ref={containerRef}>
      {/* Render the dynamically created moving particles */}
      {particles.map((p) => (
        <div
          key={p.id} // Unique key for React list rendering
          style={{
            position: "absolute", // Position particles relative to the hero section
            left: `${p.left}px`,
            top: `${p.top}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%", // Makes the particles circular
            backgroundColor: `rgba(255, 255, 255, ${p.opacity})`, // White color with dynamic opacity
            filter: "blur(0.5px)", // Optional: Adds a slight blur for a softer, glowing effect
            zIndex: 1, // Places particles behind the main content
          }}
        />
      ))}

      {/* Hero content - wrapped in a div to control its z-index */}
      <div style={heroContentStyles}>
        {/* Heading styles (can be moved to separate inline style objects if preferred) */}
        <h1 style={{ fontSize: "56px", fontWeight: "700", marginBottom: "16px", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
          Hi, I'm Ajay kumar
        </h1>
        {/* Subheading styles */}
        <p style={{ fontSize: "22px", color: "#e0e0e0", marginBottom: "32px", maxWidth: "600px", lineHeight: "1.5" }}>
          Frontend Developer | React Enthusiast building fast, clean, and
          responsive user experiences.
        </p>
        {/* Resume download link */}
        <a
          href="\resumevard[1].pdf" // Path to your resume PDF (place in public folder)
          download="Your_Name_Resume.pdf" // Suggested filename for download
          target="_blank" // Opens the PDF in a new tab
          rel="noopener noreferrer" // Security best practice for target="_blank"
          style={inlineResumeButtonStyles}
          onMouseOver={(e) => (e.target.style.background = "#ff8800")} // Hover effect
          onMouseOut={(e) => (e.target.style.background = "#ff6a00")} // Reset on mouse out
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}

export default Hero;
