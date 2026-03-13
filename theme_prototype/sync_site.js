const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/chann/.gemini/antigravity/scratch/eateryessentials/theme_prototype';

const standardHeader = `
    <header class="site-header">
        <div class="header-inner">
            <a href="index.html" class="logo">
                <img src="assets/images/logo-blue_green.png" alt="Eatery Essentials Logo">
            </a>
            <nav class="main-nav">
                <ul id="menu-primary-navigation" class="menu">
                    <li class="menu-item"><a href="index.html">HOME</a></li>
                    <li class="menu-item"><a href="news.html">NEWS</a></li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="products.html">PRODUCTS</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item"><a href="products.html">All Products</a></li>
                            <li class="menu-item menu-item-has-children split-nav-item">
                                <div class="nav-item-header">
                                    <a href="but-n-loc.html">BUT-N-LOC</a>
                                    <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                                </div>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="category/but-n-loc-tamper-evident-square-deli-containers.html">Tamper Evident Square Deli</a></li>
                                    <li class="menu-item"><a href="category/but-n-loc-tamper-evident-parfait-cups.html">Tamper Evident Parfait Cups</a></li>
                                    <li class="menu-item"><a href="category/grab-go.html">Grab & Go</a></li>
                                    <li class="menu-item"><a href="but-n-loc-closing-machine.html">BUT-N-LOC Closing Machine</a></li>
                                </ul>
                            </li>
                            <li class="menu-item menu-item-has-children split-nav-item">
                                <div class="nav-item-header">
                                    <a href="kodacup.html">KODA CUP</a>
                                    <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                                </div>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="category/kodacup-pet-clear-cups.html">Clear Cups</a></li>
                                    <li class="menu-item"><a href="category/kodacup-deli-containers.html">Round Deli Containers</a></li>
                                    <li class="menu-item"><a href="category/kodacup-hinged-lid-containers.html">Hinged Containers</a></li>
                                    <li class="menu-item"><a href="category/kodacup-film-seal-containers.html">Film Seal Containers</a></li>
                                    <li class="menu-item"><a href="category/kodacup-clear-salad-bowls.html">Plastic Salad Bowls</a></li>
                                    <li class="menu-item"><a href="category/kodacup-cake-bakery-containers.html">Cake & Bakery</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="sustainability.html">SUSTAINABILITY</a></li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="catalog.html">RESOURCES</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item"><a href="catalog.html">Catalog</a></li>
                            <li class="menu-item"><a href="sales-documents.html">Sales Documents</a></li>
                            <li class="menu-item"><a href="customer-reference-documents.html">Customer Reference Documents</a></li>
                            <li class="menu-item"><a href="instructional-videos.html">Instructional Videos</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="about.html">ABOUT</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item"><a href="about.html">Company Info</a></li>
                            <li class="menu-item"><a href="certification.html">Certification</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="contact.html">CONTACT</a></li>
                    <li class="menu-item"><a href="careers.html">CAREERS</a></li>
                    <li class="menu-item mobile-only-action"><a href="https://crm.eateryessentials.com/sample" class="btn btn-primary mobile-sample-btn">Order Samples</a></li>
                </ul>
            </nav>
            <div class="header-actions">
                <a href="https://crm.eateryessentials.com/sample" class="btn">Request Samples</a>
                <button class="search-icon-btn" aria-label="Open Search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></button>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
`;

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
    </div>
`;

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
    // Normalize paths for consistent depth calculation
    const normalizedDir = path.resolve(dir).replace(/\\/g, '/');
    const normalizedPath = path.resolve(filePath).replace(/\\/g, '/');
    
    let relativeRoot = './';
    const relativePart = normalizedPath.replace(normalizedDir, '');
    const depth = relativePart.split('/').filter(p => p.length > 0).length - 1;
    
    if (depth > 0) {
        relativeRoot = '../'.repeat(depth);
    }

    // Since the header links are absolute-like (relative to root), we should adjust them?
    // Actually, the previous implementation used relative paths.
    // Let's make the header links work for any depth by prepending relativeRoot.
    let adjustedHeader = standardHeader.trim();
    
    // Simple path adjustment for images and links in the header
    adjustedHeader = adjustedHeader.replace(/img src="assets\//g, `img src="${relativeRoot}assets/`);
    adjustedHeader = adjustedHeader.replace(/href="index.html"/g, `href="${relativeRoot}index.html"`);
    adjustedHeader = adjustedHeader.replace(/href="news.html"/g, `href="${relativeRoot}news.html"`);
    adjustedHeader = adjustedHeader.replace(/href="products.html"/g, `href="${relativeRoot}products.html"`);
    adjustedHeader = adjustedHeader.replace(/href="sustainability.html"/g, `href="${relativeRoot}sustainability.html"`);
    adjustedHeader = adjustedHeader.replace(/href="catalog.html"/g, `href="${relativeRoot}catalog.html"`);
    adjustedHeader = adjustedHeader.replace(/href="about.html"/g, `href="${relativeRoot}about.html"`);
    adjustedHeader = adjustedHeader.replace(/href="contact.html"/g, `href="${relativeRoot}contact.html"`);
    adjustedHeader = adjustedHeader.replace(/href="careers.html"/g, `href="${relativeRoot}careers.html"`);
    adjustedHeader = adjustedHeader.replace(/href="but-n-loc.html"/g, `href="${relativeRoot}but-n-loc.html"`);
    adjustedHeader = adjustedHeader.replace(/href="kodacup.html"/g, `href="${relativeRoot}kodacup.html"`);
    adjustedHeader = adjustedHeader.replace(/href="but-n-loc-closing-machine.html"/g, `href="${relativeRoot}but-n-loc-closing-machine.html"`);
    adjustedHeader = adjustedHeader.replace(/href="sales-documents.html"/g, `href="${relativeRoot}sales-documents.html"`);
    adjustedHeader = adjustedHeader.replace(/href="customer-reference-documents.html"/g, `href="${relativeRoot}customer-reference-documents.html"`);
    adjustedHeader = adjustedHeader.replace(/href="instructional-videos.html"/g, `href="${relativeRoot}instructional-videos.html"`);
    adjustedHeader = adjustedHeader.replace(/href="certification.html"/g, `href="${relativeRoot}certification.html"`);
    
    // Sub-category links
    adjustedHeader = adjustedHeader.replace(/href="category\//g, `href="${relativeRoot}category/`);

    // Replace Header
    const headerRegex = /<header class="site-header">[\s\S]*?<\/header>/;
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, adjustedHeader);
        modified = true;
        console.log('Updated header in ' + filePath);
    }

    // Ensure Video Modal is present
    if (!content.includes('id="videoModal"')) {
        const bodyCloseMatch = /<\/body>/i;
        if (bodyCloseMatch.test(content)) {
            content = content.replace(bodyCloseMatch, videoModalHTML + '\n</body>');
            modified = true;
            console.log('Injected video modal in ' + filePath);
        }
    }

    // Fix Video Script Path (removing broken long paths if they exist)
    const brokenScriptRegex = /<script src="(\.\.\/)+js\/videos\.js"><\/script>/g;
    if (brokenScriptRegex.test(content)) {
        content = content.replace(brokenScriptRegex, `<script src="${relativeRoot}js/videos.js"></script>`);
        modified = true;
    }

    // Ensure Video Script is present if modal is used
    if (content.includes('id="videoModal"') && !content.includes('js/videos.js')) {
        const bodyCloseMatch = /<\/body>/i;
        if (bodyCloseMatch.test(content)) {
            content = content.replace(bodyCloseMatch, `<script src="${relativeRoot}js/videos.js"></script>\n</body>`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
}

walkDir(dir);
console.log('Site-wide sync complete.');
