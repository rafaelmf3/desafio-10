import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  format,
  subDays,
  addDays,
} from "date-fns";
import pt from "date-fns/locale/pt";
import api from '~/services/api';

import { Container, List, Text, HeaderView } from './styles';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

export default function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  async function loadMeetups(selectedPage = 1) {
    if (selectedPage > 1 && !hasMore) return;

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {

      const response = await api.get("meetups", {
        query: { date }
      });

      setMeetups(response.data);
    }
    loadMeetups();
  }, [date]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMeetups();
    }
  }, [isFocused, date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleRegister(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso', 'Você está inscrito nesta meetup!');
    } catch (error) {
      const message = error.response.data.error;
      Alert.alert('Erro', message);
    }
  }

  return (
    <Background>
      <Container>
        <Header/>
        <HeaderView>
          <TouchableOpacity onPress={handlePrevDay}>
            <MaterialIcons name="chevron-left" size={36} color="#FFF" />
          </TouchableOpacity>
          <Text>{dateFormatted}</Text>
          <TouchableOpacity onPress={handleNextDay}>
            <MaterialIcons name="chevron-right" size={36} color="#FFF" />
          </TouchableOpacity>
        </HeaderView>
        {
          (meetups.length ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  onCancel={() => handleCancel(item.id)}
                  onRegister={() => handleRegister(item.id)}
                  data={item}
                />
              )}
            />
          ) : (
            <Text>Não há Meetups neste dia</Text>
          )
        )}
      </Container>
    </Background>
  );

}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (<MaterialIcons name="format-list-bulleted" size={20} color={tintColor} />),
}
