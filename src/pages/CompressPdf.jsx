import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";

function CompressPdf() {
  const [file, setFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFile = (pdfFile) => {
    if (!pdfFile) return;

    if (pdfFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    if (pdfFile.size > 30 * 1024 * 1024) {
      alert("Maximum file size is 30 MB.");
      return;
    }

    setFile(pdfFile);
    setCompressedUrl("");
    setCompressedSize(0);
    setSuccess(false);
  };

  const compressPdf = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setCompressedUrl("");
    setCompressedSize(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([compressedBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setCompressedUrl(url);
      setCompressedSize(blob.size);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(
        "Compression failed. This PDF may be encrypted or not supported by browser compression."
      );
    }

    setLoading(false);
  };

  const savedPercent =
    file && compressedSize
      ? (((file.size - compressedSize) / file.size) * 100).toFixed(1)
      : 0;

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 relative">
      <Helmet>
        <title>Compress PDF Online Free | StudentKit</title>
        <meta
          name="description"
          content="Compress PDF files online for free. Reduce PDF file size in your browser and download instantly."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          PDF compressed successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Compress PDF
        </h1>

        <p className="text-slate-600 text-lg">
          Reduce PDF file size directly in your browser.
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
            <span className="text-5xl mb-3">🗜️</span>

            <p className="text-lg font-semibold">
              Drag and drop PDF here
            </p>

            <p className="text-slate-500 mt-1">or click to upload</p>

            <p className="text-sm text-slate-400 mt-3">
              PDF file only • Max 30 MB
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
                Original Size: {formatSize(file.size)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Compression Result</h2>

          <button
            onClick={compressPdf}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Compressing PDF..." : "Compress PDF"}
          </button>

          {compressedUrl && (
            <div className="mt-6 bg-green-50 p-5 rounded-xl">
              <h3 className="font-bold text-xl text-green-700">
                Compressed PDF Ready
              </h3>

              <p className="mt-2">
                Original Size: <b>{formatSize(file.size)}</b>
              </p>

              <p>
                New Size: <b>{formatSize(compressedSize)}</b>
              </p>

              <p className="text-green-700 font-semibold mt-2">
                Saved {savedPercent}% storage
              </p>

              <a
                href={compressedUrl}
                download="compressed-document.pdf"
                className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
              >
                Download Compressed PDF
              </a>
            </div>
          )}

          <div className="mt-6 bg-orange-50 p-4 rounded-xl text-sm text-slate-700">
            <b>Note:</b> Browser PDF compression works best for simple PDFs.
            Scanned image-heavy PDFs may need advanced server-side compression
            later.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompressPdf;