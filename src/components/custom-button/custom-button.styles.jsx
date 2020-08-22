import styled from 'styled-components';

const backgroundColor = color => {
    switch (color) {
        case 'blue':
            return '#0095fa';
        case 'dark-blue':
            return '#0064d4';
        case 'gray':
            return '#aaa';
        case 'red':
            return '#e60a7d';
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
        case 'dark-blue':
            return '1px solid #0064d4';
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
`;