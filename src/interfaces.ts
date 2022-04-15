export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: IParticipants;
  startDate: string;
}

export interface ITournamentState {
  data: ITournament[];
  error: boolean;
}
interface IParticipants {
  current: number;
  max: number;
}

export interface IAction {
  type: string;
  payload: Payload;
}

export interface IState {
  tournaments: ITournamentState;
}

interface Payload {
  response: ITournament[] | ITournament;
  id?: string;
}
