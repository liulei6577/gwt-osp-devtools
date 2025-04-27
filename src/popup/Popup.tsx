import {List} from 'antd';
import styled from 'styled-components';

const StyledList = styled(List)`
    .ant-list-item {
        margin: 0;
        padding: 0;
        color: #FFFFFF;

        &:hover {
            background-color: #323232;
        }

        p {
            margin: 0;
            padding: 0;
        }
    }
`;

export interface PopupFunction {
    id: number;
    name: string;
    link: string;
}

const functions: PopupFunction[] = [
    {id: 1, name: '使用说明', link: 'readme.html'},
];

const listItemOnClick = (link: string) => {
    chrome.tabs.create({url: link});
};

const listRenderItem = (item: PopupFunction) => {
    return (
        <List.Item>
            <p onClick={() => listItemOnClick(item.link)}>
                {item.name}
            </p>
        </List.Item>
    );
};

function Popup() {
    return (
        <div>
            <StyledList>
                <List
                    dataSource={functions}
                    renderItem={listRenderItem}
                >
                </List>
            </StyledList>
        </div>
    );
}

export default Popup;