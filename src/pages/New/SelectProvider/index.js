import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Background from '~/components/Background';
import api from '~/services/api';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(()=>{
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider onPress={() => { navigation.navigate('SelectDateTime', {
              provider
            })}}>
              <Avatar source={{
                uri: provider.avatar
                  ? provider.avatar.url
                  : `https://api.adorable.io/avatar/50/${provider.name}`}}/>
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity onPress={() => { navigation.navigate('Dashboard')}}>
      <MaterialIcons name="chevron-left" size={20} color="#fff"  />
    </TouchableOpacity>
  )
});
