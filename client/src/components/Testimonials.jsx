import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/pagination'; // Pagination styles
import { Star, StarBorder } from '@mui/icons-material'; // Material-UI icons for stars
import { testimonials } from './assets'; // Import your testimonials data

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-gray-500 font-medium block">Reseñas</span>
          <h2 className="text-4xl font-bold text-gray-900">Lo que dicen nuestros clientes satisfechos!</h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 32 },
            768: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          a11y={{
            prevSlideMessage: 'Previous testimonial',
            nextSlideMessage: 'Next testimonial'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="group p-6 bg-white border border-gray-300 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-500">
              <div className="mb-7">
                <div className="flex items-center gap-2 text-highlight">
                  {/* Render Star Rating */}
                  {[...Array(5)].map((_, starIndex) => (
                    starIndex < Math.round(testimonial.rating)
                      ? <Star key={starIndex} fontSize="small" />
                      : <StarBorder key={starIndex} fontSize="small" />
                  ))}
                  <span className="text-base font-semibold text-accent">{testimonial.rating}</span>
                </div>
                <p className="text-base text-gray-600 mt-4 group-hover:text-gray-800 transition-all duration-500">
                  {testimonial.message}
                </p>
              </div>
              <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                <div>
                  <h5 className="text-gray-900 font-medium mb-1">{testimonial.name}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination section for Swiper */}
        <div className="swiper-pagination-custom mt-4 flex justify-center"></div>

        <div className='flex items-center justify-center'>
          <a href='/reseñas'>
            <button className='btn-secondary mt-16'>Ver Más</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
