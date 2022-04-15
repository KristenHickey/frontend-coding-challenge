import { Dispatch } from 'redux';
import {
  deleteTournamentAction,
  editTournamentAction,
  errorAction,
  fetchTournamentAction,
  postTournamentAction
} from '../actions/tournaments';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { ITournamentState, IAction } from '../interfaces';

const initialState: ITournamentState = { data: [], error: false };

export default function tournaments(
  state: ITournamentState = initialState,
  action: IAction
) {
  switch (action.type) {
    case 'tournaments/getTournaments': {
      return {
        ...state,
        data: action.payload,
        error: false
      };
    }
    case 'tournaments/postTournament': {
      return {
        ...state,
        data: [action.payload, ...state.data],
        error: false
      };
    }

    case 'tournaments/editTournament': {
      return {
        ...state,
        data: state.data.map(tournament => {
          if (tournament.id !== action.payload.id) {
            return tournament;
          } else {
            return action.payload.response;
          }
        }),
        error: false
      };
    }

    case 'tournaments/deleteTournament': {
      return {
        ...state,
        data: state.data.filter(
          tournament => tournament.id !== action.payload.id
        ),
        error: false
      };
    }

    case 'tournaments/error': {
      return {
        ...state,
        error: true
      };
    }

    default:
      return state;
  }
}

const fetchRequest = (endPoint: string, options?: any) => {
  return fetch(API_TOURNAMENTS_URL + endPoint, options)
    .then(res => (res.status < 400 ? res : Promise.reject()))
    .then(res => (res.status !== 204 ? res.json() : res));
};

export async function fetchTournaments(dispatch: Dispatch) {
  try {
    const response = await fetchRequest('');
    dispatch(fetchTournamentAction(response));
  } catch (error) {
    dispatch(errorAction);
  }
}

export function searchTournaments(query: string) {
  return async function searchTournamentsThunk(dispatch: Dispatch) {
    try {
      const response = await fetchRequest(`/?q=${query}`);
      dispatch(fetchTournamentAction(response));
    } catch (error) {
      dispatch(errorAction);
    }
  };
}

export function postTournament(text: string) {
  return async function postTournamentThunk(dispatch: Dispatch, getState: any) {
    const response = await fetchRequest('', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    dispatch(postTournamentAction(response));
  };
}

export function editTournament(text: string, id: string) {
  return async function editTournamentThunk(dispatch: Dispatch) {
    const response = await fetchRequest(`/${id}`, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    dispatch(editTournamentAction(response, id));
  };
}

export function deleteTournament(id: string) {
  return async function deleteTournamentThunk(dispatch: Dispatch) {
    await fetchRequest(`/${id}`, {
      method: 'DELETE'
    });
    dispatch(deleteTournamentAction(id));
  };
}
