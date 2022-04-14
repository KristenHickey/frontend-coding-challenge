import { API_TOURNAMENTS_URL } from '../constants/api';
import { ITournament, IAction } from '../interfaces';

const initialState: ITournament[] = [];

export default function tournaments(
  state: ITournament[] = initialState,
  action: IAction
) {
  switch (action.type) {
    case 'tournaments/getTournaments': {
      return action.payload;
    }
    case 'tournaments/postTournament': {
      return [action.payload, ...state];
    }

    case 'tournaments/editTournament': {
      return state.map(tournament => {
        if (tournament.id !== action.payload.id) {
          return tournament;
        } else {
          return action.payload.response;
        }
      });
    }

    case 'tournaments/deleteTournament': {
      return state.filter(tournament => tournament.id !== action.payload.id);
    }

    default:
      return state;
  }
}

const fetchRequest = (endPoint?: string, options?: any) => {
  return fetch('http://localhost:4000/tournaments' + '/' + endPoint, options)
    .then(res => (res.status < 400 ? res : Promise.reject()))
    .then(res => (res.status !== 204 ? res.json() : res))
    .catch(err => console.log('Error: ', err));
};

export async function fetchTournaments(dispatch: any, getState: any) {
  const response = await fetchRequest('');
  dispatch({ type: 'tournaments/getTournaments', payload: response });
}

export function postTournament(text: string) {
  return async function postTournamentThunk(dispatch: any, getState: any) {
    console.log(text);
    const response = await fetchRequest('', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    dispatch({ type: 'tournaments/postTournament', payload: response });
  };
}

export function editTournament(text: string, id: string) {
  return async function editTournamentThunk(dispatch: any, getState: any) {
    console.log(text);
    const response = await fetchRequest(id, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    console.log(response);
    dispatch({
      type: 'tournaments/editTournament',
      payload: { id: id, response }
    });
  };
}

export function deleteTournament(id: string) {
  return async function deleteTournamentThunk(dispatch: any, getState: any) {
    const response = await fetchRequest(id, {
      method: 'DELETE'
    });
    console.log(response);
    dispatch({
      type: 'tournaments/deleteTournament',
      payload: { id: id, response }
    });
  };
}
