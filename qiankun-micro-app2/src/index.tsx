import ReactDOM from 'react-dom';
import App from './App';
import './public-path';
// @ts-ignore
function render(props) {
  const { container } = props;
  const rootElement = container ? container.querySelector('#root') : document.querySelector('#root');
// @ts-ignore
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}
// @ts-ignore
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}
// @ts-ignore
export async function unmount(props) {
  const { container } = props;
  const rootElement = container ? container.querySelector('#root') : document.querySelector('#root');
  const root = ReactDOM.findDOMNode(rootElement);
// @ts-ignore
  if (root && root._reactRootContainer) {
// @ts-ignore
    root._reactRootContainer.unmount();
  }
}