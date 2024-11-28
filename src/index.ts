/**
 * @fileoverview
 * @module index
 * @version 1.0.0
 */
import HttpClient from './utils/httpClient';

export default class JobNestSdk {
  private readonly httpClient: HttpClient;

  constructor(baseURL: string, apiKey?: string) {
    this.httpClient = new HttpClient(baseURL, apiKey);
  }
}
