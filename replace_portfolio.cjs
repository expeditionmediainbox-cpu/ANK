const fs = require('fs');
const file = 'src/data.ts';
const content = fs.readFileSync(file, 'utf8');

const unsplashImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506422740542-f81d459021b3?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1485230895905-a5d5a6a6878b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80"
];

const ankitaImages = [
  "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/615803646_122104804731210251_4427813637058255115_n_cqvd4i.jpg",
  "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/620152596_122107898091210251_8440430729532668923_n_mz7qb1.jpg",
  "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190210/618364853_122107898505210251_6276888572804363985_n_zvph5v.jpg",
  "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618378595_122107947579210251_4223409504481970504_n_zrtbmb.jpg",
  "https://res.cloudinary.com/rpgo7m2a/image/upload/v1783190209/618042512_122107898217210251_8495220047900886670_n_e0zttu.jpg"
];

const allUrls = [...ankitaImages, ...unsplashImages];

const names = [
  "Classic Portrait", "Studio Glam", "Fashion Editorial", "Beauty Close-Up", 
  "Lifestyle Shoot", "Outdoor Portrait", "Urban Street Style", "Golden Hour Session", 
  "Luxury Portrait", "Fine Art Portrait", "Editorial Vogue", "Signature Lookbook", 
  "High Fashion Session", "Designer Collection Shoot", "Commercial Fashion Shoot", 
  "Magazine Cover Shoot", "Portfolio Builder", "Model Test Shoot"
];

const items = names.map((name, i) => {
  return `  {
    id: "img-${i+1}",
    category: "Fashion Campaigns",
    url: "${allUrls[i]}",
    title: "${name}",
    photographer: "Aarav Mehta"
  }`;
}).join(',\n');

const regex = /export const PORTFOLIO_IMAGES: PortfolioImage\[\] = \[\s*[\s\S]*?\s*\];/;

const newStr = `export const PORTFOLIO_IMAGES: PortfolioImage[] = [\n${items}\n];`;

fs.writeFileSync(file, content.replace(regex, newStr));
