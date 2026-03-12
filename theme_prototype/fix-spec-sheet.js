/**
 * fix-spec-sheet.js
 * Injects <script src="../js/spec-sheet.js"></script> into all product pages
 * that have a "Specification Sheet" button but are missing the spec-sheet script.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, 'products');
const SPEC_SCRIPT_REL = '../js/spec-sheet.js'; // relative from products/ dir

let fixed = 0;
let skipped = 0;

const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
    const fullPath = path.join(PRODUCTS_DIR, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Skip if already has spec-sheet.js
    if (content.includes('spec-sheet.js')) {
        skipped++;
        continue;
    }

    // Only inject if the page has a "Specification Sheet" or "Spec Sheet" button
    const hasSpecBtn = /Specification Sheet|Spec Sheet/i.test(content);
    if (!hasSpecBtn) {
        skipped++;
        continue;
    }

    // Inject before </body>
    const scriptTag = `    <script src="${SPEC_SCRIPT_REL}"></script>\n`;
    content = content.replace('</body>', scriptTag + '</body>');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✔  Fixed: ${file}`);
    fixed++;
}

console.log(`\nDone. Fixed ${fixed} files, skipped ${skipped}.`);
