import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import './styles.css';

const Header: React.FC = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
    </Container>
  );
};

export default Header;
