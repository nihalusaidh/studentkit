import { useState } from "react";
import { Helmet } from "react-helmet-async";

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
  });

  const [template, setTemplate] = useState("modern");

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const printResume = () => {
    window.print();
  };

  const sectionTitle =
    template === "classic"
      ? "text-lg font-bold border-b border-slate-400 mb-2"
      : "text-lg font-bold text-blue-700 mb-2";

  return (
    <>
      <Helmet>
        <title>
          Resume Builder Online Free | Student Resume Maker | ToolNest
        </title>

        <meta
          name="description"
          content="Create a professional resume online for free with ToolNest Resume Builder. Add education, skills, projects, experience, links and download or print your resume."
        />

        <meta
          name="keywords"
          content="Resume Builder, Free Resume Builder, Student Resume Maker, Online Resume Builder, Resume Creator, CV Maker, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/resume-builder"
        />

        <meta
          property="og:title"
          content="Free Resume Builder Online | ToolNest"
        />

        <meta
          property="og:description"
          content="Build a clean professional resume online with education, skills, projects, experience and links."
        />

        <meta
          property="og:url"
          content="https://tools.nihalusaidh.com/resume-builder"
        />

        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Resume Builder Online
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Create a clean professional resume for internships, placements,
            college applications and job opportunities. Add your education,
            skills, projects, experience and important links.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-5">
              Enter Resume Details
            </h2>

            <label className="font-medium">Template Style</label>
            <select
              className="border p-3 rounded w-full mt-2 mb-5"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="modern">Modern Blue</option>
              <option value="classic">Classic Black</option>
              <option value="minimal">Minimal Clean</option>
            </select>

            <div className="grid md:grid-cols-2 gap-3">
              <input
                className="border p-3 rounded"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="Title / Role"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="Location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="LinkedIn URL"
                value={form.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="GitHub URL"
                value={form.github}
                onChange={(e) => updateField("github", e.target.value)}
              />

              <input
                className="border p-3 rounded"
                placeholder="Portfolio / Website URL"
                value={form.portfolio}
                onChange={(e) => updateField("portfolio", e.target.value)}
              />
            </div>

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="4"
              placeholder="Professional Summary"
              value={form.summary}
              onChange={(e) => updateField("summary", e.target.value)}
            />

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="4"
              placeholder="Education"
              value={form.education}
              onChange={(e) => updateField("education", e.target.value)}
            />

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="4"
              placeholder="Skills"
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
            />

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="5"
              placeholder="Projects"
              value={form.projects}
              onChange={(e) => updateField("projects", e.target.value)}
            />

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="5"
              placeholder="Experience / Internship"
              value={form.experience}
              onChange={(e) => updateField("experience", e.target.value)}
            />

            <textarea
              className="border p-3 rounded w-full mt-3"
              rows="4"
              placeholder="Certifications / Achievements"
              value={form.certifications}
              onChange={(e) => updateField("certifications", e.target.value)}
            />

            <button
              onClick={printResume}
              className="mt-5 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 print:hidden"
            >
              Download / Print Resume
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-5 print:hidden">
              Resume Preview
            </h2>

            <div
              id="resume-preview"
              className={`bg-white border rounded-xl p-8 min-h-[900px] ${
                template === "classic"
                  ? "text-slate-900"
                  : template === "minimal"
                  ? "text-slate-800"
                  : "text-slate-900"
              }`}
            >
              <div
                className={`pb-4 mb-5 ${
                  template === "modern"
                    ? "border-b-4 border-blue-600"
                    : "border-b border-slate-300"
                }`}
              >
                <h2
                  className={`text-4xl font-bold ${
                    template === "modern" ? "text-blue-700" : "text-slate-900"
                  }`}
                >
                  {form.name || "Your Name"}
                </h2>

                <p className="text-lg mt-1 text-slate-600">
                  {form.title || "Your Professional Title"}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-slate-600 mt-3">
                  {form.email && <span>{form.email}</span>}
                  {form.phone && <span>{form.phone}</span>}
                  {form.location && <span>{form.location}</span>}
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-blue-700 mt-2">
                  {form.linkedin && (
                    <a href={form.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  )}

                  {form.github && (
                    <a href={form.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}

                  {form.portfolio && (
                    <a href={form.portfolio} target="_blank" rel="noreferrer">
                      Portfolio
                    </a>
                  )}
                </div>
              </div>

              {form.summary && (
                <section className="mb-5">
                  <h3 className={sectionTitle}>Summary</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.summary}
                  </p>
                </section>
              )}

              {form.education && (
                <section className="mb-5">
                  <h3 className={sectionTitle}>Education</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.education}
                  </p>
                </section>
              )}

              {form.skills && (
                <section className="mb-5">
                  <h3 className={sectionTitle}>Skills</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.skills}
                  </p>
                </section>
              )}

              {form.projects && (
                <section className="mb-5">
                  <h3 className={sectionTitle}>Projects</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.projects}
                  </p>
                </section>
              )}

              {form.experience && (
                <section className="mb-5">
                  <h3 className={sectionTitle}>Experience</h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.experience}
                  </p>
                </section>
              )}

              {form.certifications && (
                <section>
                  <h3 className={sectionTitle}>
                    Certifications & Achievements
                  </h3>
                  <p className="text-slate-700 whitespace-pre-line leading-7">
                    {form.certifications}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm print:hidden">
          <h2 className="text-2xl font-bold mb-4">
            Free Online Resume Builder
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Resume Builder helps students and job seekers create a
            professional resume online. You can add personal details,
            education, skills, projects, internships, certifications and useful
            links such as LinkedIn, GitHub and portfolio websites.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            This resume maker is useful for college students, freshers,
            interns, freelancers and anyone preparing for placements or job
            applications. Choose a clean template, fill your details and print
            or save your resume as a PDF using your browser.
          </p>

          <p className="text-slate-600 leading-7">
            The tool works directly in your browser and does not require
            account registration or software installation.
          </p>
        </section>
      </div>
    </>
  );
}

export default ResumeBuilder;