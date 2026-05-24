const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src', 'controllers');

// Helper to inject code into controller methods
function injectLogger(filePath, entityType) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('../utils/logger')) {
    content = `const { logAction } = require('../utils/logger');\n` + content;
  }

  // CREATE
  content = content.replace(/(const (\w+) = await \w+\.create\([^)]+\);)/g, `$1\n    await logAction('CREATE', '${entityType}', $2.title || $2.company || $2.category || 'New Item');`);
  content = content.replace(/(const (\w+) = new \w+\(req\.body\);\s*await \w+\.save\(\);)/g, `$1\n    await logAction('CREATE', '${entityType}', $2.title || $2.company || $2.category || 'New Item');`);
  
  // UPDATE
  content = content.replace(/(const (\w+) = await \w+\.findByIdAndUpdate\([^)]+\);)/g, `$1\n    if ($2) await logAction('UPDATE', '${entityType}', $2.title || $2.company || $2.category || 'Item');`);

  // DELETE
  content = content.replace(/(await \w+\.findByIdAndDelete\(req\.params\.id\);)/g, `const deletedItem = $1\n    if (deletedItem) await logAction('DELETE', '${entityType}', deletedItem.title || deletedItem.company || deletedItem.category || 'Item');`);
  content = content.replace(/(const (\w+) = await \w+\.findByIdAndDelete\(req\.params\.id\);)/g, `$1\n    if ($2) await logAction('DELETE', '${entityType}', $2.title || $2.company || $2.category || 'Item');`);

  // TOGGLE FEATURED (certController)
  content = content.replace(/(cert\.featured = !cert\.featured;\s*await cert\.save\(\);)/g, `$1\n    await logAction('UPDATE', '${entityType}', cert.title + ' (Toggle Featured)');`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Injected logger into', path.basename(filePath));
}

injectLogger(path.join(controllersDir, 'projectController.js'), 'Project');
injectLogger(path.join(controllersDir, 'blogController.js'), 'Blog');
injectLogger(path.join(controllersDir, 'certController.js'), 'Certification');
injectLogger(path.join(controllersDir, 'experienceController.js'), 'Experience');
injectLogger(path.join(controllersDir, 'skillController.js'), 'Skill');
