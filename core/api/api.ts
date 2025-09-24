import { APIResponse } from "playwright";
import { BrowserManagement } from "../browser/browser-management";
import { expect } from "playwright/test";
import Ajv from "ajv";

interface ApiOptions {
    params?: Record<string, string | number | boolean>; // Query parameters
    headers?: Record<string, string>; // Optional headers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>|string; // Request body for POST method
}

export class APIUtils{
    static async get(url: string, option?:ApiOptions): Promise<APIResponse>{
        // Build query string
        const query = new URLSearchParams(option?.params as Record<string, string>).toString();
        const fullUrl = query ? `${url}?${query}` : url;

        // Make the GET request
        return await BrowserManagement.getCurrentRequest().get(fullUrl, { headers:  option?.headers});
    }

    static async post(url: string, option?:ApiOptions): Promise<APIResponse>{
        // Build query string
        const query = new URLSearchParams(option?.params as Record<string, string>).toString();
        const fullUrl = query ? `${url}?${query}` : url;

        // Make the POST request
        return await BrowserManagement.getCurrentRequest().post(fullUrl, { headers:option?.headers, data: option?.data});
    }

    static async delete(url:string, option:ApiOptions): Promise<APIResponse>{
        const query = new URLSearchParams(option.params as Record<string, string>).toString();
        const fullUrl = query ? `${url}?${query}` : url;

        return await BrowserManagement.getCurrentRequest().delete(fullUrl, { headers:option.headers, data: option.data});
    }

    static async put(url: string, option?:ApiOptions): Promise<APIResponse>{
        // Build query string
        const query = new URLSearchParams(option?.params as Record<string, string>).toString();
        const fullUrl = query ? `${url}?${query}` : url;

        // Make the PUT request
        return await BrowserManagement.getCurrentRequest().put(fullUrl, { headers:option?.headers, data: option?.data});
    }

    static verifySecurityHeaders(headers: Record<string, string>)
    {
        expect("content-security-policy" in headers).toBeTruthy();
        expect("x-frame-options" in headers).toBeTruthy();
        expect("x-content-type-options" in headers).toBeTruthy();
        expect("strict-transport-security" in headers).toBeTruthy();
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static verifyJsonSchema(jsonSchema: any, jsonObject: Record<string, any>)
    {
        const ajv = new Ajv();
        const validate = ajv.compile(jsonSchema);
        expect(validate(jsonObject)).toBeTruthy();
    }
}