import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: profileData } = await supabase
      .from("portfolio_info")
      .select("*");

    const { data: projectData } = await supabase
      .from("projects")
      .select("*");

    setPortfolio(profileData || []);
    setProjects(projectData || []);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {portfolio.map((item) => (
          <div
            key={item.id}
            style={{
              textAlign: "center",
              padding: "60px 30px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "24px",
              color: "white",
              marginBottom: "50px",
              boxShadow: "0 8px 32px rgba(157, 49, 141, 0.3)",
            }}
          >
            <h1
  style={{
    fontSize: "60px",
    marginBottom: "25px",
     color: "#ffffff",
    fontWeight: "700",
    textShadow: "0 4px 20px rgba(255,255,255,0.3)",
  }}
>
  {item.name}
</h1>

<h2
  style={{
    color: "white",
    marginBottom: "20px",
    marginTop: "10px",
    fontSize: "28px",
    fontWeight: "600",
  }}
>
  {item.title}
</h2>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto 20px",
                lineHeight: "1.7",
              }}
            >
              {item.bio}
            </p>

            <p
              style={{
                color: "#cbd5e1",
                marginBottom: "20px",
              }}
            >
              Building Modern Web Applications with React & Supabase
            </p>

            <Link to="/admin">
  <button
    style={{
      background: "white",
      color: "#4f46e5",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Admin Panel
  </button>
</Link>
          </div>
        ))}

        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "34px",
            marginBottom: "25px",
          }}
        >
          Skills
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "60px",
          }}
        >
          {[
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "Supabase",
            "GitHub",
            "Vercel",
          ].map((skill) => (
            <div
              key={skill}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(183, 61, 164, 0.15)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "30px",
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "34px",
            marginBottom: "30px",
          }}
        >
          Featured Projects
        </h2>

        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "24px",
              padding: "25px",
              marginBottom: "25px",
              color: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                color: "#e2e8f0",
                lineHeight: "1.6",
              }}
            >
              {project.description}
            </p>

            {project.tech_stack && (
              <p
                style={{
                  marginTop: "10px",
                }}
              >
                <strong>Tech Stack:</strong>{" "}
                {project.tech_stack}
              </p>
            )}

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#6366f1",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                GitHub
              </a>

              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#8b5cf6",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}

        <footer
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginTop: "60px",
            paddingBottom: "20px",
          }}
        >
          © 2026 Hifza Iftikhar | Full Stack Developer
        </footer>
      </div>
    </div>
  );
}