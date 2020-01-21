import {DateTime} from 'luxon';

export interface GameVersion {
  id: string;
  createdBy: string;
  createdOn: DateTime;
  name: string;
  preRelease: boolean;
  snapshot: boolean;
}
