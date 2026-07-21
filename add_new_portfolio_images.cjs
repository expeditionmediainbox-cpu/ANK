const fs = require('fs');
const file = 'src/data.ts';
let content = fs.readFileSync(file, 'utf8');

const newImageUrls = [
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/2_iw1gx7.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/1_kugbdd.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/4_emazhp.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408609/3_p3lldf.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784408608/5_wt50dy.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409313/aifaceswap-fb8a26faeb18ca7ae74a265397cb5a11_bd2cqu.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-f0eb3830ed39e551e7d05fd99ca02929_iessip.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-e842d01c9b4bf4f795c2bd7910aba8c8_bfopbh.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-d904b819d029b1ce4fe58b191cfe8f8e_y72tsd.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-671bf446a966022a688269b8f2862f7b_nd7l1o.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409314/aifaceswap-c94a6a4af0ad874b834e901702027fb2_pf0igd.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-039d8c193274d9b0631627e0dd1c0f0d_k3hd6f.jpg",
  "https://res.cloudinary.com/dtzyjynai/image/upload/v1784409315/aifaceswap-9ee15745593e4aba68e8cfc614e9f817_zsrwt6.jpg"
];

const deletedNames = [
  'Outdoor Portrait',
  'Urban Street Style',
  'Golden Hour Session',
  'Luxury Portrait',
  'Fine Art Portrait',
  'Editorial Vogue',
  'Signature Lookbook',
  'High Fashion Session',
  'Designer Collection Shoot',
  'Commercial Fashion Shoot',
  'Magazine Cover Shoot',
  'Portfolio Builder',
  'Model Test Shoot'
];

const regex = /export const PORTFOLIO_IMAGES: PortfolioImage\[\] = \[([\s\S]*?)\];/;
const match = content.match(regex);

if (match) {
  let existingImages = match[1].split('},').map(s => s.trim() + (s.trim().endsWith('}') ? '' : '}')).filter(s => s.length > 5);

  const newItems = newImageUrls.map((url, i) => {
    return `  {
    id: "img-${existingImages.length + i + 1}",
    category: "Fashion Campaigns",
    url: "${url}",
    title: "${deletedNames[i]}",
    photographer: "Aarav Mehta"
  }`;
  });

  const finalArrayStr = `export const PORTFOLIO_IMAGES: PortfolioImage[] = [\n  ${existingImages.join(',\n  ')},\n${newItems.join(',\n')}\n];`;
  
  content = content.replace(regex, finalArrayStr);
  fs.writeFileSync(file, content);
}
