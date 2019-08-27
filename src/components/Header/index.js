import React from 'react';

import { Container, Image } from './styles';

import logo from '~/assets/logo-meetapp.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
