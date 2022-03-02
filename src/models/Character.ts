export interface Character {
  id: number;
  name: string;
  nickname: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: 'Alive' | 'Deceased';
  appearance: number[];
  portrayed: string;
  category: string;
}
