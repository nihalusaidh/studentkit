import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFiles = (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    if (pdfFiles.length === 0) {
      alert("Please upload PDF files only.");
      return;
    }

    const fileObjects = pdfFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
    }));

    setFiles((prev) => [...prev, ...fileObjects]);
    setMergedPdfUrl("");
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedPdfUrl("");
  };

  const moveFile = (index, direction) => {
    const updated = [...files];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= updated.length) return;

    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    setFiles(updated);
    setMergedPdfUrl("");
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }

    setLoading(true);
    setMergedPdfUrl("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setMergedPdfUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to merge PDFs. Try different PDF files.");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 relative">
      <Helmet>
        <title>Merge PDF Online Free | ToolNest</title>
        <meta
          name="description"
          content="Merge multiple PDF files into one PDF online for free. Upload, reorder and combine PDFs instantly."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          PDF files merged successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Merge PDF
        </h1>

        <p className="text-slate-600 text-lg">
          Combine multiple PDF files into one document.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
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
          <span className="text-5xl mb-3">📚</span>

          <p className="text-lg font-semibold">
            Drag and drop PDF files here
          </p>

          <p className="text-slate-500 mt-1">or click to upload</p>

          <p className="text-sm text-slate-400 mt-3">
            PDF files only • Multiple files allowed
          </p>

          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {files.length > 0 && (
          <>
            <div className="mt-6 bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold">
                {files.length} PDF file{files.length > 1 ? "s" : ""} selected
              </p>
              <p className="text-slate-600 text-sm">
                Use move buttons to arrange the merge order.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {files.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 border p-4 rounded-xl bg-slate-50"
                >
                  <div>
                    <p className="font-semibold">
                      {index + 1}. {item.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      Size: {formatSize(item.size)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => moveFile(index, -1)}
                      className="px-3 py-2 rounded-lg border hover:bg-white"
                    >
                      ↑
                    </button>

                    <button
                      onClick={() => moveFile(index, 1)}
                      className="px-3 py-2 rounded-lg border hover:bg-white"
                    >
                      ↓
                    </button>

                    <button
                      onClick={() => removeFile(index)}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={mergePdfs}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Merging PDFs..." : "Merge PDF Files"}
              </button>

              {mergedPdfUrl && (
                <a
                  href={mergedPdfUrl}
                  download="merged-document.pdf"
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
                >
                  Download Merged PDF
                </a>
              )}
            </div>

            {mergedPdfUrl && (
              <div className="mt-6 bg-green-50 p-5 rounded-xl">
                <h2 className="font-bold text-xl text-green-700">
                  Merged PDF Ready
                </h2>

                <p className="text-slate-600 mt-1">
                  Your PDF files have been combined successfully.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MergePdf;