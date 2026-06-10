import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const academicTools = [
    { icon: "🎓", name: "CGPA Calculator", link: "/cgpa-calculator" },
    { icon: "📊", name: "GPA Calculator", link: "/gpa-calculator" },
    { icon: "🧮", name: "Internal Calculator", link: "/internal-marks-calculator" },
    { icon: "📅", name: "Attendance Calculator", link: "/attendance-calculator" },
  ];

  const imageTools = [
    { icon: "🗜️", name: "Image Compressor", link: "/image-compressor" },
    { icon: "🔄", name: "Image Converter", link: "/image-converter" },
    { icon: "📐", name: "Image Resize", link: "/image-resize" },
    { icon: "✂️", name: "Image Crop", link: "/image-crop" },
  ];

  const pdfTools = [
    { icon: "🖼️", name: "JPG to PDF", link: "/jpg-to-pdf" },
    { icon: "🖼️", name: "PDF to JPG", link: "/pdf-to-jpg" },
    { icon: "📚", name: "Merge PDF", link: "/merge-pdf" },
    { icon: "✂️", name: "Split PDF", link: "/split-pdf" },
    { icon: "🗑️", name: "Remove PDF Pages", link: "/remove-pdf-pages" },
    { icon: "🔄", name: "Rotate PDF", link: "/rotate-pdf" },
    { icon: "💧", name: "Watermark PDF", link: "/watermark-pdf" },
  ];

  const Dropdown = ({ title, items }) => (
    <div className="relative group">
      <button className="py-3 hover:text-blue-600">{title} ▾</button>

      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-72 p-3 max-h-[420px] overflow-y-auto">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-lg">
                {item.icon}
              </span>

              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const closeMenu = () => setMenuOpen(false);

  const MobileToolLink = ({ item }) => (
    <Link
      to={item.link}
      onClick={closeMenu}
      className="flex items-center gap-3 pl-4 py-2 text-slate-600"
    >
      <span>{item.icon}</span>
      <span>{item.name}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-blue-600"
        >
          ToolNest
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-700 items-center">
          <Link to="/" className="hover:text-blue-600 py-3">
            Home
          </Link>

          <Dropdown title="Academic Tools" items={academicTools} />
          <Dropdown title="Image Tools" items={imageTools} />
          <Dropdown title="PDF Tools" items={pdfTools} />

          <Link to="/resume-builder" className="hover:text-blue-600 py-3">
            Resume
          </Link>
        </div>

        <a
          href="/#tools"
          className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-blue-700"
        >
          Try Tools
        </a>

        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-5 py-4 space-y-3">
          <Link to="/" onClick={closeMenu} className="block font-semibold">
            Home
          </Link>

          <p className="font-bold text-slate-700 pt-2">Academic Tools</p>
          {academicTools.map((item, index) => (
            <MobileToolLink key={index} item={item} />
          ))}

          <p className="font-bold text-slate-700 pt-2">Image Tools</p>
          {imageTools.map((item, index) => (
            <MobileToolLink key={index} item={item} />
          ))}

          <p className="font-bold text-slate-700 pt-2">PDF Tools</p>
          {pdfTools.map((item, index) => (
            <MobileToolLink key={index} item={item} />
          ))}

          <Link
            to="/resume-builder"
            onClick={closeMenu}
            className="block font-semibold pt-2"
          >
            Resume Builder
          </Link>

          <a
            href="/#tools"
            onClick={closeMenu}
            className="block bg-blue-600 text-white text-center px-5 py-3 rounded-xl font-semibold"
          >
            Try Tools
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;