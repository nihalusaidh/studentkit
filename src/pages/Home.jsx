import { useState } from "react";
import ToolCard from "../components/ToolCard";
import { Helmet } from "react-helmet-async";

function Home() {
  const [search, setSearch] = useState("");

  const academicTools = [
    {
      title: "CGPA Calculator",
      description: "Calculate overall CGPA from completed semesters.",
      link: "/cgpa-calculator",
    },
    {
      title: "GPA Calculator",
      description: "Calculate semester GPA using credits and grades.",
      link: "/gpa-calculator",
    },
    {
      title: "Internal Marks Calculator",
      description: "Calculate internal marks and required external marks.",
      link: "/internal-marks-calculator",
    },
    {
      title: "Attendance Calculator",
      description: "Track attendance and find classes to attend.",
      link: "/attendance-calculator",
    },
    {
      title: "Resume Builder",
      description: "Build professional resumes quickly.",
      link: "/resume-builder",
    },
  ];

  const imageTools = [
    {
      title: "Image Compressor",
      description: "Compress JPG, PNG and WebP images.",
      link: "/image-compressor",
    },
    {
      title: "Image Converter",
      description: "Convert JPG, PNG and WebP images.",
      link: "/image-converter",
    },
    {
      title: "Image Resize",
      description: "Resize images to custom dimensions.",
      link: "/image-resize",
    },
    {
      title: "Image Crop",
      description: "Crop images online with zoom controls.",
      link: "/image-crop",
    },
  ];

  const pdfTools = [
    {
      title: "JPG to PDF",
      description: "Convert images into PDF documents.",
      link: "/jpg-to-pdf",
    },
    {
      title: "PDF to JPG",
      description: "Convert PDF pages into JPG images.",
      link: "/pdf-to-jpg",
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files.",
      link: "/merge-pdf",
    },
    {
      title: "Split PDF",
      description: "Extract selected pages from PDFs.",
      link: "/split-pdf",
    },
    {
      title: "Remove PDF Pages",
      description: "Delete unwanted pages from PDF files.",
      link: "/remove-pdf-pages",
    },
    {
      title: "Rotate PDF",
      description: "Rotate all or selected PDF pages.",
      link: "/rotate-pdf",
    },
    {
      title: "Watermark PDF",
      description: "Add text watermark to PDF documents.",
      link: "/watermark-pdf",
    },
  ];

  const allTools = [...academicTools, ...imageTools, ...pdfTools];

  const filteredTools = allTools.filter((tool) => {
    const text = `${tool.title} ${tool.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <>
      <Helmet>
        <title>StudentKit - Free Student, Image and PDF Tools</title>

        <meta
          name="description"
          content="Free online student tools, image tools and PDF tools including GPA calculator, CGPA calculator, PDF converters and more."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-5">
        <section className="py-24 text-center">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            16+ Free Online Tools
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6">
            StudentKit
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            All-in-One Toolkit for Students. Academic Calculators, Image Tools
            and PDF Tools — completely free and browser based.
          </p>

          <div className="mt-10 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search tools... example: GPA, PDF, image, attendance"
              className="w-full border bg-white px-5 py-4 rounded-2xl shadow-sm text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="#tools"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700"
            >
              Try Tools
            </a>

            <a
              href="/resume-builder"
              className="border px-8 py-4 rounded-xl font-semibold hover:bg-slate-50"
            >
              Resume Builder
            </a>
          </div>
        </section>

        <section className="grid md:grid-cols-4 gap-5 mb-20">
          <div className="bg-white p-6 rounded-2xl border text-center shadow-sm">
            <h2 className="text-4xl font-bold text-blue-600">16+</h2>
            <p className="text-slate-600 mt-2">Working Tools</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border text-center shadow-sm">
            <h2 className="text-4xl font-bold text-green-600">100%</h2>
            <p className="text-slate-600 mt-2">Free</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border text-center shadow-sm">
            <h2 className="text-4xl font-bold text-purple-600">Fast</h2>
            <p className="text-slate-600 mt-2">Browser Based</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border text-center shadow-sm">
            <h2 className="text-4xl font-bold text-orange-600">Mobile</h2>
            <p className="text-slate-600 mt-2">Friendly</p>
          </div>
        </section>

        {search.trim() && (
          <section id="tools" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Search Results</h2>

            {filteredTools.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools.map((tool, index) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border text-center">
                <h3 className="text-xl font-bold">No tools found</h3>
                <p className="text-slate-600 mt-2">
                  Try searching for GPA, PDF, image or attendance.
                </p>
              </div>
            )}
          </section>
        )}

        {!search.trim() && (
          <>
            <section id="tools" className="mb-20 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Academic Tools</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {academicTools.map((tool, index) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-6">Image Tools</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {imageTools.map((tool, index) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-bold mb-6">PDF Tools</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pdfTools.map((tool, index) => (
                  <ToolCard key={index} {...tool} />
                ))}
              </div>
            </section>
          </>
        )}

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Coming Soon</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-2">DOCX to PDF</h3>
              <p className="text-slate-600">Convert Word documents to PDF.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-2">PPTX to PDF</h3>
              <p className="text-slate-600">
                Convert PowerPoint files into PDFs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-xl mb-2">Real PDF Compression</h3>
              <p className="text-slate-600">
                Backend-powered advanced PDF compression.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;