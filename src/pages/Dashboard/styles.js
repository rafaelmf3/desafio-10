import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  /* margin: 50px auto; */

`;


export const HeaderView = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  margin-bottom: 80px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin: 0 15px;
`;
