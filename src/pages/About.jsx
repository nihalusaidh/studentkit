import { Helmet } from "react-helmet-async";

function About() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <Helmet>
        <title>About StudentKit | Free Student Tools</title>
        <meta
          name="description"
          content="Learn about StudentKit, a free online toolkit for students with academic calculators, image tools and PDF tools."
        />
      </Helmet>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        About StudentKit
      </h1>

      <p className="text-lg text-slate-600 leading-8 mb-6">
        StudentKit is a free online toolkit built for students, creators and
        everyday users who need fast academic, image and PDF tools in one place.
      </p>

      <p className="text-lg text-slate-600 leading-8 mb-6">
        The platform includes tools such as CGPA Calculator, GPA Calculator,
        Attendance Calculator, Internal Marks Calculator, Resume Builder, Image
        Compressor, Image Converter, PDF Converter, Merge PDF, Split PDF and
        more.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Free to Use</h2>
          <p className="text-slate-600">
            Most tools work directly in your browser without paid software.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Student Friendly</h2>
          <p className="text-slate-600">
            Built with useful tools for college and university students.
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Fast & Simple</h2>
          <p className="text-slate-600">
            Clean interface, instant results and mobile-friendly design.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;