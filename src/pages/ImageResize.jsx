import { useState } from "react";
import { Helmet } from "react-helmet-async";

function ImageResize() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [originalWidth, setOriginalWidth] = useState("");
  const [originalHeight, setOriginalHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

    const url = URL.createObjectURL(imageFile);
    const img = new Image();

    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };

    img.src = url;

    setFile(imageFile);
    setPreviewUrl(url);
    setDownloadUrl("");
    setSuccess(false);
  };

  const handleWidthChange = (value) => {
    setWidth(value);

    if (keepRatio && originalWidth && originalHeight) {
      const newHeight = Math.round((Number(value) * originalHeight) / originalWidth);
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (value) => {
    setHeight(value);

    if (keepRatio && originalWidth && originalHeight) {
      const newWidth = Math.round((Number(value) * originalWidth) / originalHeight);
      setWidth(newWidth);
    }
  };

  const setPreset = (w, h) => {
    setWidth(w);
    setHeight(h);
  };

  const resizeImage = () => {
    if (!file || !width || !height) {
      alert("Please upload an image and enter width & height.");
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

        canvas.width = Number(width);
        canvas.height = Number(height);

        ctx.drawImage(img, 0, 0, Number(width), Number(height));

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setLoading(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }, file.type);
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
        <title>Free Image Resize Tool Online | ToolNest</title>
        <meta
          name="description"
          content="Resize JPG, PNG and WebP images online with custom width and height. Free browser-based image resizer."
        />
      </Helmet>

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
          Image resized successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Image Resize Tool
        </h1>

        <p className="text-slate-600 text-lg">
          Resize images to custom dimensions instantly.
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
            <span className="text-5xl mb-3">📐</span>

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

          {previewUrl && (
            <div className="mt-6">
              <h3 className="font-bold mb-3">Preview</h3>

              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-72 w-full object-contain rounded-xl bg-slate-50 border"
              />

              <p className="text-sm text-slate-600 mt-3">
                Original size: {originalWidth} × {originalHeight}px
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">Resize Settings</h2>

          <label className="flex items-center gap-2 mb-5">
            <input
              type="checkbox"
              checked={keepRatio}
              onChange={(e) => setKeepRatio(e.target.checked)}
            />
            Keep aspect ratio
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Width"
              className="border p-3 rounded"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
            />

            <input
              type="number"
              placeholder="Height"
              className="border p-3 rounded"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
            />
          </div>

          <h3 className="font-bold mt-6 mb-3">Quick Presets</h3>

          <div className="grid md:grid-cols-2 gap-3">
            <button
              onClick={() => setPreset(1080, 1080)}
              className="border p-3 rounded-xl hover:bg-blue-50"
            >
              Instagram Post 1080×1080
            </button>

            <button
              onClick={() => setPreset(1080, 1920)}
              className="border p-3 rounded-xl hover:bg-blue-50"
            >
              Instagram Story 1080×1920
            </button>

            <button
              onClick={() => setPreset(1280, 720)}
              className="border p-3 rounded-xl hover:bg-blue-50"
            >
              YouTube Thumbnail 1280×720
            </button>

            <button
              onClick={() => setPreset(1920, 1080)}
              className="border p-3 rounded-xl hover:bg-blue-50"
            >
              HD 1920×1080
            </button>
          </div>

          <button
            onClick={resizeImage}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Resizing..." : "Resize Image"}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="resized-image"
              className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Download Resized Image
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageResize;