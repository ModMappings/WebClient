import { Injectable } from '@angular/core';
import {MappingsService, MappingType, MappingTypesService} from '../../generated';
import {getAllPages} from '../util/observable-functions';

@Injectable({
  providedIn: 'root'
})
export class TypeDeobfuscationServiceService {

  private mappingTypes: MappingType[] = [];
  private tree: Map<MappingType, MappingType[]> = new Map<MappingType, MappingType[]>();

  constructor(
    private mappingTypeService: MappingTypesService,
    private mappingsService: MappingsService
  ) {
    this.mappingTypeService.getMappingTypesBySearchCriteria({})
      .pipe(
        getAllPages(page => this.mappingTypeService.getMappingTypesBySearchCriteria({page}))
      )
      .subscribe(mappingTypes => {
        this.mappingTypes = mappingTypes;

        const outputTypedMap: Map<string, MappingType> = new Map<string, MappingType>();
        this.mappingTypes.forEach(type => outputTypedMap.set(type.stateOut, type));

        this.mappingTypes.forEach(type => {
          if (type.stateIn === 'Obfuscated') {
            this.tree.set(type, []);
          }
        })
      });
  }

  private resolveTypeTreeBranch(type: MappingType, outputTypedMap: Map<string, MappingType>): MappingType[] {
    return [];
  }

  public deobfuscateClass(obfuscatedTypeName: string, targetMappingTypeId: string) {

  }
}
