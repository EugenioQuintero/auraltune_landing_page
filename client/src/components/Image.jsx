import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Image = ({ publicId, width, height, alt, className }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // Read cloudName from .env
    },
  });

  // Log error if publicId is not provided
  if (!publicId) {
    console.error('Error: publicId is required to load an image from Cloudinary.');
    return null;
  }

  // Validate and provide default values for width and height
  const validWidth = width || 300; // Default width if not provided
  const validHeight = height || 300; // Default height if not provided

  // Generate Cloudinary image object using the validated dimensions
  const img = cld.image(publicId)
    .resize(fill().width(validWidth).height(validHeight)) // Use validated dimensions
    .format('auto')
    .quality('auto');

  return (
    <AdvancedImage
      cldImg={img}
      alt={alt || 'Image'} // Default alt text
      className={className}
    />
  );
};

export default Image;
