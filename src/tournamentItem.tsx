import React from 'react';
import H6 from './components/H6';
import Button from './components/Button';
import './styles.css';

function TournamentItems() {
  const tourn = {
    name: 'test',
    organizser: 'John Smith',
    game: 'Rocket League',
    participants: {
      current: 3,
      max: 250
    },
    start: '2020-02-27T11:28:02.233Z'
  };

  const date = new Date(tourn.start).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  return (
    <div className="tournamentItem">
      <H6>{tourn.name}</H6>
      <p>Organizser: {tourn.organizser}</p>
      <p>Game: {tourn.game}</p>
      <p>
        Participants: {tourn.participants.current} / {tourn.participants.max}
      </p>
      <p>Start: {date}</p>
      <Button className="editButton">EDIT</Button>
      <Button className="deleteButton">DELETE</Button>
    </div>
  );
}

export default TournamentItems;
