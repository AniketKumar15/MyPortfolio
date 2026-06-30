const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const adminPages = walkSync(path.join(__dirname, 'Frontend', 'src', 'pages', 'admin'));
const adminComponents = walkSync(path.join(__dirname, 'Frontend', 'src', 'components', 'admin'));

const allAdminFiles = [...adminPages, ...adminComponents];

allAdminFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace bg-white with bg-bg-primary
  content = content.replace(/\bbg-white\b/g, 'bg-[#151515]');
  
  // Also fix text-gray-900 if it exists
  content = content.replace(/\btext-gray-900\b/g, 'text-text-primary');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
