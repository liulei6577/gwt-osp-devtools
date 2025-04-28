/**
 * 注入脚本
 * @param filename
 */
export const inject = (file: string) => {
    const url = chrome.runtime.getURL(file);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
    console.log('injected ' + file);
};