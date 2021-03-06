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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { MappableType } from '../model/models';
import { PageDetailedMapping } from '../model/models';
import { PageMapping } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface GetDetailedMappingsBySearchCriteria1RequestParams {
    /** Indicates if only latest mappings for a given versioned mappable should be taken into account. Defaults to true if not supplied. */
    latestOnly?: boolean;
    /** The id of the versioned mappable to filter on. */
    versionedMappableId?: string;
    /** The id of the release to filter on. */
    releaseId?: string;
    /** The mappable type to filter on. */
    mappableType?: MappableType;
    /** The regular expression to match the input of the mapping against. */
    inputRegex?: string;
    /** The regular expression to match the output of the mapping against. */
    outputRegex?: string;
    /** The id of the mapping type to filter on. */
    mappingTypeId?: string;
    /** The id of the game version to filter on. */
    gameVersionId?: string;
    /** The id of the user who created a mapping to filter on. */
    createdBy?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: Array<string>;
}

export interface GetMappingsBySearchCriteria1RequestParams {
    /** Indicates if only latest mappings for a given versioned mappable should be taken into account. Defaults to true if not supplied. */
    latestOnly?: boolean;
    /** The id of the versioned mappable to filter on. */
    versionedMappableId?: string;
    /** The id of the release to filter on. */
    releaseId?: string;
    /** The mappable type to filter on. */
    mappableType?: MappableType;
    /** The regular expression to match the input of the mapping against. */
    inputRegex?: string;
    /** The regular expression to match the output of the mapping against. */
    outputRegex?: string;
    /** The id of the mapping type to filter on. */
    mappingTypeId?: string;
    /** The id of the game version to filter on. */
    gameVersionId?: string;
    /** The id of the user who created a mapping to filter on. */
    createdBy?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: Array<string>;
}


@Injectable({
  providedIn: 'root'
})
export class SystemService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Gets all known mappings, and their metadata, and finds the ones that match the given parameters.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDetailedMappingsBySearchCriteria1(requestParameters: GetDetailedMappingsBySearchCriteria1RequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<PageDetailedMapping>;
    public getDetailedMappingsBySearchCriteria1(requestParameters: GetDetailedMappingsBySearchCriteria1RequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<PageDetailedMapping>>;
    public getDetailedMappingsBySearchCriteria1(requestParameters: GetDetailedMappingsBySearchCriteria1RequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<PageDetailedMapping>>;
    public getDetailedMappingsBySearchCriteria1(requestParameters: GetDetailedMappingsBySearchCriteria1RequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const latestOnly = requestParameters.latestOnly;
        const versionedMappableId = requestParameters.versionedMappableId;
        const releaseId = requestParameters.releaseId;
        const mappableType = requestParameters.mappableType;
        const inputRegex = requestParameters.inputRegex;
        const outputRegex = requestParameters.outputRegex;
        const mappingTypeId = requestParameters.mappingTypeId;
        const gameVersionId = requestParameters.gameVersionId;
        const createdBy = requestParameters.createdBy;
        const page = requestParameters.page;
        const size = requestParameters.size;
        const sort = requestParameters.sort;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (latestOnly !== undefined && latestOnly !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>latestOnly, 'latestOnly');
        }
        if (versionedMappableId !== undefined && versionedMappableId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>versionedMappableId, 'versionedMappableId');
        }
        if (releaseId !== undefined && releaseId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>releaseId, 'releaseId');
        }
        if (mappableType !== undefined && mappableType !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappableType, 'mappableType');
        }
        if (inputRegex !== undefined && inputRegex !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>inputRegex, 'inputRegex');
        }
        if (outputRegex !== undefined && outputRegex !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>outputRegex, 'outputRegex');
        }
        if (mappingTypeId !== undefined && mappingTypeId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappingTypeId, 'mappingTypeId');
        }
        if (gameVersionId !== undefined && gameVersionId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>gameVersionId, 'gameVersionId');
        }
        if (createdBy !== undefined && createdBy !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>createdBy, 'createdBy');
        }
        if (page !== undefined && page !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>page, 'page');
        }
        if (size !== undefined && size !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>size, 'size');
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = this.addToHttpParams(queryParameters,
                  <any>element, 'sort');
            })
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<PageDetailedMapping>(`${this.configuration.basePath}/system/mappings/detailed`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all known mappings and finds the ones that match the given parameters.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMappingsBySearchCriteria1(requestParameters: GetMappingsBySearchCriteria1RequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<PageMapping>;
    public getMappingsBySearchCriteria1(requestParameters: GetMappingsBySearchCriteria1RequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<PageMapping>>;
    public getMappingsBySearchCriteria1(requestParameters: GetMappingsBySearchCriteria1RequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<PageMapping>>;
    public getMappingsBySearchCriteria1(requestParameters: GetMappingsBySearchCriteria1RequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const latestOnly = requestParameters.latestOnly;
        const versionedMappableId = requestParameters.versionedMappableId;
        const releaseId = requestParameters.releaseId;
        const mappableType = requestParameters.mappableType;
        const inputRegex = requestParameters.inputRegex;
        const outputRegex = requestParameters.outputRegex;
        const mappingTypeId = requestParameters.mappingTypeId;
        const gameVersionId = requestParameters.gameVersionId;
        const createdBy = requestParameters.createdBy;
        const page = requestParameters.page;
        const size = requestParameters.size;
        const sort = requestParameters.sort;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (latestOnly !== undefined && latestOnly !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>latestOnly, 'latestOnly');
        }
        if (versionedMappableId !== undefined && versionedMappableId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>versionedMappableId, 'versionedMappableId');
        }
        if (releaseId !== undefined && releaseId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>releaseId, 'releaseId');
        }
        if (mappableType !== undefined && mappableType !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappableType, 'mappableType');
        }
        if (inputRegex !== undefined && inputRegex !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>inputRegex, 'inputRegex');
        }
        if (outputRegex !== undefined && outputRegex !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>outputRegex, 'outputRegex');
        }
        if (mappingTypeId !== undefined && mappingTypeId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappingTypeId, 'mappingTypeId');
        }
        if (gameVersionId !== undefined && gameVersionId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>gameVersionId, 'gameVersionId');
        }
        if (createdBy !== undefined && createdBy !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>createdBy, 'createdBy');
        }
        if (page !== undefined && page !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>page, 'page');
        }
        if (size !== undefined && size !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>size, 'size');
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = this.addToHttpParams(queryParameters,
                  <any>element, 'sort');
            })
        }

        let headers = this.defaultHeaders;

        // authentication (ModMappings auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<PageMapping>(`${this.configuration.basePath}/system/mappings`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
