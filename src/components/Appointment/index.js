import React, {useEffect, useMemo} from 'react';
import {parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date],)

  useEffect(() => {
    console.tron.log(data.provider.name);
  })


  return (
    <Container past={data.past}>
      <Left>
        <Avatar source={{
          uri: data.provider.avatar
            ? data.provider.avatar.url
            : `https://api.adorable.io/avatar/50/${data.provider.name}`}}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at &&(
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcons name="event-busy" size={20} color="#f64c75"/>
        </TouchableOpacity>
      )}

    </Container>
  );
}
