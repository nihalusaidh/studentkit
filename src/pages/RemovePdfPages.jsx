import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PDFDocument } from "pdf-lib";

function RemovePdfPages() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [removeRange, setRemoveRange] = useState("");
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
    setRemoveRange("");
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

  const removePages = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    if (!removeRange.trim()) {
      alert("Enter pages to remove. Example: 2,4,6-8");
      return;
    }

    const pagesToRemove = parsePages(removeRange);

    if (pagesToRemove.length === 0) {
      alert("No valid pages selected.");
      return;
    }

    if (pagesToRemove.length >= pageCount) {
      alert("You cannot remove all pages from the PDF.");
      return;
    }

    setLoading(true);
    setDownloadUrl("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const oldPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const keepPages = oldPdf
        .getPageIndices()
        .filter((pageIndex) => !pagesToRemove.includes(pageIndex));

      const copiedPages = await newPdf.copyPages(oldPdf, keepPages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to remove pages from PDF.");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>
          Remove PDF Pages Online Free | Delete Pages from PDF | ToolNest
        </title>

        <meta
          name="description"
          content="Remove unwanted pages from PDF files online for free. Delete specific pages or page ranges and download a new PDF instantly using ToolNest."
        />

        <meta
          name="keywords"
          content="Remove PDF Pages, Delete PDF Pages, PDF Page Remover, Remove Pages from PDF Online, Edit PDF, PDF Tools, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/remove-pdf-pages"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10 relative">
        {success && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
            Pages removed successfully!
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Remove PDF Pages Online
          </h1>

          <p className="text-slate-600 text-lg">
            Delete unwanted pages from your PDF file quickly and securely.
            Remove individual pages or page ranges and download a cleaned PDF
            document.
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
              <span className="text-5xl mb-3">🗑️</span>

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
            <h2 className="text-2xl font-bold mb-5">Pages to Remove</h2>

            <label className="font-medium">Enter page numbers</label>

            <input
              className="border p-3 rounded w-full mt-2"
              placeholder="Example: 2,4,6-8"
              value={removeRange}
              onChange={(e) => setRemoveRange(e.target.value)}
            />

            <p className="text-sm text-slate-500 mt-3">
              Use commas for separate pages and hyphen for ranges.
            </p>

            <button
              onClick={removePages}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Removing Pages..." : "Remove Pages"}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download="pdf-with-pages-removed.pdf"
                className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
              >
                Download New PDF
              </a>
            )}

            {downloadUrl && (
              <div className="mt-6 bg-green-50 p-5 rounded-xl">
                <h2 className="font-bold text-xl text-green-700">
                  PDF Successfully Updated
                </h2>

                <p className="text-slate-600 mt-1">
                  Selected pages were removed successfully.
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Remove Pages from PDF Online
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Remove PDF Pages tool helps you delete unwanted pages from
            PDF documents quickly and easily. Upload your PDF, specify page
            numbers or page ranges, and generate a new PDF without those pages.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            This tool is useful for removing blank pages, unwanted scans,
            confidential information, duplicate pages, or unnecessary content
            from PDF documents before sharing them.
          </p>

          <p className="text-slate-600 leading-7">
            Everything is processed directly in your browser. No registration,
            software installation, or external uploads are required.
          </p>
        </section>
      </div>
    </>
  );
}

export default RemovePdfPages;