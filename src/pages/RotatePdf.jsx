import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument, degrees } from "pdf-lib";

function RotatePdf() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotation, setRotation] = useState(90);
  const [pageRange, setPageRange] = useState("all");
  const [downloadUrl, setDownloadUrl] = useState("");
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
    setDownloadUrl("");
    setSuccess(false);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    } catch (error) {
      alert("Could not read this PDF file.");
    }
  };

  const parsePages = (rangeText) => {
    if (rangeText.toLowerCase() === "all") {
      return Array.from({ length: pageCount }, (_, i) => i);
    }

    const pages = new Set();

    rangeText.split(",").forEach((part) => {
      const trimmed = part.trim();

      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(Number);

        if (!start || !end) return;

        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= pageCount) pages.add(i - 1);
        }
      } else {
        const page = Number(trimmed);
        if (page >= 1 && page <= pageCount) pages.add(page - 1);
      }
    });

    return Array.from(pages);
  };

  const rotatePdf = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    const pagesToRotate = parsePages(pageRange);

    if (pagesToRotate.length === 0) {
      alert("No valid pages selected.");
      return;
    }

    setLoading(true);
    setDownloadUrl("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      pagesToRotate.forEach((pageIndex) => {
        const page = pdf.getPage(pageIndex);
        const currentRotation = page.getRotation().angle || 0;
        page.setRotation(degrees((currentRotation + Number(rotation)) % 360));
      });

      const pdfBytes = await pdf.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to rotate PDF.");
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
        <title>Rotate PDF Online Free | ToolNest</title>
        <meta
          name="description"
          content="Rotate PDF pages online for free. Upload a PDF, rotate all pages or selected pages, and download instantly."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          PDF rotated successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Rotate PDF
        </h1>

        <p className="text-slate-600 text-lg">
          Rotate all pages or selected pages in your PDF.
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
            <span className="text-5xl mb-3">🔄</span>

            <p className="text-lg font-semibold">Drag and drop PDF here</p>

            <p className="text-slate-500 mt-1">or click to upload</p>

            <p className="text-sm text-slate-400 mt-3">PDF file only</p>

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
          <h2 className="text-2xl font-bold mb-5">Rotation Settings</h2>

          <label className="font-medium">Rotation Angle</label>
          <select
            className="border p-3 rounded w-full mt-2 mb-5"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          >
            <option value={90}>90° Clockwise</option>
            <option value={180}>180°</option>
            <option value={270}>270° Clockwise</option>
          </select>

          <label className="font-medium">Pages to Rotate</label>
          <input
            className="border p-3 rounded w-full mt-2"
            placeholder="all or Example: 1,3,5-7"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
          />

          <p className="text-sm text-slate-500 mt-3">
            Type <b>all</b> to rotate every page, or use page numbers like{" "}
            <b>1,3,5-7</b>.
          </p>

          <button
            onClick={rotatePdf}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Rotating PDF..." : "Rotate PDF"}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="rotated-document.pdf"
              className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download Rotated PDF
            </a>
          )}

          {downloadUrl && (
            <div className="mt-6 bg-green-50 p-5 rounded-xl">
              <h2 className="font-bold text-xl text-green-700">
                Rotated PDF Ready
              </h2>

              <p className="text-slate-600 mt-1">
                Your selected PDF pages were rotated successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RotatePdf;