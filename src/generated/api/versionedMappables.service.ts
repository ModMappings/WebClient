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
import { PageVersionedMappable } from '../model/models';
import { VersionedMappable } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class VersionedMappablesService {

    protected basePath = 'https://api.modmappings.org';
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
        if (typeof value === "object") {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value: any, key?: string): HttpParams {
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
     * Looks up a versioned mappable using a given id.
     * @param id The id of the versioned mappable to look up.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVersionedMappableById(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<VersionedMappable>;
    public getVersionedMappableById(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<VersionedMappable>>;
    public getVersionedMappableById(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<VersionedMappable>>;
    public getVersionedMappableById(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getVersionedMappableById.');
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

        return this.httpClient.get<VersionedMappable>(`${this.configuration.basePath}/versioned_mappables/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets all known versioned mappables that match the given parameters.
     * @param gameVersionId The id of the game version. Null to ignore.
     * @param mappableType The type of the mappable to look up. Null to ignore.
     * @param classId The id of the class to find versioned mappables in. Null to ignore.
     * @param methodId The id of the method to find versioned mappables in. Null to ignore.
     * @param mappingId The id of the mapping to find the versioned mappables for. Null to ignore. If parameter is passed, either a single result is returned or none. Since each mapping can only target a single versioned mappable.
     * @param superTypeTargetId The id of the class to find the super types for. Null to ignore.
     * @param subTypeTargetId The id of the class to find the sub types for. Null to ignore.
     * @param page Zero-based page index (0..N)
     * @param size The size of the page to be returned
     * @param sort Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVersionedMappablesBySearchCriteria(gameVersionId?: string, mappableType?: MappableType, classId?: string, methodId?: string, mappingId?: string, superTypeTargetId?: string, subTypeTargetId?: string, page?: number, size?: number, sort?: Array<string>, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/event-stream' | 'application/json'}): Observable<PageVersionedMappable>;
    public getVersionedMappablesBySearchCriteria(gameVersionId?: string, mappableType?: MappableType, classId?: string, methodId?: string, mappingId?: string, superTypeTargetId?: string, subTypeTargetId?: string, page?: number, size?: number, sort?: Array<string>, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/event-stream' | 'application/json'}): Observable<HttpResponse<PageVersionedMappable>>;
    public getVersionedMappablesBySearchCriteria(gameVersionId?: string, mappableType?: MappableType, classId?: string, methodId?: string, mappingId?: string, superTypeTargetId?: string, subTypeTargetId?: string, page?: number, size?: number, sort?: Array<string>, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/event-stream' | 'application/json'}): Observable<HttpEvent<PageVersionedMappable>>;
    public getVersionedMappablesBySearchCriteria(gameVersionId?: string, mappableType?: MappableType, classId?: string, methodId?: string, mappingId?: string, superTypeTargetId?: string, subTypeTargetId?: string, page?: number, size?: number, sort?: Array<string>, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/event-stream' | 'application/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (gameVersionId !== undefined && gameVersionId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>gameVersionId, 'gameVersionId');
        }
        if (mappableType !== undefined && mappableType !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappableType, 'mappableType');
        }
        if (classId !== undefined && classId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>classId, 'classId');
        }
        if (methodId !== undefined && methodId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>methodId, 'methodId');
        }
        if (mappingId !== undefined && mappingId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>mappingId, 'mappingId');
        }
        if (superTypeTargetId !== undefined && superTypeTargetId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>superTypeTargetId, 'superTypeTargetId');
        }
        if (subTypeTargetId !== undefined && subTypeTargetId !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>subTypeTargetId, 'subTypeTargetId');
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
                'text/event-stream',
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

        return this.httpClient.get<PageVersionedMappable>(`${this.configuration.basePath}/versioned_mappables`,
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
     * Updates, but does not create, the versioned mappable from the data in the request body.
     * This converts the data in the request body into a full versioned mappable, then updates the versioned mappable with the given id, and stores the updated versioned mappable in the database. A user needs to be authorized to perform this request. A user needs to have the role \&#39;VERSIONED_MAPPABLES_UPDATE\&#39; to execute this action successfully.
     * @param id The id of the versioned mappable to update.
     * @param versionedMappable 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateVersionedMappable(id: string, versionedMappable?: VersionedMappable, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<VersionedMappable>;
    public updateVersionedMappable(id: string, versionedMappable?: VersionedMappable, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<VersionedMappable>>;
    public updateVersionedMappable(id: string, versionedMappable?: VersionedMappable, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<VersionedMappable>>;
    public updateVersionedMappable(id: string, versionedMappable?: VersionedMappable, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateVersionedMappable.');
        }

        let headers = this.defaultHeaders;

        // authentication (ModMappings Local development auth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // authentication (ModMappings Official auth) required
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


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.patch<VersionedMappable>(`${this.configuration.basePath}/versioned_mappables/${encodeURIComponent(String(id))}`,
            versionedMappable,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
