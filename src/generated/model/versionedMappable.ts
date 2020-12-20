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
import { Visibility } from './visibility';


/**
 * Represents a single piece of the sourcecode whose name can be remapped in a given version of the game.
 */
export interface VersionedMappable { 
    /**
     * The id of the versioned mappable.
     */
    readonly id?: string;
    /**
     * The id of the user who created the versioned mappable.
     */
    readonly createdBy?: string;
    /**
     * The moment the versioned mappable was created.
     */
    readonly createdOn?: string;
    /**
     * The id of the game versioned in which this versioned mappable exists.
     */
    gameVersionId?: string;
    /**
     * The id of the mappable which is represented by this versioned mappable in the game version.
     */
    mappableId?: string;
    /**
     * The id of the class this versioned mappable resides in. Might be null if the mappable this versioned mappable represents is not representing a method or field.
     */
    parentClassId?: string;
    /**
     * The id of the method this versioned mappable resides in. Might be null if the mappable this versioned mappable represents is not representing a parameter.
     */
    parentMethodId?: string;
    visibility?: Visibility;
    /**
     * Indicates the type the field. This type is in an obfuscated form and any client will need to parse the type and convert it itself into human readable language, by requesting it in the mapping type it wants to display. This field will contain an empty string if the type of mappable that this versioned mappable represents is not a field or parameter.
     */
    type?: string;
    /**
     * The descriptor that describes (ha) this versioned mappable. As with the type this descriptor is a raw obfuscated data entry. If the client wants to display this to a human in readable form he will need to parse this descriptor himself and request the human readable form of the mapping in the mapping type he wishes to display. This field will contain an empty string when the type of mappable that this versioned mappable represents is not a method.
     */
    descriptor?: string;
    /**
     * The signature that describes this versioned mappable. Includes the generics of the parameter and returned type, if applicable. As with the descriptor this field contains raw obfuscated data. If the client wants to display this to a human in readable form he will need to parse this signature himself and request the human readable form of the mapping in the mapping type he wishes to display. This field will contain an empty string when the type of the mappable that this versioned mappable represents is not a method.
     */
    signature?: string;
    /**
     * This indicates the parameter number for a parameter. The numbers are JVM parameter indices, for a lack of a better word, and describe both the position, as well as the width of the parameter. If the method is not static then the parameter with 0 is implicitly the keyword this, and counting starts at 1. If the method is 0 then counting starts at 0. In general all parameters are 1 wide. However doubles and longs are 2. If this versioned mappable does not represent a parameter then this is null or some random value.
     */
    index?: number;
    /**
     * A list of all mapping types for which no changes can be made via proposals. Only changes can be made via directly committing a mapping.
     */
    lockedIn?: Array<string>;
    /**
     * A list of ids of versioned mappables that represent the super types of the versioned mappable if this represents a class. If this is not a class, then this field will be null. If this is a class and the field is empty then no super types are known.
     */
    readonly superTypes?: Array<string>;
    /**
     * A list of ids of versioned mappables that represent the sub types of the versioned mappables if this represents a class. If this is not a class, then this field will be null. If this is a class and the field is empty then no sub types are known.
     */
    readonly subTypes?: Array<string>;
    /**
     * A list of ids of versioned mappables that represent the methods overriden by this method. If this versioned mappable represents a method. If this is not a method, this field will be null. If this is a method and the field is empty then no overriden methods are known.
     */
    readonly overrides?: Array<string>;
    /**
     * A list of ids of versioned mappables that represent the methods that override this method. If this versioned mappable represents a method. If this is not a method, this field will be null. If this is a method and the field is empty then no methods that override this method could be found.
     */
    readonly overridenBy?: Array<string>;
    _static?: boolean;
    external?: boolean;
}

