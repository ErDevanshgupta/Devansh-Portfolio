require('dotenv').config();
const mongoose = require('mongoose');

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const Project = require('./src/models/Project');
  const Blog = require('./src/models/Blog');

  const p = await Project.findOne().sort({ updatedAt: -1 });
  console.log('Latest Project:', p ? p.title : 'None', '| Status:', p ? p.status : 'N/A', '| Updated:', p ? p.updatedAt : 'N/A');

  const b = await Blog.findOne().sort({ updatedAt: -1 });
  console.log('Latest Blog:', b ? b.title : 'None', '| Status:', b ? b.status : 'N/A', '| Updated:', b ? b.updatedAt : 'N/A');

  mongoose.disconnect();
}
checkDB();
