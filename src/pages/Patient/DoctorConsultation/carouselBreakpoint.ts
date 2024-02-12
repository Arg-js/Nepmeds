export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    slidesToSlide: 3,
    items: 5.5,
  },
  laptopLarge: { breakpoint: { max: 1440, min: 1024 }, items: 4.5 },
  laptop: { breakpoint: { max: 1024, min: 768 }, items: 3.6 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1.2 },
};
export const responsiveDoctorCard = {
  ...responsive,
  desktop: { ...responsive.desktop, items: 4.5 },
  laptopLarge: { ...responsive.laptopLarge, items: 4 },
  laptop: { ...responsive.laptop, items: 3.2 },
  tablet: { breakpoint: { max: 768, min: 464 }, slidesToSlide: 1, items: 2.5 },
};
