import posts from "@/content/posts.json";
import pages from "@/content/pages.json";

export const site = {
  name: "Sell My Car Today",
  url: "https://www.sellmycartoday.uk",
  logo: "/smctl.png",
  localLogo: "/smctl.png",
  localLightLogo: "/smctl-light.png",
  phone: "03337 729 283",
  phoneHref: "tel:03337729283",
  whatsapp: "https://web.whatsapp.com/send?phone=447424956118",
  email: "info@sellmycartoday.uk",
  address: "London, United Kingdom",
  title: "Sell My Car Today | Instant Car Valuation & Free Collection UK",
  description:
    "Sell your car quickly with Sell My Car Today. Get an instant car valuation in 30 seconds, free collection and secure same-day bank transfer anywhere in the UK.",
};

export const navItems = [
  { label: "HOME", href: "/" },
  { label: "SELL MY CAR", href: "/sell-my-car" },
  { label: "WHY CHOOSE US?", href: "/why-choose-us" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "BLOG", href: "/blog" },
  { label: "REVIEWS", href: "/reviews" },
  { label: "CONTACT US", href: "/contact-us" },
];

export const benefits = [
  "No Admin Fee's",
  "FREE Collection",
  "Guaranteed Sale",
  "Instant Payment",
  "We Can Pay Cash!",
];

export const steps = [
  {
    title: "Enter your vehicle details",
    text: "Simply enter your vehicle registration number and vehicle mileage, then start the 30-second real-time car valuation process.",
  },
  {
    title: "Get Instant Car Valuation",
    text: "Using your car registration number, we retrieve your vehicle details including make, model and specifications for a fair real-time valuation.",
  },
  {
    title: "Sold! Done & Paid",
    text: "We come to you, check your documents and car condition, then transfer payment instantly to your bank.",
  },
];

export const faqs = [
  {
    question: "How will you send me a quote/contact me?",
    answer:
      "Once you submit your car registration number and mileage, we provide a valuation for poor and good condition cars. Our Sell My Car Today agent then contacts you to discuss the next steps, inspect your car and finalise the sale.",
  },
  {
    question: "Will it cost me anything to get a quote?",
    answer:
      "No, getting a quote from Sell My Car Today is completely free. Enter your car registration number and mileage and we will provide an instant valuation with no cost or obligation.",
  },
  {
    question: "What happens after I have accepted the quotation?",
    answer:
      "An agent arranges a convenient inspection, checks your car and paperwork, agrees the final price with you, sends instant payment and collects the car from your location.",
  },
  {
    question: "Do you buy vans and commercial vehicles?",
    answer:
      "Yes. We accept vans and commercial vehicles up to 3.5 tonnes as standard. If you have a larger vehicle, call 03337 729 283 and we will provide a custom quote.",
  },
];

export const reviews = [
  {
    name: "Paula Montie",
    text: "What a relief to find Sell My Car Today after struggles with several of the big names. Communication was immediate, the price was fair and collection happened that evening.",
  },
  {
    name: "Ella Nora",
    text: "The process was straightforward, the valuation was fair, and everything was clearly explained. Overall, a stress free and positive experience.",
  },
  {
    name: "Stephanie",
    text: "TJ was great. We agreed on a good final price, payment was made by instant bank transfer and the paperwork was handled online.",
  },
  {
    name: "Mike Bell",
    text: "Good price given for my car and it was collected at the time arranged. Money was transferred when the driver collected.",
  },
];

export type BlogPost = (typeof posts)[number];
export type ContentPage = (typeof pages)[number];

export const blogPosts = posts as BlogPost[];
export const contentPages = pages as ContentPage[];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPageBySlug(slug: string) {
  return contentPages.find((page) => page.slug === slug);
}

export function excerptFromParagraphs(paragraphs: string[], fallback: string) {
  return (paragraphs.find((paragraph) => paragraph.length > 80) || fallback).slice(0, 155);
}
