import createMethodCompleter from './from-comp';
import {addCommand} from './ace-command';

(() => {

    /**
     * 查找ACE编辑器的元素id
     * @param element
     */
    const findAceEditorId = (element: HTMLElement): string | undefined => {
        try {
            return (element.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0] as HTMLElement).id;
        } catch (_e) {
        }
    };

    /**
     * 等待ACE编辑器加载完成
     * @param aceEditorId
     * @param times 执行次数
     */
    const waitAceLoaded = (aceEditorId: string, times: number) => {
        if (window.ace) {
            const editor: any = window.ace.edit(aceEditorId);
            bindingHotKey(editor);
            addCommand(editor);
            const formDesigner = getFormDesigner();
            const formDesignerCompleter = createFormDesignerCompleter(formDesigner);
            const methodCompleter = createMethodCompleter(formDesigner);
            appendCompleter(editor, formDesignerCompleter, methodCompleter);
        } else if (times < 10) {
            setTimeout(() => waitAceLoaded(aceEditorId, times + 1), 100);
        }
    };

    /**
     * 追加Completer
     * @param editor
     * @param completers
     */
    const appendCompleter = (editor: any, ...completers: any[]) => {
        const ids: string[] = completers.map(item => item.id);
        const newCompleters = editor.completers.filter((item: any) => !ids.includes(item.id));
        newCompleters.push(...completers);
        editor.completers = newCompleters;
    };

    /**
     * 初始化元素变动监听
     */
    const initMutationObserver = () => {
        const body = document.body;
        if (body) {
            // eslint-disable-next-line
            const observer = new MutationObserver((mutationsList, observer) => {
                mutationsList.forEach(mutation => {
                    if (mutation.addedNodes && mutation.addedNodes[0]) {
                        const element: HTMLElement = mutation.addedNodes[0] as HTMLElement;
                        const aceEditorId = findAceEditorId(element);
                        if (aceEditorId) {
                            console.log('AceEditorId=', aceEditorId);
                            waitAceLoaded(aceEditorId, 0);
                        }
                    }
                });
            });
            observer.observe(body, {
                childList: true,
            });
        }
    };

    /**
     * 表单设计器的数据
     */
    const getDNDManager = (): any => {
        if (window.manager_0) {
            return window.manager_0;
        } else {
            const element = window.document.getElementById('GWTStandard') as HTMLElement;
            return element.contentWindow.manager_0;
        }
    };

    /**
     * 根据当前激活的页签获取FormDesigner
     */
    const getFormDesigner = (): FormDesigner => {

        //从页面上获取页签元素
        const ulElement = Array.from(document.getElementsByTagName('ul'))
            .filter(e => e.innerHTML.includes('首页'))[0];

        //筛选出含表单设计器的元素
        const tabElements = Array.from(ulElement.childNodes)
            .filter(e => (e as HTMLElement).innerHTML.includes('表单设计器'))
            .map(e => e as HTMLElement);

        //定位当前激活的页签
        let index = 0;
        for (let i = 0; i < tabElements.length; i++) {
            //H1T5YUB-pc-p修饰的li是激活状态，可能能会变动，可以用代码算出来，目前先用常量值
            if (tabElements[i].className.includes('H1T5YUB-pc-p')) {
                index = i;
            }
        }

        const dndManager = getDNDManager();
        const modelViewDropTarget = dndManager.dropTargets.array[(index * 4) + 0];
        const actionViewDropTarget = dndManager.dropTargets.array[(index * 4) + 1];
        const serverScriptViewDropTarget = dndManager.dropTargets.array[(index * 4) + 2];
        const uiCanvasDropTarget = dndManager.dropTargets.array[(index * 4) + 3];
        return parseToFormDesigner(modelViewDropTarget, actionViewDropTarget, serverScriptViewDropTarget, uiCanvasDropTarget);
    };

    /**
     * 将从window上获得的数据解析成FormDesigner
     * @param modelViewDropTarget
     * @param actionViewDropTarget
     * @param serverScriptViewDropTarget
     * @param uiCanvasDropTarget
     */
    const parseToFormDesigner = (
        modelViewDropTarget: any,
        actionViewDropTarget: any,
        serverScriptViewDropTarget: any,
        uiCanvasDropTarget: any): FormDesigner => {

        const modelComps = cvtFComps('model', modelViewDropTarget.dropWidget.store.allItems.array);
        const actionComps = cvtFComps('action', actionViewDropTarget.dropWidget.store.allItems.array,);
        const serverScriptComps = cvtFComps('server-script', serverScriptViewDropTarget.dropWidget.store.allItems.array);
        const uiComps: FormComponent[] = [];
        const layout = uiCanvasDropTarget.dropWidget.formContainer.children_0.array[0];
        cvtFCompsForUI('ui', layout.children_0.array, uiComps);

        return {
            modelComps,
            actionComps,
            serverScriptComps,
            uiComps,
        };
    };

    /**
     * 转换数据
     * @param group 分组
     * @param array
     */
    const cvtFComps = (group: string, array: any[]): FormComponent[] => {
        const comps: FormComponent[] = [];
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            const type: string = item.___clazz.typeName;
            const id: string = item.id_0 || item.id_1 || item.id_2 || item.id_3;
            const name: string = item.label_0 || item.label_1 || item.label_2 || item.label_3;
            if (type && id) {
                comps.push({group, type, id, name});
                if (type === 'com.efounder.gwt.model.MColumnModel') {
                    const childrenComps = cvtFComps(group, array[i].children_0.array);
                    comps.push(...childrenComps);
                }
            }
        }
        return comps;
    };

    /**
     * 转换数据，UI模型是需要递归转换的
     * @param group 分组
     * @param array
     * @param comps 组件
     */
    const cvtFCompsForUI = (group: string, array: any[], comps: FormComponent[]) => {
        const newArray = array.filter(i => i);
        for (let i = 0; i < newArray.length; i++) {
            const item: any = newArray[i];
            const type: string = item.___clazz.typeName;
            const id: string = item.id_0 || item.id_1 || item.id_2 || item.id_3;
            const name: string = item.label_0 || item.label_1 || item.label_2 || item.label_3 || id;
            if (type && id) {
                comps.push({group, type, id, name});
                if (item.children_0 && item.children_0.array) {
                    cvtFCompsForUI(group, item.children_0.array, comps);
                }
            }
        }
    };

    /**
     * 创建表单设计的补全器
     * @param formDesigner
     */
    const createFormDesignerCompleter = (formDesigner: FormDesigner) => {
        return {
            id: 'FormDesignerCompleter',
            getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: CompletionCallback) => {
                const completions = [];
                for (const key of Object.keys(formDesigner)) {
                    const compsCompletions: Completion[] = formDesigner[key].map(comp => {
                        return {
                            caption: comp.id,
                            value: comp.id,
                            snippet: undefined,
                            meta: comp.group,
                            score: calculateScore(prefix, comp.id),
                            docHTML: getDocHtml(comp)
                        };
                    });
                    completions.push(...compsCompletions);
                }
                callback(null, completions);
            }
        };
    };

    /**
     * 拼接docHtml
     * @param comp
     */
    const getDocHtml = (comp: FormComponent): string => {
        return `类型：${comp.type}<br/><hr/>名称：${comp.name}`;
    };

    /**
     * 计算提示评分
     * @param prefix
     * @param value
     */
    const calculateScore = (prefix: string, value: string) => {
        let score = 0;
        const prefixLC = prefix.toLowerCase();
        const valueLC = value.toLowerCase();

        if (valueLC.startsWith(prefixLC)) {
            score += 100;
        } else if (valueLC.includes(prefixLC)) {
            score += 70;
        }

        if (valueLC === prefixLC) {
            score += 30;
        }

        const lengthDiff = Math.abs(valueLC.length - prefixLC.length);
        score += Math.max(0, 20 - lengthDiff);

        return score;
    };

    /**
     * 绑定快捷键
     * @param editor
     */
    const bindingHotKey = (editor: any) => {
        editor.commands.bindKey({win: 'Ctrl-Shift-J', mac: 'Command-Shift-J'}, 'joinlines');
    };

    /**
     * 禁用浏览器的快捷键
     */
    const disableBrowserHotKey = () => {
        document.addEventListener('keydown', (event) => {
            //禁用Ctrl+R防止为了搜索而导致页面刷新
            if (!event.shiftKey && event.ctrlKey && (event.key === 'r' || event.key === 'R')) {
                event.preventDefault();
            }
        });
    };

    /**
     * 初始化函数
     */
    const init = () => {
        initMutationObserver();
        disableBrowserHotKey();
    };

    //初始化
    init();

})();