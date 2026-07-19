import React, { useState } from "react";

/*
  FIX: Removed styled-components entirely — it is not in package.json
  and would cause a runtime crash. Replaced all styled components
  with equivalent Tailwind utility classes.
*/

function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Gallery Container */}
      <div className="flex flex-col gap-3 sm:max-w-[200px]">

        {/* Main Image */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br from-slate-100 to-white aspect-[9/16] relative sm:max-w-[200px] sm:max-h-[400px] group"
        >
          <img
            src={images[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-contain block transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 flex-wrap justify-center sm:max-w-[200px]">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-[50px] h-[80px] sm:w-[40px] sm:h-[60px] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 border-2 ${
                index === currentIndex
                  ? "opacity-100 border-[#667eea]"
                  : "opacity-60 border-transparent hover:opacity-100 hover:border-[#667eea]"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-w-[90vw] max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-8 -right-8 bg-background border-none rounded-full w-10 h-10 flex items-center justify-center text-2xl cursor-pointer text-[#667eea] font-bold hover:bg-slate-100 transition-colors"
            >
              ×
            </button>

            <img
              src={images[currentIndex]}
              alt={`Full screenshot ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 -left-8 -translate-y-1/2 bg-background/90 hover:bg-background border-none rounded-full w-[50px] h-[50px] flex items-center justify-center text-2xl cursor-pointer text-[#667eea] font-bold transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 -right-8 -translate-y-1/2 bg-background/90 hover:bg-background border-none rounded-full w-[50px] h-[50px] flex items-center justify-center text-2xl cursor-pointer text-[#667eea] font-bold transition-colors"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
