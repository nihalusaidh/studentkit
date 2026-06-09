import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-blue-400">StudentKit</h2>

            <p className="text-slate-400 mt-3">
              Free academic, image and PDF tools for students and creators.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Academic Tools</h3>

            <div className="space-y-2 text-slate-400">
              <Link to="/cgpa-calculator" className="block hover:text-white">
                CGPA Calculator
              </Link>

              <Link to="/gpa-calculator" className="block hover:text-white">
                GPA Calculator
              </Link>

              <Link to="/attendance-calculator" className="block hover:text-white">
                Attendance Calculator
              </Link>

              <Link
                to="/internal-marks-calculator"
                className="block hover:text-white"
              >
                Internal Marks
              </Link>

              <Link to="/resume-builder" className="block hover:text-white">
                Resume Builder
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">PDF Tools</h3>

            <div className="space-y-2 text-slate-400">
              <Link to="/jpg-to-pdf" className="block hover:text-white">
                JPG to PDF
              </Link>

              <Link to="/pdf-to-jpg" className="block hover:text-white">
                PDF to JPG
              </Link>

              <Link to="/merge-pdf" className="block hover:text-white">
                Merge PDF
              </Link>

              <Link to="/split-pdf" className="block hover:text-white">
                Split PDF
              </Link>

              <Link to="/remove-pdf-pages" className="block hover:text-white">
                Remove PDF Pages
              </Link>

              <Link to="/rotate-pdf" className="block hover:text-white">
                Rotate PDF
              </Link>

              <Link to="/watermark-pdf" className="block hover:text-white">
                Watermark PDF
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Image & Company</h3>

            <div className="space-y-2 text-slate-400">
              <Link to="/image-compressor" className="block hover:text-white">
                Image Compressor
              </Link>

              <Link to="/image-converter" className="block hover:text-white">
                Image Converter
              </Link>

              <Link to="/image-resize" className="block hover:text-white">
                Image Resize
              </Link>

              <Link to="/image-crop" className="block hover:text-white">
                Image Crop
              </Link>

              <Link to="/about" className="block hover:text-white">
                About
              </Link>

              <Link to="/privacy-policy" className="block hover:text-white">
                Privacy Policy
              </Link>

              <Link to="/terms" className="block hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
          © 2026 StudentKit. Built by Nihal Usaidh.
        </div>
      </div>
    </footer>
  );
}

export default Footer;