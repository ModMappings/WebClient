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
import { Mappable } from './mappable';
import { Pageable } from './pageable';
import { Sort } from './sort';


export interface PageMappable { 
    totalElements?: number;
    totalPages?: number;
    first?: boolean;
    number?: number;
    sort?: Sort;
    numberOfElements?: number;
    pageable?: Pageable;
    last?: boolean;
    size?: number;
    content?: Array<Mappable>;
    empty?: boolean;
}

