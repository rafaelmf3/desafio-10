import React, {useEffect, useMemo} from 'react';
import {parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Banner, Info, Name, Field, FieldText, CancelButton } from './styles';

export default function Meetup({ data, onCancel, onRegister }) {
  const eventDate = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM', às 'H'h'", {
      locale: pt,
    });
  }, [data.date],)

  useEffect(() => {
    console.tron.log('DATAAA:', data.banner.url);
  })


  return (
    <Container past={data.past}>
      <Banner source={{ uri: data.banner && data.banner.url }} />

      <Info>
        <Name>{data.title}</Name>
        <Field>
          <MaterialIcons name="event" size={20} color="#999"/>
          <FieldText>{eventDate}</FieldText>
        </Field>
        <Field>
          <MaterialIcons name="location-on" size={20} color="#999"/>
          <FieldText>{data.location}</FieldText>
        </Field>
        <Field>
          <MaterialIcons name="person" size={20} color="#999"/>
          <FieldText>Organizador: {data.organizer.name}</FieldText>
        </Field>


        {onRegister && !data.past && (
          <Button onPress={onRegister}>Subscribe</Button>
        )}

        {onCancel && (
          <CancelButton onPress={onCancel}>
            Cancel subscription
          </CancelButton>
        )}
      </Info>
    </Container>
  );
}
