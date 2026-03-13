const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/chann/.gemini/antigravity/scratch/eateryessentials/theme_prototype';

const standardHeaderTemplate = `
    <header class="site-header">
        <div class="header-inner">
            <a href="{{ROOT}}index.html" class="logo">
                <img src="{{ROOT}}assets/images/logo-blue_green.png" alt="Eatery Essentials Logo">
            </a>
            <nav class="main-nav">
                <ul id="menu-primary-navigation" class="menu">
                    <li class="menu-item"><a href="{{ROOT}}index.html">HOME</a></li>
                    <li class="menu-item"><a href="{{ROOT}}news.html">NEWS</a></li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="{{ROOT}}products.html">PRODUCTS</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item menu-item-has-children split-nav-item">
                                <div class="nav-item-header">
                                    <a href="{{ROOT}}but-n-loc.html">BUT-N-LOC</a>
                                    <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                                </div>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="{{ROOT}}category/but-n-loc-tamper-evident-square-deli-containers.html">Tamper Evident Square Deli</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/but-n-loc-tamper-evident-parfait-cups.html">Tamper Evident Parfait Cups</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/grab-go.html">Grab & Go</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}but-n-loc-closing-machine.html">BUT-N-LOC Closing Machine</a></li>
                                </ul>
                            </li>
                            <li class="menu-item menu-item-has-children split-nav-item">
                                <div class="nav-item-header">
                                    <a href="{{ROOT}}kodacup.html">KODA CUP</a>
                                    <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                                </div>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-pet-clear-cups.html">Clear Cups</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-deli-containers.html">Round Deli Containers</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-hinged-lid-containers.html">Hinged Containers</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-film-seal-containers.html">Film Seal Containers</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-clear-salad-bowls.html">Plastic Salad Bowls</a></li>
                                    <li class="menu-item"><a href="{{ROOT}}category/kodacup-cake-bakery-containers.html">Cake & Bakery</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="{{ROOT}}sustainability.html">SUSTAINABILITY</a></li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="{{ROOT}}catalog.html">RESOURCES</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item"><a href="{{ROOT}}catalog.html">Catalog</a></li>
                            <li class="menu-item"><a href="{{ROOT}}sales-documents.html">Sales Documents</a></li>
                            <li class="menu-item"><a href="{{ROOT}}customer-reference-documents.html">Customer Reference Documents</a></li>
                            <li class="menu-item"><a href="{{ROOT}}instructional-videos.html">Instructional Videos</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-has-children split-nav-item">
                        <div class="nav-item-header">
                            <a href="{{ROOT}}about.html">ABOUT</a>
                            <button class="submenu-toggle-btn" aria-label="Toggle submenu"><i class="fas fa-chevron-down"></i></button>
                        </div>
                        <ul class="sub-menu">
                            <li class="menu-item"><a href="{{ROOT}}about.html">Company Info</a></li>
                            <li class="menu-item"><a href="{{ROOT}}certification.html">Certification</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="{{ROOT}}contact.html">CONTACT</a></li>
                    <li class="menu-item"><a href="{{ROOT}}careers.html">CAREERS</a></li>
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

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Calculate relative path to root correctly
    let relativePath = path.relative(path.dirname(filePath), dir);
    if (relativePath === '') {
        relativePath = '.';
    }
    const rootPath = (relativePath === '.') ? './' : (relativePath.endsWith('/') ? relativePath : relativePath + '/');

    // Apply template
    const headerHtml = standardHeaderTemplate.replace(/{{ROOT}}/g, rootPath).trim();

    // Replace Header
    const headerRegex = /<header class="site-header">[\s\S]*?<\/header>/;
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, headerHtml);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
});

console.log('Site-wide header path and logo fix complete.');
