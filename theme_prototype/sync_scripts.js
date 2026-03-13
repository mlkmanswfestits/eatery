const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/chann/.gemini/antigravity/scratch/eateryessentials/theme_prototype';

const videoScriptTag = '<script src="js/videos.js"></script>';

function walkDir(currentDir) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'assets' && file !== 'css' && file !== 'js') {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            processFile(fullPath);
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Adjust paths based on depth
    const parts = filePath.replace(dir, '').split(path.sep).filter(p => p);
    let relativeRoot = './';
    if (parts.length > 1) {
        relativeRoot = '../'.repeat(parts.length - 1);
    }
    
    const adjustedScriptTag = `<script src="${relativeRoot}js/videos.js"></script>`;

    // Ensure videos.js is present before </body>
    if (!content.includes('js/videos.js')) {
        const bodyCloseMatch = /<\/body>/i;
        if (bodyCloseMatch.test(content)) {
            content = content.replace(bodyCloseMatch, adjustedScriptTag + '\n</body>');
            modified = true;
            console.log('Injected videos.js in ' + filePath);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
}

walkDir(dir);
console.log('Script sync complete.');
