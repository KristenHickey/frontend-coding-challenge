import { IState } from '../interfaces';
import { RootState } from '../reducers';

export const selectTournaments = (state: IState) => state.tournaments.data;
export const selectError = (state: IState) => state.tournaments.error;
