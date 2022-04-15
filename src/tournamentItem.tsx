import React from 'react';
import H6 from './components/H6';
import Button from './components/Button';
import './styles.css';
import { ITournament } from './interfaces';
import { editTournament, deleteTournament } from './reducers/tournaments';
import { useDispatch } from 'react-redux';

type TournamentItemsProps = {
  tournament: ITournament;
};

const TournamentItems: React.FC<TournamentItemsProps> = ({ tournament }) => {
  const dispatch = useDispatch();
  const date: string = new Date(tournament.startDate).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  );

  const handleEdit = (): void => {
    const tournamentName: string | null = prompt('New Tournament Name:');
    if (tournamentName) {
      const updateTournamentName = editTournament(
        tournamentName,
        tournament.id
      );
      dispatch(updateTournamentName);
    }
  };

  const handleDelete = (): void => {
    const confirmDelete: boolean = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (confirmDelete) {
      const deleteTournamentFunction = deleteTournament(tournament.id);
      dispatch(deleteTournamentFunction);
    }
  };

  return (
    <div className="tournamentItem">
      <H6>{tournament.name}</H6>
      <p>Organizser: {tournament.organizer}</p>
      <p>Game: {tournament.game}</p>
      <p>
        Participants: {tournament.participants.current} /{' '}
        {tournament.participants.max}
      </p>
      <p>Start: {date}</p>
      <Button className="editButton" onClick={handleEdit}>
        EDIT
      </Button>
      <Button className="deleteButton" onClick={handleDelete}>
        DELETE
      </Button>
    </div>
  );
};

export default TournamentItems;
