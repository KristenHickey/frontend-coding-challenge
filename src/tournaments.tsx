import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Container from './components/Container';
import TournamentItems from './tournamentItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTournaments,
  postTournament,
  searchTournaments
} from './reducers/tournaments';
import { useDebouncedCallback } from 'beautiful-react-hooks';
import { selectError, selectTournaments } from './selectors/tournaments';

function Tournaments() {
  const tournaments = useSelector(selectTournaments);
  const error = useSelector(selectError);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleClick = (): void => {
    const tournamentName = prompt('Tournament Name:');
    if (tournamentName) {
      const postNewTournament = postTournament(tournamentName);
      dispatch(postNewTournament);
    }
  };

  const getTournaments = async (): Promise<void> => {
    await dispatch(fetchTournaments);
    setIsLoading(false);
  };

  const tournamentItems = (): JSX.Element => {
    if (tournaments && tournaments.length >= 1) {
      const items = tournaments.map(tournament => {
        return <TournamentItems key={tournament.id} tournament={tournament} />;
      });
      return <div className="tournament-grid">{items}</div>;
    } else {
      return <p className="alt-text">No tournaments found.</p>;
    }
  };

  const renderTournaments = (): JSX.Element => {
    if (isLoading && !error) {
      return <p className="alt-text">Loading tournaments ...</p>;
    } else if (!isLoading && !error) {
      return tournamentItems();
    } else {
      return (
        <>
          <p className="alt-text">Something went wrong</p>
          <Button onClick={getTournaments}>RETRY</Button>
        </>
      );
    }
  };

  const onSearch = useDebouncedCallback(
    async (search: string): Promise<void> => {
      setIsLoading(true);
      await dispatch(searchTournaments(search));
      setIsLoading(false);
    },
    [dispatch, searchTournaments],
    300
  );

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <Container>
      <div className="input-search">
        <Input
          placeholder="Search tournament..."
          onChange={e => onSearch(e.target.value)}
        />
        <Button onClick={handleClick}>CREATE TOURNAMENT</Button>
      </div>
      {renderTournaments()}
    </Container>
  );
}

export default Tournaments;
