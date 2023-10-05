export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    slidesToSlide: 3,
    items: 7.5,
  },
  laptopLarge: { breakpoint: { max: 1440, min: 1024 }, items: 5.5 },
  laptop: { breakpoint: { max: 1024, min: 768 }, items: 3.5 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1.5 },
};
export const responsiveDoctorCard = {
  ...responsive,
  desktop: { ...responsive.desktop, items: 6.5 },
  laptopLarge: { ...responsive.laptopLarge, items: 5 },
  laptop: { ...responsive.laptop, items: 3.2 },
  tablet: { breakpoint: { max: 768, min: 464 }, slidesToSlide: 1, items: 2 },
};
