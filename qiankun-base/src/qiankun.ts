import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:3001',
    container: '#micro-app1',
    activeRule: () => true,
  },
  {
    name: 'app2',
    entry: '//localhost:3002',
    container: '#micro-app2',
    activeRule: () => true,
  },
]);
// 启动 qiankun
start({ singular: false });