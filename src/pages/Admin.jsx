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
  useEffect(() => {
  loadProfile();
  async function fetchProjects() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: false });

  setProjects(data || []);
}
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
      alert("Profile Updated!");
    }
  }

  async function addProject() {
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

    alert("Project Added Successfully!");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>

      <h2>Update Profile</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Title"
        value={portfolioTitle}
        onChange={(e) => setPortfolioTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <br /><br />

      <button onClick={updateProfile}>Update Profile</button>

      <hr />

      <h2>Add Project</h2>

      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Tech Stack"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="GitHub Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Demo Link"
        value={demo}
        onChange={(e) => setDemo(e.target.value)}
      />
      <br /><br />

      <button onClick={addProject}>Add Project</button>
    </div>
  );
}