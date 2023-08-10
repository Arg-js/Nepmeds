import {
  ConsultationStep1,
  ConsultationStep2,
  ConsultationStep3,
  ConsultationStep4,
  DummyImageIcon,
  WhyChooseUs1,
  WhyChooseUs2,
  WhyChooseUs3,
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
      "This includes paid/free consultation and consultation mode i.e. audio/video/text.",
    image: <ConsultationStep1 />,
  },
  {
    id: "02",
    title: "Tell us what’s troubling you",
    description:
      "Type your health condition, problem you are facing, attach your lab reports or prescription if any.",

    image: <ConsultationStep2 />,
  },
  {
    id: "03",
    title: "Select Consultation",
    description:
      "This includes paid/free consultation and consultation mode i.e. audio/video/text.",
    image: <ConsultationStep3 />,
  },
  {
    id: "04",
    title: "Follow up with your doctor",
    description:
      "If you still have unclear doubts you can follow up with the doctor.",
    image: <ConsultationStep4 />,
  },
];

export const WhyChooseUs = [
  {
    id: "01",
    title: "Reliable",
    description:
      "All products displayed on Nepmeds are 100% genuine and reliable.",
    image: <WhyChooseUs1 />,
  },
  {
    id: "02",
    title: "Secure",
    description: "Nepmeds uses SSL encryption for safe shopping experience.",

    image: <WhyChooseUs2 />,
  },
  {
    id: "03",
    title: "Affordable",
    description: " Maximum discount and offers on products and services.",
    image: <WhyChooseUs3 />,
  },
];
