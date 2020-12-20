import {GameVersion, MappingType, Release} from '../../generated';

export interface SelectedMappingFilters {
  gameVersion: GameVersion | null;
  mappingType: MappingType | null;
  release: Release | null;
}
