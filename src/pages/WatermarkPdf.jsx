import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument, rgb, degrees } from "pdf-lib";

function WatermarkPdf() {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("StudentKit");
  const [fontSize, setFontSize] = useState(40);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = (pdfFile) => {
    if (!pdfFile) return;

    if (pdfFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setFile(pdfFile);
    setDownloadUrl("");
    setSuccess(false);
  };

  const addWatermark = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    if (!watermarkText.trim()) {
      alert("Please enter watermark text.");
      return;
    }

    setLoading(true);
    setDownloadUrl("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();

        page.drawText(watermarkText, {
          x: width / 2 - watermarkText.length * fontSize * 0.2,
          y: height / 2,
          size: Number(fontSize),
          color: rgb(0.65, 0.65, 0.65),
          opacity: 0.35,
          rotate: degrees(-35),
        });
      });

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to add watermark to PDF.");
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
        <title>Watermark PDF Online Free | StudentKit</title>
        <meta
          name="description"
          content="Add text watermark to PDF files online for free. Upload a PDF, add watermark text and download instantly."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          Watermark added successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Watermark PDF
        </h1>

        <p className="text-slate-600 text-lg">
          Add a text watermark to every page of your PDF.
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
            <span className="text-5xl mb-3">💧</span>

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
                Ready to add watermark.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Watermark Settings</h2>

          <label className="font-medium">Watermark Text</label>
          <input
            className="border p-3 rounded w-full mt-2 mb-5"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder="Example: Confidential"
          />

          <label className="font-medium">Font Size</label>
          <input
            type="range"
            min="20"
            max="90"
            step="5"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full mt-3"
          />

          <p className="text-slate-600 mt-2">
            Size: {fontSize}px
          </p>

          <div className="bg-slate-50 p-5 rounded-xl mt-5 text-center border">
            <p className="text-slate-500 text-sm mb-2">Preview</p>
            <p className="text-3xl font-bold text-slate-400 rotate-[-15deg]">
              {watermarkText || "Watermark"}
            </p>
          </div>

          <button
            onClick={addWatermark}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Adding Watermark..." : "Add Watermark"}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="watermarked-document.pdf"
              className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download Watermarked PDF
            </a>
          )}

          {downloadUrl && (
            <div className="mt-6 bg-green-50 p-5 rounded-xl">
              <h2 className="font-bold text-xl text-green-700">
                Watermarked PDF Ready
              </h2>

              <p className="text-slate-600 mt-1">
                Your watermark has been added to all pages successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatermarkPdf;