import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Cropper from "react-easy-crop";

function ImageCrop() {
  const [imageSrc, setImageSrc] = useState("");
  const [fileName, setFileName] = useState("cropped-image.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, "image/jpeg");
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("Maximum file size is 20 MB.");
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setFileName(`cropped-${file.name}`);
    setDownloadUrl("");
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>
          Image Crop Tool Online | Crop JPG, PNG & WebP | ToolNest
        </title>

        <meta
          name="description"
          content="Crop JPG, PNG and WebP images online for free with ToolNest. Upload an image, adjust crop area, zoom, rotate and download instantly."
        />

        <meta
          name="keywords"
          content="Image Crop Tool, Crop Image Online, Crop JPG, Crop PNG, Crop WebP, Online Image Cropper, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/image-crop"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10 relative">
        {success && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50">
            Image cropped successfully!
          </div>
        )}

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Image Crop Tool
          </h1>

          <p className="text-slate-600 text-lg">
            Crop images online with zoom and rotation controls. Upload your JPG,
            PNG or WebP image, adjust the crop area and download the cropped
            image instantly.
          </p>
        </div>

        {!imageSrc && (
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
              <span className="text-5xl mb-3">✂️</span>

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
          </div>
        )}

        {imageSrc && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-5">Crop Area</h2>

              <div className="relative h-[420px] bg-slate-900 rounded-2xl overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-5">Crop Settings</h2>

              <label className="font-medium">Zoom</label>

              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full mt-2 mb-5"
              />

              <label className="font-medium">Rotation</label>

              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full mt-2 mb-5"
              />

              <button
                onClick={getCroppedImage}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Crop Image
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={fileName}
                  className="block text-center mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
                >
                  Download Cropped Image
                </a>
              )}

              <button
                onClick={() => {
                  setImageSrc("");
                  setDownloadUrl("");
                }}
                className="w-full mt-4 border px-6 py-3 rounded-xl font-semibold hover:bg-slate-50"
              >
                Upload Another Image
              </button>
            </div>
          </div>
        )}

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Free Online Image Cropper
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Image Crop Tool helps you crop photos and images directly
            in your browser. You can adjust the crop area, zoom level and
            rotation before downloading the final cropped image.
          </p>

          <p className="text-slate-600 leading-7">
            This tool is useful for profile pictures, document uploads, social
            media images, thumbnails, assignments and any situation where you
            need a clean cropped image quickly.
          </p>
        </section>
      </div>
    </>
  );
}

export default ImageCrop;