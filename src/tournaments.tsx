import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Container from './components/Container';
import { ITournament, IState } from './interfaces';
import TournamentItems from './tournamentItem';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTournaments, postTournament } from './reducers/tournaments';
//import store from './store'

function Tournaments() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();

  function handleClick(): void {
    const tournamentName = prompt('Tournament Name:');
    console.log(tournamentName);
    if (tournamentName) {
      const postNewTournament = postTournament(tournamentName);
      dispatch(postNewTournament);
    }
  }

  useEffect(() => {
    dispatch(fetchTournaments);
  }, []);

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
  const selectTournaments = (state: IState) => state.tournaments;
  const tournaments = useSelector(selectTournaments);
  const tournamentItems = tournaments.map(tournament => {
    return <TournamentItems key={tournament.id} tournament={tournament} />;
  });

  return (
    <Container>
      <div className="input-search">
        <Input placeholder="Search tournament..." />
        <Button onClick={handleClick}>CREATE TOURNAMENT</Button>
      </div>
      <div className="tournament-grid">{tournamentItems}</div>
    </Container>
  );
}

export default Tournaments;
