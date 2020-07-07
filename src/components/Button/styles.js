import styled from 'styled-components'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  height: 80px;
  width: 300px;
  background: ${(props) => (props.color ? props.color : '#222')};
  border-radius: 40px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
`;
