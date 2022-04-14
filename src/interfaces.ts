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
