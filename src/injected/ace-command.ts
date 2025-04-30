import * as prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';

/**
 * 格式化代码
 * @param editor
 */
const formatCode = (editor: any) => {
    prettier.format(editor.getValue(), {
        parser: 'babel',
        plugins: [parserBabel, estreePlugin],
        useTabs: false,
        tabWidth: 4,
        semi: true,
        printWidth: Number.MAX_SAFE_INTEGER,
    }).then(result => editor.setValue(result)).catch(error => {
        const msg = String(error.codeFrame)
            .replace(/\n/gi, '<br/>')
            .replace(/ /gi, '&nbsp;&nbsp;');
        const showAlert = getShowAlert();
        showAlert(msg, '代码错误', 'MESSAGE_ERROR', '确定', null);
    });
};

const getShowAlert = () => {
    if (window.showAlert) {
        return window.showAlert;
    } else {
        const element = window.document.getElementById('GWTStandard') as HTMLElement;
        return element.contentWindow.showAlert;
    }
};

/**
 * 抽取变量
 * @param editor
 */
const extractVariable = (editor: any) => {
    const session = editor.session;
    const selection = editor.getSelection();
    const cursor = selection.getCursor();

    //取出从当前光标位置到开始位置的字符
    const selectedText = session.getTextRange({
        start: {row: cursor.row, col: 0},
        end: {row: cursor.row, col: cursor.column},
    });

    const varName = generateVariableName(selectedText);
    const prefixText = `let ${varName} = `;
    session.insert({row: cursor.row, column: 0}, prefixText);

    selection.moveCursorTo(cursor.row, prefixText.length - 3);
};


/**
 * 生成变量名，规则过于简单
 * @param text
 */
const generateVariableName = (text: string) => {

    //处理xxxx.getXxxx()这种
    if (text.endsWith('()') || text.endsWith('();')) {
        const matchArray1 = text.match(/\.get([A-Za-z]+)\(\)/);
        if (matchArray1 && matchArray1[1]) {
            return matchArray1[1].charAt(0).toLowerCase() + matchArray1[1].slice(1);
        }
    }

    //处理xxxx.getXxxx("name", "")这种
    const matchArray2 = text.match(/\.\w+\(\s*(["'])([^"']+)\1\s*(?:,\s*\1\1\s*)?\)\s*;?/);
    if (matchArray2 && matchArray2[2]) {
        return matchArray2[2];
    }

    return 'value';
};


/**
 * 添加命令
 * @param editor
 */
export const addCommand = (editor: any) => {
    const formatCodeCommand = {
        name: 'formatCode',
        bindKey: {win: 'Alt-Shift-F', mac: 'Option-Shift-F'},
        exec: () => formatCode(editor)
    };
    const extractVariableCommand = {
        name: 'extractVariable',
        bindKey: {win: 'Ctrl-Alt-V', mac: 'Command-Option-V'},
        exec: () => extractVariable(editor)
    };
    editor.commands.addCommand(formatCodeCommand);
    editor.commands.addCommand(extractVariableCommand);
};



