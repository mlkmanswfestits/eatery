const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/chann/.gemini/antigravity/scratch/eateryessentials/theme_prototype';

function getAllHtmlFiles(currentDir, allFiles = []) {
    const files = fs.readdirSync(currentDir);
    files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', 'assets', 'css', 'js'].includes(file)) {
                getAllHtmlFiles(fullPath, allFiles);
            }
        } else if (file.endsWith('.html')) {
            allFiles.push(fullPath);
        }
    });
    return allFiles;
}

const htmlFiles = getAllHtmlFiles(dir);
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if videos.js is needed (if it has video-trigger class OR video tags)
    const needsVideo = content.includes('video-trigger') || content.includes('<video') || filePath.includes('instructional-videos.html');

    if (!needsVideo) return;

    // Ensure videoModal is present
    if (!content.includes('id="videoModal"')) {
        const videoModalHTML = `
    <!-- Video Modal Player -->
    <div id="videoModal" class="video-modal">
        <div class="video-modal-content">
            <button id="closeModal" class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-video-box">
                <video id="modalVideo" controls playsinline></video>
            </div>
            <div class="modal-caption">
                <h2 id="modalTitle"></h2>
                <p id="modalDesc"></p>
            </div>
        </div>
    </div>`;
        const bodyCloseMatch = /<\/body>/i;
        if (bodyCloseMatch.test(content)) {
            content = content.replace(bodyCloseMatch, videoModalHTML + '\n</body>');
            modified = true;
            console.log('Injected video modal in ' + filePath);
        }
    }

    // Ensure videos.js is present
    if (!content.includes('js/videos.js')) {
        const parts = filePath.replace(dir, '').split(path.sep).filter(p => p);
        let relativeRoot = './';
        if (parts.length > 1) {
            relativeRoot = '../'.repeat(parts.length - 1);
        }
        const adjustedScriptTag = `<script src="${relativeRoot}js/videos.js"></script>`;
        
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
});

console.log('Sync complete.');
