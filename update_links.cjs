const fs = require('fs');

const waLink = "https://wa.me/917827484599?text=Hello%20Ankita%20and%20team,%20I'm%20interested%20in%20discussing%20a%20modeling%20project%20with%20you.";

// App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Pay Now href
appStr = appStr.replace(/href="https:\/\/razorpay\.me\/@ankita1170"/g, `href="${waLink}"`);

// Replace Book Private Session href
appStr = appStr.replace(/href="#booking"([\s\S]*?)Book Private Session/g, `href="${waLink}" target="_blank" rel="noopener noreferrer"$1Book Private Session`);

fs.writeFileSync('src/App.tsx', appStr);
console.log("App.tsx links updated.");

