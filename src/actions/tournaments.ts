import { ITournamentState } from '../interfaces';
import { RootState } from '../reducers';

export const fetchTournamentAction = (response: ITournamentState[]) => {
  return {
    type: 'tournaments/getTournaments',
    payload: response
  };
};

export const errorAction = { type: 'tournaments/error' };

export const postTournamentAction = (response: ITournamentState) => {
  return {
    type: 'tournaments/postTournament',
    payload: response
  };
};

export const editTournamentAction = (
  response: ITournamentState,
  id: string
) => {
  return {
    type: 'tournaments/editTournament',
    payload: { id: id, response }
  };
};

export const deleteTournamentAction = (id: string) => {
  return {
    type: 'tournaments/deleteTournament',
    payload: { id: id }
  };
};
