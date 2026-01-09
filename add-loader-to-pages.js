// Script to add loader to all HTML pages
const fs = require('fs');
const path = require('path');

const loaderCSS = `    <!-- Preload critical resources -->
    <link rel="preload" href="CSS/loader.css" as="style">
    <link rel="preload" href="js/loader.js" as="script">
    
    <!-- Loader CSS -->
    <link rel="stylesheet" href="CSS/loader.css">
    
    <!-- Immediate loader setup -->
    <script>
        document.documentElement.style.overflow = 'hidden';
    </script>`;

const loaderJS = `    <!-- Loader Script -->
    <script src="js/loader.js"></script>
    <script>
        // Re-enable scrolling after loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.documentElement.style.overflow = '';
            }, 2000);
        });
    </script>`;

const htmlFiles = [
    'index.html',
    'about.html', 
    'services.html',
    'careers.html',
    'contact.html'
];

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add CSS in head
        if (!content.includes('loader.css')) {
            content = content.replace('</head>', `${loaderCSS}\n</head>`);
        }
        
        // Add JS before closing body
        if (!content.includes('loader.js')) {
            content = content.replace('</body>', `${loaderJS}\n</body>`);
        }
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});

console.log('Loader added to all pages!');