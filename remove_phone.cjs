const fs = require('fs');

// 1. Remove from App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');
appStr = appStr.replace(/import \{ MODEL_NAME, PROFESSION, NATIONALITY, STYLE, CONTACT_PHONE, CONTACT_TELEGRAM \} from "\.\/data";/, 'import { MODEL_NAME, PROFESSION, NATIONALITY, STYLE, CONTACT_TELEGRAM } from "./data";');
appStr = appStr.replace(/\s*<a\s*href={`tel:\$\{CONTACT_PHONE\.replace\(\/\\s\+\/g, ''\)\}`}\s*className="font-mono text-xs text-stone-700 hover:text-stone-950 hover:underline hover:underline-offset-4 transition-all duration-200"\s*>\s*\{CONTACT_PHONE\}\s*<\/a>/g, '');
appStr = appStr.replace(/\s*<a\s*href={`tel:\$\{CONTACT_PHONE\.replace\(\/\\s\+\/g, ''\)\}`}\s*className="font-mono text-center text-xs text-stone-800 hover:text-stone-950 border border-stone-200 py-3"\s*>\s*Call Support: \{CONTACT_PHONE\}\s*<\/a>/g, '');
fs.writeFileSync('src/App.tsx', appStr);

// 2. Remove from BookingForm.tsx
let bfStr = fs.readFileSync('src/components/BookingForm.tsx', 'utf8');
bfStr = bfStr.replace(/import \{ MODEL_CATEGORIES, BOOKING_MESSAGE_TEMPLATE, CONTACT_PHONE, CONTACT_TELEGRAM \} from "\.\.\/data";/, 'import { MODEL_CATEGORIES, BOOKING_MESSAGE_TEMPLATE, CONTACT_TELEGRAM } from "../data";');
bfStr = bfStr.replace(/\s*<div className="flex items-center gap-4 text-xs font-mono text-stone-500">\s*<span className="w-2 h-2 rounded-full bg-stone-800"><\/span>\s*<span className="flex items-center gap-1\.5">Direct hotline: <a href={`tel:\$\{CONTACT_PHONE\.replace\(\/\\s\+\/g, ''\)\}`} className="underline text-stone-700 hover:text-stone-900 font-semibold">\{CONTACT_PHONE\}<\/a><\/span>\s*<\/div>/g, '');
fs.writeFileSync('src/components/BookingForm.tsx', bfStr);

// 3. Remove from CompCard.tsx
let ccStr = fs.readFileSync('src/components/CompCard.tsx', 'utf8');
ccStr = ccStr.replace(/import \{ MODEL_NAME, MODEL_MEASUREMENTS, PROFESSION, NATIONALITY, CONTACT_PHONE, CONTACT_TELEGRAM \} from "\.\.\/data";/, 'import { MODEL_NAME, MODEL_MEASUREMENTS, PROFESSION, NATIONALITY, CONTACT_TELEGRAM } from "../data";');
fs.writeFileSync('src/components/CompCard.tsx', ccStr);

// 4. Remove from data.ts
let dataStr = fs.readFileSync('src/data.ts', 'utf8');
dataStr = dataStr.replace(/at \+91 78274 84599\. /, '');
dataStr = dataStr.replace(/\nexport const CONTACT_PHONE = "\+91 78274 84599";/g, '');
fs.writeFileSync('src/data.ts', dataStr);

console.log("Phone number references removed.");
