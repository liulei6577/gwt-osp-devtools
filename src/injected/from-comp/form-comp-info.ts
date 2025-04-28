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


/**
 * 创建FormCompDict，以类全名为键
 */
const createFormCompDict = (): any => {
    const map: any = {};

    map[HelpComboBox.clazz] = HelpComboBox;

    return map;
};

export default createFormCompDict();