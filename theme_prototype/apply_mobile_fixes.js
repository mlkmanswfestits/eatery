const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\chann\\.gemini\\antigravity\\scratch\\eateryessentials\\theme_prototype';

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
            
            // Add Request Samples to mobile menu if not present
            if (content.includes('href="careers.html">CAREERS</a></li>') && !content.includes('mobile-sample-btn')) {
                // Ensure we are in the main menu (not footer)
                // In this site, CAREERS in main menu is often followed by </ul>
                const pattern = /<li class="menu-item"><a href="careers\.html">CAREERS<\/a><\/li>\s*<\/ul>/;
                if (pattern.test(content)) {
                    content = content.replace(pattern, (match) => {
                        return match.replace('</ul>', '    <li class="menu-item mobile-only-action"><a href="https://crm.eateryessentials.com/sample" class="btn btn-primary mobile-sample-btn">Request Samples</a></li>\n                </ul>');
                    });
                    changed = true;
                }
            }
            
            // Add videos.js to pages that have video cards
            if (content.includes('video-card-modern') && !content.includes('js/videos.js')) {
                 if (content.includes('js/main.js"></script>')) {
                    content = content.replace('js/main.js"></script>', 'js/main.js"></script>\n    <script src="js/videos.js"></script>');
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
