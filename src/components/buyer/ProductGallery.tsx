


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

type Props = {
  images?: { url: string }[];
  title?: string;
};

export function ProductGallery({ images = [], title }: Props) {
  const safeImages =
    images.length > 0
      ? images
      : [{ url: "/placeholder.png" }];

  return (
    <div className="w-full rounded-xl overflow-hidden bg-gray-50">
      <Swiper
        modules={[Navigation, Pagination, Zoom]}
        navigation
        pagination={{ clickable: true }}
        zoom
        spaceBetween={10}
        className="h-[350px] md:h-[450px]"
      >
        {safeImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container flex items-center justify-center h-full">
              <img
                src={img.url}
                alt={`${title || "Product"} ${index + 1}`}
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}