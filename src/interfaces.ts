export interface ITournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: IParticipants;
  startDate: string;
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
  tournaments: ITournament[];
}

interface Payload {
  response: ITournament[] | ITournament;
  id?: string;
}
