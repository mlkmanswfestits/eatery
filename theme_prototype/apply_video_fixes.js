const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\chann\\.gemini\\antigravity\\scratch\\eateryessentials\\theme_prototype';

const modalHTML = `
    <!-- Video Modal Player -->
    <div class="video-modal" id="videoModal">
        <div class="video-modal-content">
            <button class="modal-close" id="closeModal"><i class="fas fa-times"></i></button>
            <div class="modal-video-box">
                <video id="modalVideo" controls playsinline>
                    <source src="" type="video/mp4">
                </video>
            </div>
            <div class="modal-caption">
                <h2 id="modalTitle">Video Title</h2>
                <p id="modalDesc">Video description goes here.</p>
            </div>
        </div>
    </div>
`;

function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (item !== 'assets' && item !== 'js' && item !== 'css' && item !== 'fonts') {
                processDirectory(fullPath);
            }
        } else if (item.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // 1. Link js/videos.js if missing but video-card-modern exists
            if (content.includes('video-card-modern') && !content.includes('js/videos.js')) {
                 if (content.includes('js/main.js"></script>')) {
                    content = content.replace('js/main.js"></script>', 'js/main.js"></script>\n    <script src="js/videos.js"></script>');
                    changed = true;
                 }
            }

            // 2. Inject Modal HTML if missing but page has videos
            if (content.includes('video-card-modern') && !content.includes('id="videoModal"')) {
                // Try to find a good spot before </body>
                if (content.includes('</body>')) {
                    content = content.replace('</body>', `${modalHTML.trim()}\n</body>`);
                    changed = true;
                }
            }

            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${item}`);
            }
        }
    });
}

processDirectory(dir);
