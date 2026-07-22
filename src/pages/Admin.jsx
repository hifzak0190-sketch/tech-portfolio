import { useState, useEffect } from "react";
import supabase from "../supabase";

export default function Admin() {
  const [name, setName] = useState("");
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [bio, setBio] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProfile();
    fetchProjects();
  }, []);

  async function loadProfile() {
    const { data } = await supabase
      .from("portfolio_info")
      .select("*")
      .eq("id", 1)
      .single();

    if (data) {
      setName(data.name || "");
      setPortfolioTitle(data.title || "");
      setBio(data.bio || "");
    }
  }

 async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: false });

  console.log("Projects:", data);
  console.log("Error:", error);

  setProjects(data || []);
}

  async function updateProfile() {
    const { error } = await supabase
      .from("portfolio_info")
      .update({
        name,
        title: portfolioTitle,
        bio,
      })
      .eq("id", 1);

    if (error) {
      alert(error.message);
    } else {
      alert("Profile Updated Successfully");
    }
  }

  function validateForm() {
    const textRegex = /^[a-zA-Z0-9\s.,\-()]+$/;

    if (!textRegex.test(title)) {
      alert("Project title should contain only letters and numbers.");
      return false;
    }

    if (!textRegex.test(description)) {
      alert("Description should contain only letters and numbers.");
      return false;
    }

    if (
      github &&
      !/^https?:\/\/(www\.)?github\.com\/.+/.test(github)
    ) {
      alert("Enter a valid GitHub URL.");
      return false;
    }

    if (
      demo &&
      !/^https?:\/\/.+/.test(demo)
    ) {
      alert("Enter a valid Demo URL.");
      return false;
    }

    return true;
  }

  async function addProject() {
    if (!validateForm()) return;

    const { error } = await supabase.from("projects").insert([
      {
        title,
        description,
        tech_stack: techStack,
        github,
        demo,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project Added Successfully");

    clearForm();
    fetchProjects();
  }

  async function updateProject() {
    if (!validateForm()) return;

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        tech_stack: techStack,
        github,
        demo,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project Updated Successfully");

    clearForm();
    fetchProjects();
    setEditingId(null);
  }

  async function deleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchProjects();
    }
  }

  function editProject(project) {
    setEditingId(project.id);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setTechStack(project.tech_stack || "");
    setGithub(project.github || "");
    setDemo(project.demo || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearForm() {
    setTitle("");
    setDescription("");
    setTechStack("");
    setGithub("");
    setDemo("");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "40px",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Admin Panel
        </h1>

        <h2>Update Profile</h2>

        <input
          style={inputStyle}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Title"
          value={portfolioTitle}
          onChange={(e) => setPortfolioTitle(e.target.value)}
        />

        <textarea
          style={inputStyle}
          rows="4"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          style={buttonStyle}
          onClick={updateProfile}
        >
          Update Profile
        </button>

        <hr style={{ margin: "30px 0" }} />

        <h2>
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <input
          style={inputStyle}
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Demo URL"
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
        />

        {editingId ? (
          <button
            style={buttonStyle}
            onClick={updateProject}
          >
            Update Project
          </button>
        ) : (
          <button
            style={buttonStyle}
            onClick={addProject}
          >
            Add Project
          </button>
        )}

        <hr style={{ margin: "30px 0" }} />

        <h2>Manage Projects</h2>

        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "#334155",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <button
              style={{
                ...buttonStyle,
                marginRight: "10px",
              }}
              onClick={() => editProject(project)}
            >
              Edit
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "#dc2626",
              }}
              onClick={() =>
                deleteProject(project.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}