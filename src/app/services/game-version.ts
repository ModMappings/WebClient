import {DateTime} from 'luxon';

export interface GameVersion {
  id: string;
  createdBy: string | null;
  createdOn: DateTime | null;
  name: string;
  preRelease: boolean;
  snapshot: boolean;
}
