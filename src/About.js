import React, { useState, useEffect, useRef } from "react";

// Define the number of particles (stars) for the background animation
const NUM_ABOUT_PARTICLES = 150; // Denser starfield for a rich space look

function About() {
  // State to hold the properties (position, size, speed, opacity, shape) of each star particle
  const [particles, setParticles] = useState([]);
  // Ref to get the dimensions of the main About section, crucial for particle positioning
  const containerRef = useRef(null);
  // Ref to store the animation frame ID for cleanup, declared at the top level
  const animationFrameId = useRef(null);

  // --- Particle generation and animation logic using useEffect ---
  useEffect(() => {
    // Exit if the container reference is not yet available (component not mounted)
    if (!containerRef.current) return;

    // Function to initialize the particles with random properties
    const generateParticles = () => {
      const newParticles = [];
      // Get current dimensions of the about section for particle placement
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      for (let i = 0; i < NUM_ABOUT_PARTICLES; i++) {
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
      position: "relative", // Needed for absolute positioning of particles and rotating object
      overflow: "hidden", // Hide any overflow from the background
      minHeight: "100vh", // Ensure section takes full height
      display: "flex", // To center content vertically
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // Static deep space background gradient
      background: "linear-gradient(135deg, #0a0a1a 0%, #000000 100%)",
      color: "#fff", // Default text color for the section
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white background for card
      padding: "40px 30px",
      maxWidth: "800px",
      margin: "0 auto",
      borderRadius: "16px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)", // Deeper shadow
      backdropFilter: "blur(10px)", // Frosted glass effect
      border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
      zIndex: 2, // Ensure card is above the Earth and stars
      position: "relative", // Needed for zIndex
    },
    title: {
      fontSize: "36px",
      marginBottom: "20px",
      color: "#fff", // White title for contrast on dark background
    },
    content: {
      fontSize: "18px",
      color: "#e0e0e0", // Lighter text for readability on dark background
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
      border: "4px solid rgba(255, 255, 255, 0.8)", // Lighter border for profile image
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)", // Deeper shadow
      backgroundColor: "#eee",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    // Styles for the rotating Earth element
    rotatingEarth: {
      position: "absolute",
      width: "600px", // Larger Earth
      height: "600px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Center the object
      // Realistic Earth texture placeholder - replace with a high-quality image if possible
      backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Galilean_moons_animation.gif/320px-Galilean_moons_animation.gif')", // Placeholder for Earth texture
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%", // Make it spherical
      zIndex: 1, // Between stars (0) and card (2)
      animation: "earthRotateY 60s linear infinite", // Apply Y-axis rotation animation
      opacity: 0.8, // Slightly transparent
      // Enhanced glow and inner shadow for realism
      boxShadow: "0 0 80px rgba(0, 100, 255, 0.7), inset 0 0 30px rgba(0, 0, 0, 0.7)",
    },
  };

  // Embedded style tag for the rotation keyframes
  const GlobalAnimations = () => (
    <style>
      {`
        @keyframes earthRotateY {
          from {
            transform: translate(-50%, -50%) rotateY(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotateY(360deg);
          }
        }
        /* Removed twinkle and nebulaPan keyframes */
      `}
    </style>
  );

  return (
    <section id="about" style={styles.section} ref={containerRef}>
      {/* Render global animation keyframes */}
      <GlobalAnimations />

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
            zIndex: 0, // Places particles behind the Earth
            pointerEvents: "none", // Ensures particles don't interfere with content interaction
          }}
        />
      ))}

      {/* The rotating Earth element */}
      <div style={styles.rotatingEarth}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>About Me</h2>
        <div style={styles.imageWrapper}>
          <img
            src="\WhatsApp Image 2025-07-27 at 14.33.20_cafe3e98.jpg" // Replace with your profile photo (in /public)
            alt="About"
            style={styles.image}
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop
              e.target.src = "https://placehold.co/180x180/CCCCCC/666666?text=Your+Photo"; // Fallback image
            }}
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
