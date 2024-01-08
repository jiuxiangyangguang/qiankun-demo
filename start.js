const { exec } = require('child_process');

const projects = ['qiankun-base', 'qiankun-micro-app1', 'qiankun-micro-app2'];
const sequentialStart = true; // 设置为true以依次启动项目，设置为false以同时启动所有项目

async function startProject(project) {
  return new Promise((resolve, reject) => {
    console.log(`正在启动 ${project}...`);

    const child = exec(`cd ${project} && pnpm start`, (error) => {
      if (error) {
        console.error(`启动 ${project} 时出错: ${error.message}`);
        reject(error);
        return;
      }
    });

    child.stdout.on('data', (data) => {
      console.log(`${project} stdout: ${data}`);
      if (data.includes('Compiled successfully!')) {
        console.log(`${project} 成功启动。`);
        resolve();
      }
    });

    child.stderr.on('data', (data) => {
      console.error(`${project} stderr: ${data}`);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`${project} 退出，代码 ${code}`);
        reject(new Error(`${project} exited with code ${code}`));
      }
    });
  });
}


async function startProjects() {
  if (sequentialStart) {
    for (const project of projects) {
      try {
        await startProject(project);
      } catch (error) {
        console.error(`启动 ${project} 时出错: ${error.message}`);
        process.exit(1);
      }
    }
  } else {
    const promises = projects.map(startProject);
    await Promise.all(promises);
  }
}

startProjects();
