import React from "react";

function Projects() {
  // Define project data to easily map over and display
  const projectsData = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A responsive web application built with React and a RESTful API integration. Focused on user experience and clean code.",
      imageUrl: "https://placehold.co/400x250/A7F3D0/1E40AF?text=Project+Alpha", // Placeholder image
      link: "#" // Replace with actual project link
    },
    {
      id: 2,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard created using D3.js to visualize complex datasets, providing insights through dynamic charts.",
      imageUrl: "https://placehold.co/400x250/D1FAE5/065F46?text=Project+Beta", // Placeholder image
      link: "#" // Replace with actual project link
    },
    {
      id: 3,
      title: "Mobile Game Development",
      description: "A casual mobile game developed with Unity, featuring intuitive controls and engaging gameplay mechanics.",
      imageUrl: "https://placehold.co/400x250/FEE2E2/991B1B?text=Project+Gamma", // Placeholder image
      link: "#" // Replace with actual project link
    },
    // Removed Project Delta to have only 3 projects
  ];

  const styles = {
    // Styles for the project grid container
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px", // Increased gap for better spacing
      maxWidth: "1200px", // Increased max-width for more content
      margin: "0 auto",
      padding: "20px", // Added padding for responsiveness
    },
    // Styles for individual project cards
    card: {
      background: "#fff",
      padding: "25px", // Increased padding
      borderRadius: "12px", // More rounded corners
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)", // Stronger shadow
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth hover effect
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      overflow: "hidden", // Ensures image doesn't overflow rounded corners
    },
    // Hover effect for cards
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    },
    // Styles for project images
    projectImage: {
      width: "100%",
      height: "180px", // Fixed height for consistency
      objectFit: "cover", // Ensures image covers the area without distortion
      borderRadius: "8px", // Rounded corners for images
      marginBottom: "20px",
      border: "1px solid #eee", // Subtle border
    },
    projectTitle: {
      fontSize: "24px", // Larger title
      marginBottom: "10px",
      color: "#333",
      fontWeight: "600",
    },
    projectDesc: {
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.6",
      marginBottom: "15px",
    },
    projectLink: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#667eea",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    projectLinkHover: {
      backgroundColor: "#764ba2",
    }
  };

  // This function returns a <style> tag with all the necessary CSS
  // including the @keyframes for the animated background.
  const GlobalProjectsStyles = () => (
    <style>
      {`
        /* Styles for the main section, including the animated background */
        .projects-section {
          padding: 80px 20px;
          color: #333; /* Darker text for contrast on light background */
          position: relative;
          overflow: hidden; /* Hide any overflow from the background animation */

          /* Colorful Gradient Background */
          background: linear-gradient(135deg, #FFD700 0%, #FF6347 25%, #4682B4 50%, #8A2BE2 75%, #00CED1 100%);
          background-size: 400% 400%; /* Crucial for the animation */
          animation: colorfulGradientAnimation 20s ease infinite alternate; /* Slower, more colorful animation */
        }

        /* Keyframes for the colorful gradient animation */
        @keyframes colorfulGradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Styles for the section title */
        .projects-title {
          font-size: 42px; /* Larger title */
          margin-bottom: 50px; /* More space below title */
          color: #222;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
          font-weight: 700;
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 768px) {
          .projects-section {
            padding: 60px 15px;
          }
          .projects-title {
            font-size: 32px;
            margin-bottom: 30px;
          }
          .project-card {
            padding: 20px;
          }
          .project-image {
            height: 150px;
          }
          .project-title {
            font-size: 20px;
          }
          .project-desc {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .projects-section {
            padding: 40px 10px;
          }
          .projects-title {
            font-size: 28px;
          }
          .projects-grid {
            gap: 20px;
          }
        }
      `}
    </style>
  );

  return (
    <>
      {/* Render the global style tag for the Projects component */}
      <GlobalProjectsStyles />

      <section id="projects" className="projects-section">
        <h2 className="projects-title">My Projects</h2>
        <div style={styles.grid} className="projects-grid">
          {projectsData.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = styles.cardHover.transform;
                e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
            >
              <img
                src={project.imageUrl}
                alt={`Screenshot of ${project.title}`}
                style={styles.projectImage}
                className="project-image"
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = `https://placehold.co/400x250/CCCCCC/666666?text=Image+Not+Found`;
                }}
              />
              <h3 style={styles.projectTitle} className="project-title">
                {project.title}
              </h3>
              <p style={styles.projectDesc} className="project-desc">
                {project.description}
              </p>
              <span
                style={styles.projectLink}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.projectLinkHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.projectLink.backgroundColor)}
              >
                View Project
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
