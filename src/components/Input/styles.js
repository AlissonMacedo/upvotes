
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background: #232129;
    width: 330px;
    height: 60px;
    border-color: #232129; 
    border-width: 2px;
    border-radius: 6px;
    padding: 10px 15px;
    margin: 10px;

    ${props => props.isErrored && css`
    border-color: #c53030; 
    `};

    ${props => props.isFocused && css`
    border-color: #7159c1; 
    `};
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;