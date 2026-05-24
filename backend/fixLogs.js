const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src', 'controllers');
const files = ['projectController.js', 'blogController.js', 'certController.js', 'experienceController.js', 'skillController.js'];

files.forEach(file => {
  const filePath = path.join(controllersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the syntax error in certController
  content = content.replace(/const cert = const deletedItem = await /g, 'const deletedItem = await ');

  // Fix the duplicate logAction lines
  const lines = content.split('\n');
  const newLines = [];
  let prevLine = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === prevLine.trim() && line.includes('logAction(\'DELETE\'')) {
      // skip duplicate
      continue;
    }
    newLines.push(line);
    prevLine = line;
  }

  // One more fix for projectController missing UPDATE logger due to formatting:
  // wait, projectController update had line breaks:
  // const project = await Project.findByIdAndUpdate(
  // My script didn't match it because of \n. Let's fix that.
  let contentFinal = newLines.join('\n');
  if (file === 'projectController.js' && !contentFinal.includes("logAction('UPDATE', 'Project'")) {
    contentFinal = contentFinal.replace(/res\.json\(\{ success: true, data: project \}\);/g, `if (project) await logAction('UPDATE', 'Project', project.title || 'Item');\n    res.json({ success: true, data: project });`);
  }

  fs.writeFileSync(filePath, contentFinal, 'utf8');
  console.log('Fixed', file);
});
