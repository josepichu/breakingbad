export interface Character {
  // eslint-disable-next-line camelcase
  char_id: number;
  name: string;
  nickname: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: 'Alive' | 'Deceased' | 'Presumed dead';
  appearance: number[];
  portrayed: string;
  category: string;
}
