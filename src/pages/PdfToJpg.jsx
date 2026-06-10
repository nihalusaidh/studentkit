import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (pdfFile) => {
    if (!pdfFile) return;

    if (pdfFile.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setFile(pdfFile);
    setImages([]);
    setSuccess(false);
  };

  const convertPdfToJpg = async () => {
    if (!file) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setImages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await getDocument({
        data: arrayBuffer,
      }).promise;

      const convertedImages = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const imageUrl = canvas.toDataURL("image/jpeg", 0.95);

        convertedImages.push({
          page: pageNumber,
          url: imageUrl,
        });
      }

      setImages(convertedImages);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("PDF to JPG conversion failed. Try another PDF.");
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
          PDF to JPG Converter Online Free | Convert PDF Pages to Images |
          ToolNest
        </title>

        <meta
          name="description"
          content="Convert PDF pages to high-quality JPG images online for free. Upload a PDF file and download each page as a JPG image instantly using ToolNest."
        />

        <meta
          name="keywords"
          content="PDF to JPG, PDF to Image, Convert PDF to JPG, PDF Converter Online, PDF Pages to Images, Free PDF to JPG Tool, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/pdf-to-jpg"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10 relative">
        {success && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
            PDF converted to JPG successfully!
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            PDF to JPG Converter Online
          </h1>

          <p className="text-slate-600 text-lg">
            Convert PDF pages into high-quality JPG images instantly. Extract
            every page from your PDF document and download them as separate JPG
            files.
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
            <span className="text-5xl mb-3">🖼️</span>

            <p className="text-lg font-semibold">Drag and drop PDF here</p>

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
            <div className="mt-6 bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold">{file.name}</p>

              <p className="text-sm text-slate-600">
                Ready to convert into JPG images.
              </p>
            </div>
          )}

          {file && (
            <button
              onClick={convertPdfToJpg}
              disabled={loading}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Converting PDF..." : "Convert PDF to JPG"}
            </button>
          )}

          {images.length > 0 && (
            <div className="mt-8">
              <div className="bg-green-50 p-5 rounded-xl mb-6">
                <h2 className="font-bold text-xl text-green-700">
                  PDF Successfully Converted to JPG Images
                </h2>

                <p className="text-slate-600 mt-1">
                  {images.length} page{images.length > 1 ? "s" : ""} converted
                  successfully.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {images.map((img) => (
                  <div
                    key={img.page}
                    className="border rounded-xl p-4 bg-slate-50"
                  >
                    <img
                      src={img.url}
                      alt={`PDF page ${img.page} converted to JPG`}
                      className="h-64 w-full object-contain bg-white rounded border"
                    />

                    <p className="font-semibold mt-3">
                      Page {img.page}
                    </p>

                    <a
                      href={img.url}
                      download={`page-${img.page}.jpg`}
                      className="block text-center mt-3 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Download JPG
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Free PDF to JPG Converter
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest PDF to JPG Converter allows you to convert PDF pages into
            high-quality JPG images directly in your browser. Each page of the
            PDF is extracted and converted into a separate JPG image.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            This tool is useful for students, professionals, designers and
            anyone who needs to convert PDF documents into image files for
            presentations, reports, social media or document sharing.
          </p>

          <p className="text-slate-600 leading-7">
            No software installation or registration is required. Simply upload
            your PDF file, convert it instantly and download the JPG images.
          </p>
        </section>
      </div>
    </>
  );
}

export default PdfToJpg;