import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Title, List } from './styles';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if(isFocused){
      loadAppointments();
    }
  },[isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(signOut())
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );

}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (<MaterialIcons name="event" size={20} color={tintColor} />),
}

export default withNavigationFocus(Dashboard);
