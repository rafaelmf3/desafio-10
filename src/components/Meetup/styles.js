import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View.attrs({
  elevation: 2,
})`
  background: #fff;
  border-radius: 4px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 30px;
  overflow: hidden;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 140px;
  align-content: stretch;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
`;

export const Field = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const FieldText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-left: 10px;
`;

export const CancelButton = styled(Button)`
  background: #f64c75;
`;
