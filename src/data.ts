import { BodyMeasurements, PortfolioImage, Testimonial } from "./types";

export const MODEL_NAME = "Ankita Sharma";
export const NATIONALITY = "Indian";
export const PROFESSION = "Fashion Model / Commercial Model";
export const STYLE = "Elegant, confident, modern, camera-friendly, graceful";

export const MODEL_BIO = 
  "Ankita Sharma is an Indian fashion and commercial model renowned for her striking elegance, self-assured confidence, and compelling camera-friendly presence. Combining modern style with grace, she specializes in a wide range of campaigns from premium western wear to classic ethnic ensembles. With an innate ability to translate designer vision into captivating motion and stills, Ankita has quickly become a sought-after face for editorial, commercial, and high-fashion catalogs.";

export const MODEL_MEASUREMENTS: BodyMeasurements = {
  height: "5’6”",
  heightCm: 168,
  shoulder: { label: "Shoulder", inches: 16.5, cm: 41.9 },
  upperBust: { label: "Upper Bust", inches: 32.5, cm: 82.6 },
  bust: { label: "Bust", inches: 33, cm: 83.8 },
  waist: { label: "Waist", inches: 27.5, cm: 69.9 },
  hip: { label: "Hip", inches: 37.5, cm: 95.3 },
  armAround: { label: "Arm Around", inches: 16, cm: 40.6 },
  shortSleeve: { label: "Short Sleeve Length", inches: 6, cm: 15.2 },
  fullSleeve: { label: "Full Sleeve Length", inches: 20.2, cm: 51.3 },
  shoulderToKnee: { label: "Shoulder to Knee", inches: 33.9, cm: 86.1 },
  shoulderToAnkle: { label: "Shoulder to Ankle", inches: 49.5, cm: 125.7 },
  shoulderToWaist: { label: "Shoulder to Waist", inches: 15.3, cm: 38.9 },
};

export const MODEL_CATEGORIES = [
  "Western Wear",
  "Ethnic Wear",
  "Beauty & Makeup Shoots",
  "Lifestyle Campaigns",
  "Catalogue Modeling",
  "Brand Promotions",
  "Instagram Reels",
  "Video Ads",
  "Fashion Campaigns"
];

export const WORK_AVAILABILITY = [
  "Clothing Brands & Designer Labels",
  "Premium Beauty & Skincare Brands",
  "Lifestyle & Wellness Campaigns",
  "E-commerce Catalogue Shoots",
  "Website Banners & Editorial Spreads",
  "Social Media Campaigns & Reels",
  "Promotional Videos & Video Ads"
];

export const COLLABORATION_TEXT = 
  "Ankita is represented internationally and is available for booking on high-end commercial projects, runway presentations, designer lookbooks, and strategic digital promotions. Driven by professionalism and a deep commitment to the craft, she brings an authentic Indian heritage blended with a global, contemporary flair to every set. Agencies, designers, and brands are cordially invited to connect for collaborations, domestic or worldwide.";

export const TAGLINE_OPTIONS = [
  "Elegance Redefined, Grace Personified.",
  "Blending Traditional Heritage with Modern Contemporary Style.",
  "Your Brand's Vision, Brought to Life with Supreme Confidence.",
  "Capturing the Soul of Luxury, One Frame at a Time.",
  "The Perfect Canvas of Grace, Attitude, and Screen Presence."
];

export const BOOKING_MESSAGE_TEMPLATE = 
  "For professional representation, booking requests, or collaboration inquiries, please reach out via our official casting channel Ankita and her management team typically respond within 24 hours to secure campaign dates and discuss creative briefs.";

export const CONTACT_TELEGRAM = "@ANK17100";

export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    id: "img-1",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/615803646_122104804731210251_4427813637058255115_n_cqvd4i.jpg",
    title: "Classic Portrait",
    photographer: "Aarav Mehta"},
  {
    id: "img-2",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/620152596_122107898091210251_8440430729532668923_n_mz7qb1.jpg",
    title: "Studio Glam",
    photographer: "Aarav Mehta"},
  {
    id: "img-3",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/618364853_122107898505210251_6276888572804363985_n_zvph5v.jpg",
    title: "Fashion Editorial",
    photographer: "Aarav Mehta"},
  {
    id: "img-4",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618378595_122107947579210251_4223409504481970504_n_zrtbmb.jpg",
    title: "Beauty Close-Up",
    photographer: "Aarav Mehta"},
  {
    id: "img-5",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618042512_122107898217210251_8495220047900886670_n_e0zttu.jpg",
    title: "Lifestyle Shoot",
    photographer: "Aarav Mehta"},
  {
    id: "img-6",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/2_iw1gx7.jpg",
    title: "Outdoor Portrait",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-7",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/1_kugbdd.jpg",
    title: "Urban Street Style",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-8",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/4_emazhp.jpg",
    title: "Golden Hour Session",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-9",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/3_p3lldf.jpg",
    title: "Luxury Portrait",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-10",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408608/5_wt50dy.jpg",
    title: "Fine Art Portrait",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-11",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409313/aifaceswap-fb8a26faeb18ca7ae74a265397cb5a11_bd2cqu.jpg",
    title: "Editorial Vogue",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-12",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-f0eb3830ed39e551e7d05fd99ca02929_iessip.jpg",
    title: "Signature Lookbook",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-13",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-e842d01c9b4bf4f795c2bd7910aba8c8_bfopbh.jpg",
    title: "High Fashion Session",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-14",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-d904b819d029b1ce4fe58b191cfe8f8e_y72tsd.jpg",
    title: "Designer Collection Shoot",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-15",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-671bf446a966022a688269b8f2862f7b_nd7l1o.jpg",
    title: "Commercial Fashion Shoot",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-16",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-c94a6a4af0ad874b834e901702027fb2_pf0igd.jpg",
    title: "Magazine Cover Shoot",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-17",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-039d8c193274d9b0631627e0dd1c0f0d_k3hd6f.jpg",
    title: "Portfolio Builder",
    photographer: "Aarav Mehta"
  },
  {
    id: "img-18",
    category: "Fashion Campaigns",
    url: "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-9ee15745593e4aba68e8cfc614e9f817_zsrwt6.jpg",
    title: "Model Test Shoot",
    photographer: "Aarav Mehta"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    quote: "Working with Ankita is incredibly seamless. Her ability to hold the camera's focus while adapting her body language to different textures of luxury fabrics is remarkable.",
    author: "Siddharth Malhotra",
    role: "Creative Director, Malhotra Atelier"
  },
  {
    id: "t-2",
    quote: "She possesses a rare combination of modern poise and classic Indian heritage. Her reels and video ads delivered outstanding engagement metrics for our winter beauty collection.",
    author: "Meera Nair",
    role: "Brand Lead, Vanya Organics"
  },
  {
    id: "t-3",
    quote: "Extremely professional, punctual, and highly receptive to the creative brief. Her physical measurements are highly proportionate, making catalog and fit sessions extremely efficient.",
    author: "Kabir Roy",
    role: "Chief Photographer, Roy Studios"
  }
];
