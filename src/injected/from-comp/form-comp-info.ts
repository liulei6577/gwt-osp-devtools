import * as Method from './from-comp-method';

const HelpComboBox: FromCompInfo = {
    clazz: 'com.efounder.gwt.comp.HelpComboBox',
    method: [
        Method.getObject,
        Method.setObject,
        Method.isVisible,
        Method.setVisible,
        Method.setCanEdit,
        Method.setSelectedIndex,
        Method.getSelectedItem,
        Method.getSelectedValue
    ],
};

const GenerAction: FromCompInfo = {
    clazz: 'com.efounder.gwt.action.GenerAction',
    method: [
        Method.doAction,
        Method.setEnabled,
        Method.getEnabled,
        Method.isVisible,
        Method.setVisible,
        Method.getVisible,
        Method.setActionText,
        Method.setActionIcon,
        Method.getVisibleExpression,
        Method.setVisibleExpression,
    ],
};

/**
 * 创建FormCompDict，以类全名为键
 */
const createFormCompDict = (): any => {
    const map: any = {};

    map[HelpComboBox.clazz] = HelpComboBox;
    map[GenerAction.clazz] = GenerAction;

    return map;
};

export default createFormCompDict();