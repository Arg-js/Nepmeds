import {
  ConsultationStep1Icon,
  ConsultationStep2Icon,
  ConsultationStep3Icon,
  ConsultationStep4Icon,
  DummyImageIcon,
  WhyChooseUs1Icon,
  WhyChooseUs2Icon,
  WhyChooseUs3Icon,
} from "@nepMeds/assets/svgs";

export const SpecilaizationDatas = [
  {
    id: 1,
    title: "Gynaecology",
    description:
      "PCOS, Menstrual Disorders, Pregnancy, Pelvic Prolapse, Uterine Fibroids, Urinary Incontinence",
    image: <DummyImageIcon />,
  },
  {
    id: 2,
    title: "Sexology",
    description:
      "Hormonal Imbalance, Premature ejaculation, STD’s, Erectile Dysfunction, Lower Testosterone",
    image: <DummyImageIcon />,
  },
  {
    id: 3,
    title: "Dermatology",
    description:
      "PCOS, Menstrual Disorders, Pregnancy, Pelvic Prolapse, Uterine Fibroids, Urinary Incontinence",
    image: <DummyImageIcon />,
  },
  {
    id: 4,
    title: "Urology",
    description:
      "PCOS, Menstrual Disorders, Pregnancy, Pelvic Prolapse, Uterine Fibroids, Urinary Incontinence",
    image: <DummyImageIcon />,
  },
  {
    id: 5,
    title: "General Physician",
    description:
      "PCOS, Menstrual Disorders, Pregnancy, Pelvic Prolapse, Uterine Fibroids, Urinary Incontinence",
    image: <DummyImageIcon />,
  },
];

export const ConsultationSteps = [
  {
    id: "01",
    title: "Select Consultation",
    description:
      "This includes the type of consultation such as instant or booking. Both the consultation provides the video consultation method.",
    image: <ConsultationStep1Icon />,
  },
  {
    id: "02",
    title: "Tell us what’s troubling you",
    description:
      "Type your health condition, problem you are facing, attach your lab reports or prescription if any.",

    image: <ConsultationStep2Icon />,
  },
  {
    id: "03",
    title: "Secure Payment",
    description:
      "You can pay for your consultation with different e-payment options",
    image: <ConsultationStep3Icon />,
  },
  {
    id: "04",
    title: "Consult Doctor",
    description:
      "Consult with the doctor at chosen time period and discuss your health concerns to get a solutions.",
    image: <ConsultationStep4Icon />,
  },
];

export const WhyChooseUs = [
  {
    id: "01",
    title: "Reliable",
    description:
      "All products displayed on Nepmeds are 100% genuine and reliable.",
    image: <WhyChooseUs1Icon />,
  },
  {
    id: "02",
    title: "Secure",
    description: "Nepmeds uses SSL encryption for safe shopping experience.",

    image: <WhyChooseUs2Icon />,
  },
  {
    id: "03",
    title: "Affordable",
    description: " Maximum discount and offers on products and services.",
    image: <WhyChooseUs3Icon />,
  },
];
