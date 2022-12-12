import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

interface SDKConfig {
  appId: string;
  baseUrl?: string;
  onPageShow?: () => void;
  onPagesHide?: () => void;
}

const QUEUE: any[] = []; // 任务队列
// @ts-ignore
window.QUEUE = QUEUE;
const NOOP = () => null;

const reportWebVitals = (onPerfEntry: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // 布局偏移量
    onFID(onPerfEntry); // 首次输入延迟时间
    onFCP(onPerfEntry); // 首次内容渲染时间
    onLCP(onPerfEntry); // 首次最大内容渲染时间
    onTTFB(onPerfEntry); // 首个字节到达时间
  }
};

const json2FormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};

export class AgoraReportSDK {
  appId = '';
  baseUrl = '';
  timeOnPage = 0;
  config = {};
  onPageShow;
  onPagesHide;

  constructor(options: SDKConfig) {
    const { appId, baseUrl = '', onPageShow = NOOP, onPagesHide = NOOP } = options;
    this.appId = appId;
    this.baseUrl = baseUrl;
    this.onPageShow = onPageShow;
    this.onPagesHide = onPagesHide;

    this.listenPage();
  }

  setConfig(config: SDKConfig) {
    this.config = config;
  }

  listenPage() {
    let pageShowTime = 0;
    window.addEventListener('pageshow', () => {
      pageShowTime = performance.now();

      // 页面性能指标上报
      reportWebVitals((data: any) => {
        console.log('reportWebVitals', data);
        this.performanceReport({ data });
      });

      // 执行 onPageShow
      this.onPageShow();
    });

    window.addEventListener('pagehide', () => {
      console.log('pagehide');
      console.log('QUEUE', QUEUE);
      // 记录用户在页面停留时间
      this.timeOnPage = performance.now() - pageShowTime;

      // 刷新队列前执行 onPagesHide
      this.onPagesHide();

      // 刷新任务队列
      this.flushQueue();
    });
  }

  // 刷新任务队列
  flushQueue() {
    Promise.resolve().then(() => {
      QUEUE.forEach((fn) => fn());
      QUEUE.length = 0;
    });
  }

  report(config: any) {
    QUEUE.push(() => {
      const formData = json2FormData({
        ...this.config,
        ...config,
        time: new Date().toLocaleString(),
        appId: this.appId,
        pageUrl: window.location.href,
      });
      navigator.sendBeacon(`${this.baseUrl}${config.url || ''}`, formData);
    });
  }

  // 用户行为上报
  actionReport(config: any) {
    this.report({
      ...config,
      type: 'action',
    });
  }

  // 网络状况上报
  networkReport(config: any) {
    this.report({
      ...config,
      type: 'network',
    });
  }

  // 页面性能指标上报
  performanceReport(config: any) {
    this.report({
      ...config,
      type: 'performance',
    });
  }

  // 错误警告上报
  errorReport(config: any) {
    this.report({
      ...config,
      type: 'error',
    });
  }
}


export default AgoraReportSDK
