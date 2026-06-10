import { useState } from "react";
import { Helmet } from "react-helmet-async";
import jsPDF from "jspdf";

function JpgToPdf() {
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFiles = (files) => {
    const selectedFiles = Array.from(files);

    const validImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImages.length === 0) {
      alert("Please upload JPG, PNG or WebP images.");
      return;
    }

    const imageObjects = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imageObjects]);
    setPdfUrl("");
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPdfUrl("");
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);
    setPdfUrl("");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;

    for (let i = 0; i < images.length; i++) {
      const imgData = await readFileAsDataURL(images[i].file);

      const img = new Image();
      img.src = imgData;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      if (i > 0) pdf.addPage();

      pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);
    }

    const pdfBlob = pdf.output("blob");
    const newPdfUrl = URL.createObjectURL(pdfBlob);

    setPdfUrl(newPdfUrl);
    setLoading(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <>
      <Helmet>
        <title>
          JPG to PDF Converter Online | Convert Images to PDF | ToolNest
        </title>

        <meta
          name="description"
          content="Convert JPG, PNG and WebP images to PDF online for free. Merge multiple images into a single PDF document instantly with ToolNest."
        />

        <meta
          name="keywords"
          content="JPG to PDF, PNG to PDF, Image to PDF Converter, Convert Images to PDF, Online PDF Converter, Free JPG to PDF Tool, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/jpg-to-pdf"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10 relative">
        {success && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
            PDF created successfully!
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            JPG to PDF Converter
          </h1>

          <p className="text-slate-600 text-lg">
            Convert JPG, PNG and WebP images into high-quality PDF files online.
            Upload multiple images and merge them into a single PDF document
            instantly.
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
            <span className="text-5xl mb-3">📄</span>

            <p className="text-lg font-semibold">
              Drag and drop images here
            </p>

            <p className="text-slate-500 mt-1">or click to upload</p>

            <p className="text-sm text-slate-400 mt-3">
              JPG, PNG, WebP supported • Multiple images allowed
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>

          {images.length > 0 && (
            <>
              <div className="mt-6 bg-blue-50 p-4 rounded-xl">
                <p className="font-semibold">
                  {images.length} image{images.length > 1 ? "s" : ""} selected
                </p>

                <p className="text-slate-600 text-sm">
                  Each image will become one PDF page.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mt-8">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-3 bg-slate-50"
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="h-40 w-full object-contain rounded bg-white"
                    />

                    <p className="text-sm mt-2 truncate">
                      {image.file.name}
                    </p>

                    <button
                      onClick={() => removeImage(index)}
                      className="mt-3 w-full bg-red-50 text-red-600 py-2 rounded-lg font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={generatePdf}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Creating PDF..." : "Convert to PDF"}
                </button>

                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download="images-to-pdf.pdf"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
                  >
                    Download PDF
                  </a>
                )}
              </div>

              {pdfUrl && (
                <div className="mt-6 bg-green-50 p-5 rounded-xl">
                  <h2 className="font-bold text-xl text-green-700">
                    PDF Ready
                  </h2>

                  <p className="text-slate-600 mt-1">
                    Your PDF has been created successfully. Click Download PDF
                    to save it.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Free JPG to PDF Converter
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest JPG to PDF Converter allows you to convert JPG, PNG and
            WebP images into PDF documents directly in your browser. Each
            uploaded image becomes a separate page inside the PDF file.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            This tool is useful for assignment submissions, scanned documents,
            certificates, ID proofs, reports and image collections that need to
            be shared as PDF files.
          </p>

          <p className="text-slate-600 leading-7">
            Upload one or multiple images, generate the PDF instantly and
            download it without creating an account or installing software.
          </p>
        </section>
      </div>
    </>
  );
}

export default JpgToPdf;