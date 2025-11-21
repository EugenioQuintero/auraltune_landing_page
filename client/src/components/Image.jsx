import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const Image = ({ publicId, width, height, alt, className, loading = 'lazy' }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  if (!publicId) {
    console.error('Error: publicId is required to load an image from Cloudinary.');
    return null;
  }

  const validWidth = width || 300;
  const validHeight = height || 300;

  // Generate optimized Cloudinary URL
  const img = cld.image(publicId)
    .resize(fill().width(validWidth).height(validHeight))
    .format('auto')
    .quality('auto:eco'); // Use eco quality for faster loading

  return (
    <AdvancedImage
      cldImg={img}
      alt={alt || 'Image'}
      className={className}
      loading={loading}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default Image;
