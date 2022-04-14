import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Container from './components/Container';
import { ITournament } from './interfaces';
import TournamentItems from './tournamentItem';

function Tournaments() {
  const [searchInput, setSearchInput] = useState('');

  function handleClick(): void {
    const tournamentName = prompt('Tournament Name:');
    console.log(tournamentName);
  }

  //functions for search
  const setSearchValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  // const searchList: ITournament[] =
  //   filteredProfiles &&
  //   filteredProfiles.filter((profile) => {
  //     return (
  //       (profile.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) ||
  //         profile.surname.toLowerCase().includes(searchInput.toLowerCase())) &&
  //       existingFriendsArray &&
  //       !existingFriendsArray.includes(profile.userId)
  //     );
  //   });

  return (
    <Container>
      <div className="input-search">
        <Input placeholder="Search tournament..." />
        <Button onClick={handleClick}>CREATE TOURNAMENT</Button>
      </div>
      <TournamentItems />
    </Container>
  );
}

export default Tournaments;
