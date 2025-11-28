import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageGallery = ({ images }) => {
  const swiperRef = useRef(null);

  const handleImageClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="w-full">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.publicId}-${index}`} style={{ width: 'auto' }}>
            <div
              className="relative overflow-hidden rounded-3xl md:rounded-2xl shadow-2xl cursor-pointer aspect-video"
              onClick={handleImageClick}
            >
              <img
                src={`https://res.cloudinary.com/dchxrai89/image/upload/c_fill,w_600,h_338,g_auto,q_auto:eco,f_auto/${image.publicId}`}
                alt={image.description || image.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        /* Swiper container - Responsive padding */
        .mySwiper {
          padding: 20px 0 40px 0;
        }

        @media (min-width: 640px) {
          .mySwiper {
            padding: 30px 0 60px 0;
          }
        }

        @media (min-width: 768px) {
          .mySwiper {
            padding: 40px 0 70px 0;
          }
        }

        @media (min-width: 1024px) {
          .mySwiper {
            padding: 50px 0 80px 0;
          }
        }

        /* Swiper slides - Responsive maxWidth */
        .mySwiper .swiper-slide {
          background-position: center;
          background-size: cover;
          max-width: 280px;
        }

        @media (min-width: 640px) {
          .mySwiper .swiper-slide {
            max-width: 350px;
          }
        }

        @media (min-width: 768px) {
          .mySwiper .swiper-slide {
            max-width: 400px;
          }
        }

        @media (min-width: 1024px) {
          .mySwiper .swiper-slide {
            max-width: 500px;
          }
        }

        /* Pagination bullets styling */
        .mySwiper .swiper-pagination {
          bottom: 10px;
        }

        @media (min-width: 768px) {
          .mySwiper .swiper-pagination {
            bottom: 15px;
          }
        }

        @media (min-width: 1024px) {
          .mySwiper .swiper-pagination {
            bottom: 20px;
          }
        }

        .mySwiper .swiper-pagination-bullet {
          background: #005ad1;
          opacity: 0.4;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .mySwiper .swiper-pagination-bullet-active {
          background: #005ad1;
          opacity: 1;
          width: 16px;
          height: 16px;
        }

        /* Navigation arrows styling */
        .mySwiper .swiper-button-next,
        .mySwiper .swiper-button-prev {
          color: #005ad1;
          background: rgba(255, 255, 255, 0.9);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .mySwiper .swiper-button-next:after,
        .mySwiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .mySwiper .swiper-button-next:hover,
        .mySwiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        /* Mobile responsive - Extra small devices */
        @media (max-width: 639px) {
          .mySwiper .swiper-button-next,
          .mySwiper .swiper-button-prev {
            width: 36px;
            height: 36px;
          }

          .mySwiper .swiper-button-next:after,
          .mySwiper .swiper-button-prev:after {
            font-size: 14px;
          }

          .mySwiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }

          .mySwiper .swiper-pagination-bullet-active {
            width: 14px;
            height: 14px;
          }
        }

        /* Tablet responsive */
        @media (max-width: 768px) {
          .mySwiper .swiper-button-next,
          .mySwiper .swiper-button-prev {
            width: 40px;
            height: 40px;
          }

          .mySwiper .swiper-button-next:after,
          .mySwiper .swiper-button-prev:after {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
