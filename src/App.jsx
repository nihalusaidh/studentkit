import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import CGPACalculator from "./pages/CGPACalculator";
import GPACalculator from "./pages/GPACalculator";
import InternalCalculator from "./pages/InternalCalculator";
import AttendanceCalculator from "./pages/AttendanceCalculator";
import ResumeBuilder from "./pages/ResumeBuilder";

import ImageCompressor from "./pages/ImageCompressor";
import JpgToPng from "./pages/JpgToPng";
import PngToJpg from "./pages/PngToJpg";
import ImageResize from "./pages/ImageResize";
import ImageCrop from "./pages/ImageCrop";
import ImageConverter from "./pages/ImageConverter";

import JpgToPdf from "./pages/JpgToPdf";
import MergePdf from "./pages/MergePdf";
import SplitPdf from "./pages/SplitPdf";
import CompressPdf from "./pages/CompressPdf";
import PdfToJpg from "./pages/PdfToJpg";
import RemovePdfPages from "./pages/RemovePdfPages";
import RotatePdf from "./pages/RotatePdf";
import WatermarkPdf from "./pages/WatermarkPdf";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/cgpa-calculator" element={<CGPACalculator />} />
        <Route path="/gpa-calculator" element={<GPACalculator />} />
        <Route path="/internal-marks-calculator" element={<InternalCalculator />} />
        <Route path="/attendance-calculator" element={<AttendanceCalculator />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/image-converter" element={<ImageConverter />} />
        <Route path="/image-resize" element={<ImageResize />} />
        <Route path="/image-crop" element={<ImageCrop />} />
        <Route path="/jpg-to-png" element={<JpgToPng />} />
        <Route path="/png-to-jpg" element={<PngToJpg />} />

        <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
        <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
        <Route path="/merge-pdf" element={<MergePdf />} />
        <Route path="/split-pdf" element={<SplitPdf />} />
        <Route path="/compress-pdf" element={<CompressPdf />} />
        <Route path="/remove-pdf-pages" element={<RemovePdfPages />} />
        <Route path="/rotate-pdf" element={<RotatePdf />} />
        <Route path="/watermark-pdf" element={<WatermarkPdf />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />

        
      </Routes>

      <Footer />
    </>
  );
}

export default App;