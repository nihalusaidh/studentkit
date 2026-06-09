import { useState } from "react";
import { Helmet } from "react-helmet-async";

function ImageConverter() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputFormat, setOutputFormat] = useState("png");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFile = (imageFile) => {
    if (!imageFile) return;

    if (!imageFile.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (imageFile.size > 20 * 1024 * 1024) {
      alert("Maximum file size is 20 MB.");
      return;
    }

    setFile(imageFile);
    setPreviewUrl(URL.createObjectURL(imageFile));
    setDownloadUrl("");
    setSuccess(false);
  };

  const convertImage = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        if (outputFormat === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${outputFormat}`;

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
            setLoading(false);
            setSuccess(true);

            setTimeout(() => setSuccess(false), 3000);
          },
          mimeType,
          0.95
        );
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 relative">
      <Helmet>
        <title>Free Image Converter Online | StudentKit</title>
        <meta
          name="description"
          content="Convert JPG, PNG and WebP images online for free using a fast browser-based image converter."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          Image converted successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Universal Image Converter
        </h1>

        <p className="text-slate-600 text-lg">
          Convert JPG, PNG and WebP images instantly in your browser.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Upload Image</h2>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer transition ${
              dragActive
                ? "border-blue-600 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <span className="text-5xl mb-3">🖼️</span>

            <p className="text-lg font-semibold">
              Drag and drop your image here
            </p>

            <p className="text-slate-500 mt-1">or click to upload</p>

            <p className="text-sm text-slate-400 mt-3">
              JPG, PNG, WebP supported • Max 20 MB
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>

          {file && (
            <div className="mt-5 bg-slate-50 p-4 rounded-xl">
              <p className="font-semibold">{file.name}</p>
              <p className="text-slate-600 text-sm">
                Size: {formatSize(file.size)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Convert Settings</h2>

          <label className="font-medium">Output Format</label>

          <select
            className="border p-3 rounded w-full mt-2"
            value={outputFormat}
            onChange={(e) => {
              setOutputFormat(e.target.value);
              setDownloadUrl("");
            }}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WEBP</option>
          </select>

          <button
            onClick={convertImage}
            disabled={loading}
            className="mt-5 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Converting..." : "Convert Image"}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`converted.${outputFormat === "jpeg" ? "jpg" : outputFormat}`}
              className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download Converted Image
            </a>
          )}

          {previewUrl && (
            <div className="mt-6">
              <h3 className="font-bold mb-3">Preview</h3>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-72 w-full object-contain rounded-xl bg-slate-50 border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageConverter;