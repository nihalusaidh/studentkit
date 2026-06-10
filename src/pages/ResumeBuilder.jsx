import { useState } from "react";
import { Helmet } from "react-helmet-async";

function ResumeBuilder() {
  const [template, setTemplate] = useState("classic");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: "",
    projects: "",
    education: "",
    experience: "",
    certifications: "",
  });

  const updateData = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const links = [
    data.linkedin && `LinkedIn: ${data.linkedin}`,
    data.github && `GitHub: ${data.github}`,
    data.portfolio && `Portfolio: ${data.portfolio}`,
  ].filter(Boolean);

  const Section = ({ title, children }) => (
    <div className="mb-4">
      <h3 className="font-bold text-lg border-b mb-2">{title}</h3>
      <div className="whitespace-pre-line text-slate-700">{children}</div>
    </div>
  );

  const ResumePreview = () => {
    if (template === "modern") {
      return (
        <div className="border rounded-xl overflow-hidden bg-white">
          <div className="bg-slate-900 text-white p-6">
            <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
            <p>{data.email || "email@example.com"} | {data.phone || "Phone"}</p>
            <p>{data.location || "Location"}</p>
          </div>

          <div className="p-6">
            <Section title="Education">{data.education || `${data.degree}\n${data.college}`}</Section>
            <Section title="Skills">{data.skills || "Your skills"}</Section>
            <Section title="Projects">{data.projects || "Your projects"}</Section>
            <Section title="Experience">{data.experience || "Your experience"}</Section>
            <Section title="Links">{links.join("\n") || "Your links"}</Section>
          </div>
        </div>
      );
    }

    if (template === "minimal") {
      return (
        <div className="border p-8 rounded-xl bg-white">
          <h1 className="text-4xl font-bold">{data.name || "Your Name"}</h1>
          <p className="text-slate-600 mt-1">
            {data.email || "email@example.com"} | {data.phone || "Phone"} | {data.location || "Location"}
          </p>
          <hr className="my-5" />

          <Section title="Education">{data.education || `${data.degree}\n${data.college}`}</Section>
          <Section title="Skills">{data.skills || "Your skills"}</Section>
          <Section title="Projects">{data.projects || "Your projects"}</Section>
          <Section title="Certifications">{data.certifications || "Your certifications"}</Section>
          <Section title="Links">{links.join("\n") || "Your links"}</Section>
        </div>
      );
    }

    if (template === "blue") {
      return (
        <div className="border rounded-xl bg-white p-8">
          <h1 className="text-4xl font-bold text-blue-700">
            {data.name || "Your Name"}
          </h1>

          <p className="text-slate-600 mt-2">
            {data.email || "email@example.com"} | {data.phone || "Phone"} |{" "}
            {data.location || "Location"}
          </p>

          <p className="text-blue-600 mt-1">{links.join(" | ")}</p>

          <hr className="my-5 border-blue-200" />

          <Section title="Education">
            {data.education || `${data.degree}\n${data.college}`}
          </Section>

          <Section title="Skills">{data.skills || "Your skills"}</Section>

          <Section title="Projects">{data.projects || "Your projects"}</Section>

          <Section title="Experience">
            {data.experience || "Your experience"}
          </Section>

          <Section title="Certifications">
            {data.certifications || "Your certifications"}
          </Section>
        </div>
      );
    }

    if (template === "sidebar") {
      return (
        <div className="border rounded-xl bg-white grid grid-cols-3 overflow-hidden">
          <div className="bg-slate-800 text-white p-6 col-span-1">
            <h1 className="text-2xl font-bold mb-4">
              {data.name || "Your Name"}
            </h1>

            <p className="text-sm mb-2">{data.email || "email@example.com"}</p>
            <p className="text-sm mb-2">{data.phone || "Phone"}</p>
            <p className="text-sm mb-4">{data.location || "Location"}</p>

            <h3 className="font-bold mt-5 mb-2">Links</h3>
            <p className="text-sm whitespace-pre-line">
              {links.join("\n") || "Your links"}
            </p>

            <h3 className="font-bold mt-5 mb-2">Skills</h3>
            <p className="text-sm whitespace-pre-line">
              {data.skills || "Your skills"}
            </p>
          </div>

          <div className="p-6 col-span-2">
            <Section title="Education">
              {data.education || `${data.degree}\n${data.college}`}
            </Section>

            <Section title="Projects">{data.projects || "Your projects"}</Section>

            <Section title="Experience">
              {data.experience || "Your experience"}
            </Section>

            <Section title="Certifications">
              {data.certifications || "Your certifications"}
            </Section>
          </div>
        </div>
      );
    }

    return (
      <div className="border p-8 rounded-xl bg-slate-50">
        <h1 className="text-3xl font-bold text-center">{data.name || "Your Name"}</h1>
        <p className="text-center text-slate-600 mt-2">
          {data.email || "email@example.com"} | {data.phone || "Phone"} | {data.location || "Location"}
        </p>
        <p className="text-center text-slate-600 mt-1">{links.join(" | ")}</p>

        <hr className="my-5" />

        <Section title="Career Objective">
          Motivated student seeking opportunities to apply academic knowledge, technical skills and project experience.
        </Section>

        <Section title="Education">{data.education || `${data.degree || "Degree"}\n${data.college || "College Name"}`}</Section>
        <Section title="Skills">{data.skills || "Your skills"}</Section>
        <Section title="Projects">{data.projects || "Your projects"}</Section>
        <Section title="Experience">{data.experience || "Your experience"}</Section>
        <Section title="Certifications">{data.certifications || "Your certifications"}</Section>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <Helmet>
        <title>Free Resume Builder for Students | ToolNest</title>
        <meta
          name="description"
          content="Create student resumes with templates, skills, projects, education and profile links."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-3">Resume Builder</h1>
      <p className="text-slate-600 mb-8">
        Choose a template, fill your details and preview your resume instantly.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Enter Details</h2>

          <label className="font-medium">Choose Template</label>
          <select
            className="border p-3 w-full mb-4 rounded mt-2"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="classic">Classic Student Resume</option>
            <option value="modern">Modern Dark Header</option>
            <option value="minimal">Minimal Clean Resume</option>
            <option value="blue">Blue Professional</option>
            <option value="sidebar">Sidebar Resume</option>
          </select>

          {[
            ["name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["location", "Location"],
            ["college", "College"],
            ["degree", "Degree / Course"],
            ["linkedin", "LinkedIn URL"],
            ["github", "GitHub URL"],
            ["portfolio", "Portfolio / Website URL"],
          ].map(([field, label]) => (
            <input
              key={field}
              className="border p-3 w-full mb-3 rounded"
              placeholder={label}
              value={data[field]}
              onChange={(e) => updateData(field, e.target.value)}
            />
          ))}

          <textarea
            className="border p-3 w-full mb-3 rounded h-24"
            placeholder="Skills"
            value={data.skills}
            onChange={(e) => updateData("skills", e.target.value)}
          />

          <textarea
            className="border p-3 w-full mb-3 rounded h-28"
            placeholder="Projects with links"
            value={data.projects}
            onChange={(e) => updateData("projects", e.target.value)}
          />

          <textarea
            className="border p-3 w-full mb-3 rounded h-28"
            placeholder="Education"
            value={data.education}
            onChange={(e) => updateData("education", e.target.value)}
          />

          <textarea
            className="border p-3 w-full mb-3 rounded h-28"
            placeholder="Experience / Internship"
            value={data.experience}
            onChange={(e) => updateData("experience", e.target.value)}
          />

          <textarea
            className="border p-3 w-full rounded h-24"
            placeholder="Certifications"
            value={data.certifications}
            onChange={(e) => updateData("certifications", e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">Resume Preview</h2>
          <ResumePreview />

          <p className="text-sm text-slate-500 mt-4">
            More templates and PDF export will be added next.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;