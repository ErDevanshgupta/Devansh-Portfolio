const testAPI = async () => {
  let cookie = '';
  // 1. Health
  const r1 = await fetch('http://localhost:5000/api/health');
  console.log('Health:', await r1.json());

  // 2. Login
  const r2 = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'erdevanshgupta@gmail.com', password: 'Admin@123' })
  });
  console.log('Login:', await r2.json());
  cookie = r2.headers.get('set-cookie');

  // 3. Admin Projects
  const r3 = await fetch('http://localhost:5000/api/admin/projects', {
    headers: { 'Cookie': cookie }
  });
  console.log('Admin Projects:', await r3.json());

  // 4. Create Project
  const r4 = await fetch('http://localhost:5000/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
    body: JSON.stringify({ slug: 'test', title: 'Test Project', tagline: 'Tag', problem: 'Prob', approach: 'App', status: 'published' })
  });
  console.log('Create Project:', await r4.json());

  // 5. Public Projects
  const r5 = await fetch('http://localhost:5000/api/projects');
  console.log('Public Projects:', await r5.json());

  // 6. Contact
  const r6 = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Hello', message: 'This is a test message with more than ten characters.' })
  });
  console.log('Contact:', await r6.json());

  // Cleanup project
  const r7 = await fetch('http://localhost:5000/api/admin/projects', {
    headers: { 'Cookie': cookie }
  });
  const projects = await r7.json();
  const testProject = projects.data.find(p => p.slug === 'test');
  if (testProject) {
    await fetch(`http://localhost:5000/api/admin/projects/${testProject._id}`, {
      method: 'DELETE',
      headers: { 'Cookie': cookie }
    });
    console.log('Test project cleaned up.');
  }
};
testAPI();
