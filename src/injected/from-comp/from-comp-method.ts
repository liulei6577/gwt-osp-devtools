export const getObject: FromCompMethod = {methodName: 'getObject', argCount: 0};
export const setObject: FromCompMethod = {methodName: 'setObject', argCount: 1};
export const setCanEdit: FromCompMethod = {methodName: 'setCanEdit', argCount: 1};
export const getSelectedIndex: FromCompMethod = {methodName: 'getSelectedIndex', argCount: 0};
export const setSelectedIndex: FromCompMethod = {methodName: 'setSelectedIndex', argCount: 1};
export const getSelectedItem: FromCompMethod = {methodName: 'getSelectedItem', argCount: 0};
export const getSelectedValue: FromCompMethod = {methodName: 'getSelectedValue', argCount: 0};
export const call: FromCompMethod = {methodName: 'call', argCount: 1, description: '调用'};
export const doAction: FromCompMethod = {methodName: 'doAction', argCount: 0, description: '执行'};
export const setEnabled: FromCompMethod = {methodName: 'setEnabled', argCount: 1, description: '设置启用'};
export const getEnabled: FromCompMethod = {methodName: 'getEnabled', argCount: 0, description: '获取启用'};
export const isVisible: FromCompMethod = {methodName: 'isVisible', argCount: 0, description: '是否可见'};
export const setVisible: FromCompMethod = {methodName: 'setVisible', argCount: 1, description: '设置是否可见'};
export const getVisible: FromCompMethod = {methodName: 'getVisible', argCount: 0, description: '获取是否可见'};
export const setActionText: FromCompMethod = {methodName: 'setActionText', argCount: 1, description: '设置动作文本'};
export const setActionIcon: FromCompMethod = {methodName: 'setActionIcon', argCount: 1, description: '设置动作图标'};
export const getVisibleExpression: FromCompMethod = {
    methodName: 'getVisibleExpression',
    argCount: 0,
    description: '获取可见表达式'
};
export const setVisibleExpression: FromCompMethod = {
    methodName: 'setVisibleExpression',
    argCount: 1,
    description: '设置可见表达式'
};