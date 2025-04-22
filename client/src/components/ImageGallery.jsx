import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageGallery = ({ images }) => {
  return (
    <div className="max-h-[600px] overflow-y-scroll scrollbar-hide">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((image) => (
          <div
            key={image.publicId}
            className="mb-4 break-inside-avoid group relative overflow-hidden"
          >
            <Zoom>
              <img
                src={`https://res.cloudinary.com/dchxrai89/image/upload/${image.publicId}`}
                alt={image.title}
                className="w-full h-auto object-cover rounded-lg cursor-pointer"
              />

            </Zoom>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
