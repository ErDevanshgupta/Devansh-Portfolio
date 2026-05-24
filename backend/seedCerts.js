require('dotenv').config();
const mongoose = require('mongoose');
const Certification = require('./src/models/Certification');

const certs = [
  {
    title: 'JLPT N4 Japanese',
    provider: 'Japan Foundation',
    category: 'Languages',
    tags: ['Japanese', 'JLPT N4'],
    status: 'In Progress',
    featured: true,
    displayOrder: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Japan_Foundation_logo.svg',
    certificateImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    provider: 'CNCF',
    category: 'DevOps',
    tags: ['Kubernetes', 'DevOps', 'Cloud Native'],
    status: 'In Progress',
    featured: true,
    displayOrder: 3,
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    certificateImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Docker Mastery',
    provider: 'Udemy / Docker',
    category: 'DevOps',
    tags: ['Docker', 'Containers', 'DevOps'],
    status: 'Completed',
    featured: true,
    displayOrder: 4,
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    certificateImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'IBM Data Science & Machine Learning with AI',
    provider: 'IBM',
    category: 'AI/ML',
    tags: ['Machine Learning', 'Data Science', 'AI'],
    status: 'Completed',
    featured: true,
    displayOrder: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    certificateImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'IBM Advanced Cybersecurity with AI',
    provider: 'IBM',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'AI', 'Security'],
    status: 'In Progress',
    featured: true,
    displayOrder: 6,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    certificateImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Full Stack Development with AI (MERN)',
    provider: 'IBM',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'MERN'],
    status: 'Completed',
    featured: true,
    displayOrder: 7,
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    certificateImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await Certification.deleteMany({});
  await Certification.insertMany(certs);
  console.log('Certifications seeded successfully');
  mongoose.disconnect();
}

seed();
