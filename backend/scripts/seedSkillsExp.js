require('dotenv').config();
const mongoose = require('mongoose');
const SkillGroup = require('../src/models/SkillGroup');
const Experience = require('../src/models/Experience');
const connectDB = require('../src/config/db');

const SKILL_GROUPS = [
  { category: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5'] },
  { category: 'Backend', skills: ['Node.js', 'Express', 'REST API', 'Mongoose'] },
  { category: 'AI / ML / Computer Vision', skills: ['YOLOv11', 'OpenCV', 'Scikit-learn', 'NumPy', 'Pandas', 'Hyperspectral Imaging', 'Intel RealSense'] },
  { category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] },
  { category: 'Databases', skills: ['MongoDB', 'MySQL'] },
  { category: 'Tools & Workflow', skills: ['Git', 'Postman', 'Roboflow', 'AI-assisted Dev'] },
  { category: 'Spoken Languages', skills: ['English (Fluent)', 'Japanese (N5 → N4)', 'Hindi (Native)'] },
];

const EXPERIENCES = [
  {
    role: 'Freelance Full Stack Engineer',
    company: 'Self-Employed · Remote — India & Japan',
    period: '2024 – Present',
    type: 'Freelance',
    clients: ['Kanhaji Japan', 'Shyama Corporation', 'Indozaika'],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Nginx', 'AWS EC2'],
    keyImpact: 'Production system live at kanhaji.jp — serving real users in Japan',
    ctaUrl: 'https://kanhaji.jp',
    ctaLabel: 'View Live Project',
    points: [
      'Architected and shipped Kanhaji Japan (kanhaji.jp) — a full-stack cross-border e-commerce platform with GMO & Square payment gateways, role-based admin controls, and automated order workflows.',
      'Engineered production infrastructure using Redis caching, Docker containerization, Nginx reverse proxy, and AWS EC2 — reducing API latency and enabling horizontal scaling.',
      'Delivered full-stack digital systems for Shyama Corporation and Indozaika (Japan-based restaurant) — covering online ordering, business workflows, and customer-facing experiences end-to-end.',
    ],
  },
  {
    role: 'AI Systems Engineer (Consulting)',
    company: 'REDAI Precision Tools · Chiayi, Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Industry',
    techStack: ['YOLOv11', 'Intel RealSense', 'OpenCV', 'Python', 'RGB-D Imaging', 'Edge AI'],
    keyImpact: '96.9% segmentation accuracy · 10% production throughput increase',
    points: [
      'Architected a real-time vision inspection system using Intel RealSense RGB-D + YOLOv11 — achieving 96.9% segmentation and 93.2% detection accuracy, directly replacing a manual QA step on the assembly line.',
      'Delivered a measurable 10% improvement in production throughput by eliminating inspection bottlenecks and enabling continuous unattended operation in an Industry 4.0 environment.',
      'Optimized edge inference pipelines to meet industrial latency constraints without cloud dependency — enabling reliable deployment in high-throughput factory environments.',
    ],
  },
  {
    role: 'AI Research Engineer Intern',
    company: 'National Chung Cheng University · Taiwan',
    period: 'Dec 2024 – June 2025',
    type: 'Research',
    techStack: ['Python', 'Hyperspectral Imaging', 'ML Pipelines', 'Computer Vision'],
    keyImpact: 'Novel GI cancer detection pipeline — targeting Impact Factor 2–4 journals',
    points: [
      'Designed SAVE (Spectrum-Aided Visual Enhancement) — a hyperspectral ML pipeline for early-stage GI cancer detection with clinically meaningful sensitivity improvements over conventional endoscopic imaging.',
      'Built end-to-end spectral feature extraction and lesion differentiation pipelines, enabling high-precision classification of pre-cancerous tissue from hyperspectral endoscopy data.',
      'Contributed to peer-reviewed research targeting journals with Impact Factor 2–4, advancing non-invasive cancer screening methodology.',
    ],
  },
  {
    role: 'Research Engineer Intern',
    company: 'Chip Ready.org · Taiwan',
    period: 'Jan 2025 – June 2025',
    type: 'Research',
    techStack: ['Semiconductor Lifecycle Analysis', 'Supply Chain Modeling', 'Technical Documentation'],
    keyImpact: 'Structured supply-chain analysis used for strategic chip workflow planning',
    points: [
      'Modelled the complete semiconductor product lifecycle — fab to test, packaging, and logistics — producing structured supply-chain analysis used to guide strategic planning for chip workflows.',
      'Authored technical training modules that reduced onboarding time for incoming semiconductor program engineers, improving team ramp-up efficiency.',
    ],
  },
  {
    role: 'Cloud & DevOps Intern',
    company: 'Wipro FullStride Cloud · Gurugram, India',
    period: 'July 2024 – Sept 2024',
    type: 'Industry',
    techStack: ['Terraform', 'AWS', 'CI/CD', 'IaC', 'Real-Time Systems'],
    keyImpact: 'Automated cloud deployment pipelines on live client infrastructure',
    points: [
      'Engineered a horizontally scalable real-time chat system on AWS using Terraform IaC — enabling low-latency multi-user communication with fully automated, repeatable deployment pipelines.',
      'Designed fault-tolerant cloud architecture patterns that reduced manual intervention in deployment cycles, contributing directly to productivity on live client infrastructure.',
    ],
  },
  {
    role: 'ML Engineering Trainee',
    company: 'Meritech Software Pvt. Ltd. · Mohali, India',
    period: 'May 2023 – Aug 2023',
    type: 'Industry',
    techStack: ['Python', 'ML Pipelines', 'Data Preprocessing'],
    points: [
      'Optimized data preprocessing, training, and evaluation pipelines for production ML models — improving robustness and reducing variance across deployment environments.',
    ],
  },
];

async function seed() {
  await connectDB();
  console.log('Connected to DB. Clearing old data...');
  
  await SkillGroup.deleteMany({});
  await Experience.deleteMany({});

  console.log('Seeding Skills...');
  for (let i = 0; i < SKILL_GROUPS.length; i++) {
    await SkillGroup.create({ ...SKILL_GROUPS[i], order: i });
  }

  console.log('Seeding Experiences...');
  for (let i = 0; i < EXPERIENCES.length; i++) {
    await Experience.create({ ...EXPERIENCES[i], order: i });
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
