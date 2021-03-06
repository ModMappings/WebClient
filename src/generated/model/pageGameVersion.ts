/**
 * ModMappings API
 * This is the api for ModMappings. It is currently in development and in an alpha stage.
 *
 * The version of the OpenAPI document: 0.0.0-Dev
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { GameVersion } from './gameVersion';


export interface PageGameVersion { 
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<GameVersion>;
    number?: number;
    sort?: Sort;
    numberOfElements?: number;
    first?: boolean;
    pageable?: Pageable;
    last?: boolean;
    empty?: boolean;
}

