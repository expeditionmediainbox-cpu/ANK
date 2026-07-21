const fs = require('fs');
const file = 'src/data.ts';
let content = fs.readFileSync(file, 'utf8');

const regex = /export const PORTFOLIO_IMAGES: PortfolioImage\[\] = \[([\s\S]*?)\];/;
const match = content.match(regex);

if (match) {
  const images = match[1].split('},').map(s => s.trim() + (s.trim().endsWith('}') ? '' : '}')).filter(s => s.length > 5);
  
  const toDelete = [
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

  const filteredImages = images.filter(img => {
    let titleMatch = img.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      let title = titleMatch[1];
      if (toDelete.some(td => td.toLowerCase() === title.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const newArrayStr = `export const PORTFOLIO_IMAGES: PortfolioImage[] = [\n  ${filteredImages.join(',\n  ')}\n];`;
  
  content = content.replace(regex, newArrayStr);
  fs.writeFileSync(file, content);
}
