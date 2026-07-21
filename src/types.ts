export interface Measurement {
  label: string;
  inches: number;
  cm: number;
}

export interface BodyMeasurements {
  height: string; // e.g., "5’6”"
  heightCm: number; // e.g., 168
  shoulder: Measurement;
  upperBust: Measurement;
  bust: Measurement;
  waist: Measurement;
  hip: Measurement;
  armAround: Measurement;
  shortSleeve: Measurement;
  fullSleeve: Measurement;
  shoulderToKnee: Measurement;
  shoulderToAnkle: Measurement;
  shoulderToWaist: Measurement;
}

export interface PortfolioImage {
  id: string;
  category: string;
  url: string;
  title: string;
  photographer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface GuestbookComment {
  id: string;
  name: string;
  email?: string;
  content: string;
  role: "Photographer" | "Designer" | "Agency" | "Fan" | "Stylist" | "Other";
  createdAt: any; // Can be Timestamp or number
  likes: number;
}

