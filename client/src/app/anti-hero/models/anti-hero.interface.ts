export interface AntiHero {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
}

export enum TableActions {
  View,
  Delete
}

export enum CommandBarActions {
  Create,
  DeleteAll
}
