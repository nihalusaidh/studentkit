import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";

function SplitPdf() {
  const [file, setFile] = useState(null);
  const [pageRange, setPageRange] = useState("");
  const [splitPdfUrl, setSplitPdfUrl] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = async (pdfFile) => {
    if (!pdfFile) return;

    if (pdfFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setFile(pdfFile);
    setSplitPdfUrl("");
    setPageRange("");

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    } catch (error) {
      alert("Could not read this PDF file.");
    }
  };

  const parsePages = (rangeText) => {
    const pages = new Set();

    rangeText.split(",").forEach((part) => {
      const trimmed = part.trim();

      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number);

        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= pageCount) pages.add(i - 1);
        }
      } else {
        const page = Number(trimmed);
        if (page >= 1 && page <= pageCount) pages.add(page - 1);
      }
    });

    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    if (!pageRange.trim()) {
      alert("Please enter page numbers. Example: 1,3,5-7");
      return;
    }

    const selectedPages = parsePages(pageRange);

    if (selectedPages.length === 0) {
      alert("No valid pages selected.");
      return;
    }

    setLoading(true);
    setSplitPdfUrl("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, selectedPages);

      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setSplitPdfUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to split PDF.");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 relative">
      <Helmet>
        <title>Split PDF Online Free | StudentKit</title>
        <meta
          name="description"
          content="Split PDF files online for free. Extract selected pages from a PDF and download a new PDF instantly."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          PDF split successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Split PDF
        </h1>

        <p className="text-slate-600 text-lg">
          Extract selected pages from a PDF file.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Upload PDF</h2>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-14 cursor-pointer transition ${
              dragActive
                ? "border-blue-600 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <span className="text-5xl mb-3">✂️</span>

            <p className="text-lg font-semibold">
              Drag and drop PDF here
            </p>

            <p className="text-slate-500 mt-1">or click to upload</p>

            <p className="text-sm text-slate-400 mt-3">
              PDF file only
            </p>

            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>

          {file && (
            <div className="mt-5 bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold">{file.name}</p>
              <p className="text-slate-600 text-sm">
                Total Pages: {pageCount}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Select Pages</h2>

          <label className="font-medium">
            Page Range
          </label>

          <input
            className="border p-3 rounded w-full mt-2"
            placeholder="Example: 1,3,5-7"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
          />

          <p className="text-sm text-slate-500 mt-3">
            Use commas for separate pages and hyphen for range.
          </p>

          <button
            onClick={splitPdf}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Splitting PDF..." : "Split PDF"}
          </button>

          {splitPdfUrl && (
            <a
              href={splitPdfUrl}
              download="split-document.pdf"
              className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download Split PDF
            </a>
          )}

          {splitPdfUrl && (
            <div className="mt-6 bg-green-50 p-5 rounded-xl">
              <h2 className="font-bold text-xl text-green-700">
                Split PDF Ready
              </h2>

              <p className="text-slate-600 mt-1">
                Your selected pages have been extracted successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SplitPdf;