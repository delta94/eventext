import styled from 'styled-components';

const backgroundColor = color => {
    switch (color) {
        case 'blue':
            return '#0095fa';
        case 'gray':
            return '#aaa';
        case 'red':
            return '#e60a7d';
        default:
            return '#fff';
    }
};

const hoverColor = color => {
    switch (color) {
        case 'blue':
            return '#0075dc';
        case 'gray':
            return '#999';
        case 'red':
            return '#cf0970';
        case 'white-blue':
            return '#fafafa';
        default:
            return '#fff';
    }
};

const border = color => {
    switch (color) {
        case 'white-blue':
            return '1px solid #0064d4';
        case 'blue':
            return '1px solid #0095fa';
        case 'gray':
            return '1px solid #aaa';
        case 'red':
            return '1px solid #e60a7d';
        default:
            return 'none';
    }
};

const fontColor = color => {
    switch (color) {
        case 'white-blue':
            return '#0064d4';
        default:
            return '#fff';
    }
};

export const CustomButton = styled.button`
    border-radius: 5px;
    padding: 7px 12px;
    border: ${({ color }) => border(color)};
    color: ${({ color }) => fontColor(color)};
    background-color: ${({ color }) => backgroundColor(color)};
    font-weight: 600;
    transition: all 150ms linear;

    &:hover {
        background-color: ${({ color }) => hoverColor(color)};
        border: 1px solid ${({ color }) => color === 'white-blue' ? 'auto' : hoverColor(color)};
        transition: all 150ms linear;
    }
`;