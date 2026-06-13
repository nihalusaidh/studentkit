import { useState } from "react";
import ToolCard from "../components/ToolCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ToolNest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ToolNest is a free online toolkit for students that includes academic calculators, PDF tools, image tools, and resume building tools.",
        },
      },
      {
        "@type": "Question",
        name: "Are ToolNest tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest tools are free to use and do not require login or registration.",
        },
      },
      {
        "@type": "Question",
        name: "Can college students use ToolNest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest is designed for college, engineering, diploma, and university students.",
        },
      },
      {
        "@type": "Question",
        name: "What student tools are available on ToolNest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ToolNest includes CGPA Calculator, GPA Calculator, Attendance Calculator, Internal Marks Calculator, Resume Builder, image tools, and PDF tools.",
        },
      },
      {
        "@type": "Question",
        name: "Does ToolNest work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest is mobile-friendly and works on phones, tablets, laptops, and desktops.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ToolNest",
    url: "https://tools.nihalusaidh.com/",
    description:
      "Free online student tools, academic calculators, image tools, PDF tools, and resume builder.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tools.nihalusaidh.com/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolNest",
    url: "https://tools.nihalusaidh.com/",
  };

  return (
    <>
      <Helmet>
        <title>
          ToolNest - Free Student Tools, GPA, CGPA, PDF & Image Tools
        </title>

        <meta
          name="description"
          content="ToolNest offers free online student tools including CGPA Calculator, GPA Calculator, Attendance Calculator, Internal Marks Calculator, Resume Builder, PDF tools, and image tools."
        />

        <meta
          name="keywords"
          content="student tools, CGPA calculator, GPA calculator, attendance calculator, internal marks calculator, PDF tools, image tools, resume builder, ToolNest"
        />

        <link rel="canonical" href="https://tools.nihalusaidh.com/" />

        <meta
          property="og:title"
          content="ToolNest - Free Student Tools and Online Calculators"
        />

        <meta
          property="og:description"
          content="Free academic calculators, PDF tools, image tools, and resume builder for college students."
        />

        <meta property="og:url" content="https://tools.nihalusaidh.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ToolNest - Free Student Tools"
        />
        <meta
          name="twitter:description"
          content="Use free GPA, CGPA, attendance, internal marks, PDF, image, and resume tools."
        />

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-5">
        <section className="py-24 text-center">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            16+ Free Online Tools
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6">
            Free Student Tools for College & Engineering Students
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-8">
            ToolNest is an all-in-one free online toolkit for students. Use
            academic calculators, CGPA Calculator, GPA Calculator, Attendance
            Calculator, Internal Marks Calculator, Resume Builder, PDF tools,
            and image tools directly in your browser.
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

            <Link
              to="/resume-builder"
              className="border px-8 py-4 rounded-xl font-semibold hover:bg-slate-50"
            >
              Resume Builder
            </Link>
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

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">
            Popular Student Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicTools.slice(0, 4).map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
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

        <section className="mb-20 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-3xl font-bold mb-4">
            Why Use ToolNest?
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest is built to help students complete everyday academic and
            document tasks faster. Instead of visiting different websites for
            GPA calculation, CGPA calculation, attendance tracking, internal
            marks calculation, resume creation, PDF conversion, and image
            compression, students can use all essential tools in one place.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            The academic tools are especially useful for college and engineering
            students who need to calculate semester GPA, overall CGPA, minimum
            attendance percentage, internal marks, and required end semester
            marks. These tools are simple, fast, mobile-friendly, and designed
            for quick use before exams, assignments, interviews, and placement
            preparation.
          </p>

          <p className="text-slate-600 leading-7">
            ToolNest also includes browser-based image and PDF tools such as JPG
            to PDF, PDF to JPG, Merge PDF, Split PDF, Rotate PDF, Remove PDF
            Pages, Watermark PDF, Image Compressor, Image Converter, Image
            Resize, and Image Crop. Most tools work directly in your browser and
            are free to use.
          </p>
        </section>

        <section className="mb-20 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-3xl font-bold mb-4">
            ToolNest FAQs
          </h2>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-800">What is ToolNest?</h3>
              <p>
                ToolNest is a free online toolkit that provides student
                calculators, PDF tools, image tools, and resume tools.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Are ToolNest tools free?
              </h3>
              <p>
                Yes. ToolNest tools are free to use and do not require login or
                registration.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Which student tools are available?
              </h3>
              <p>
                ToolNest includes CGPA Calculator, GPA Calculator, Attendance
                Calculator, Internal Marks Calculator, and Resume Builder.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can engineering students use ToolNest?
              </h3>
              <p>
                Yes. ToolNest is useful for engineering, diploma, college, and
                university students.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Does ToolNest work on mobile?
              </h3>
              <p>
                Yes. ToolNest works on mobile, tablet, laptop, and desktop.
              </p>
            </div>
          </div>
        </section>

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
      </main>
    </>
  );
}

export default Home;