import React from 'react';
import Container from './components/Container';
import Button from './components/Button';
import Input from './components/Input';
import H4 from './components/H4';
import './styles.css';

const Header: React.FC = () => {
  function handleClick(): void {
    const tournamentName = prompt('Tournament Name:');
    console.log(tournamentName);
  }

  return (
    <>
      <Container>
        <H4>FACEIT Tournaments</H4>
      </Container>
      <Container>
        <div className="input-search">
          <Input placeholder="Search tournament..." />
          <Button onClick={handleClick}>CREATE TOURNAMENT</Button>
        </div>
      </Container>
    </>
  );
};

export default Header;
