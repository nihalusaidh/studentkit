import { useState } from "react";
import { Helmet } from "react-helmet-async";
import imageCompression from "browser-image-compression";

function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleCompress = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("Maximum file size is 20 MB");
      return;
    }

    setOriginalFile(file);
    setCompressedFile(null);
    setCompressedUrl("");
    setShowSuccess(false);
    setLoading(true);

    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 2500,
        useWebWorker: true,
        initialQuality: Number(quality),
      };

      const compressed = await imageCompression(file, options);

      setCompressedFile(compressed);
      setCompressedUrl(URL.createObjectURL(compressed));
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Image compression failed. Try another image.");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleCompress(file);
  };

  const savedPercent =
    originalFile && compressedFile
      ? (
          ((originalFile.size - compressedFile.size) / originalFile.size) *
          100
        ).toFixed(1)
      : 0;

  return (
    <>
      <Helmet>
        <title>
          Image Compressor Online | Compress JPG, PNG & WebP | ToolNest
        </title>

        <meta
          name="description"
          content="Compress JPG, PNG and WebP images online for free with ToolNest. Reduce image file size instantly in your browser without installing software."
        />

        <meta
          name="keywords"
          content="Image Compressor, Compress JPG, Compress PNG, Compress WebP, Online Image Compressor, Reduce Image Size, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/image-compressor"
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-5 py-10 relative">
        {showSuccess && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
            Image compressed successfully!
          </div>
        )}

        <h1 className="text-4xl font-bold mb-3">
          Image Compressor
        </h1>

        <p className="text-slate-600 mb-8">
          Compress JPG, PNG and WebP images online for free. Reduce image file
          size directly in your browser while keeping good visual quality.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <label className="font-medium">Compression Quality</label>

          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full mt-3"
          />

          <p className="text-slate-600 mt-2">
            Quality: {(quality * 100).toFixed(0)}%
          </p>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`mt-6 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer transition ${
              dragActive
                ? "border-blue-600 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <span className="text-4xl mb-3">📁</span>

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
              onChange={(e) => handleCompress(e.target.files[0])}
            />
          </label>

          {loading && (
            <p className="mt-5 text-blue-600 font-semibold">
              Compressing image...
            </p>
          )}

          {originalFile && compressedFile && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-50 p-5 rounded-xl">
                <h2 className="font-bold text-xl mb-3">Original Image</h2>

                <p>File name: {originalFile.name}</p>

                <p>Size: {formatSize(originalFile.size)}</p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl">
                <h2 className="font-bold text-xl mb-3">
                  Compressed Image
                </h2>

                <p>Size: {formatSize(compressedFile.size)}</p>

                <p className="mt-2 text-green-700 font-semibold">
                  Saved {savedPercent}% storage
                </p>

                <a
                  href={compressedUrl}
                  download={`compressed-${originalFile.name}`}
                  className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Download Image
                </a>
              </div>
            </div>
          )}
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Free Online Image Compressor
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Image Compressor helps you reduce the file size of JPG,
            PNG and WebP images instantly. This is useful for website images,
            assignment uploads, social media posts, email attachments and
            forms with file size limits.
          </p>

          <p className="text-slate-600 leading-7">
            Your image is compressed directly in your browser, so the process is
            fast and simple. Adjust the compression quality slider, upload your
            image, and download the compressed image in seconds.
          </p>
        </section>
      </div>
    </>
  );
}

export default ImageCompressor;