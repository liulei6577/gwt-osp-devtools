import {inject} from '../injected';

/* 根据URL来执行 */
const url = window.location.href;
console.log('url: ', url);
if (url.includes('TRMServer')) {
    inject('js/completion.js');
}