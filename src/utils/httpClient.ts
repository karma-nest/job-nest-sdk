/**
 * @fileoverview HTTP Client for making API requests.
 * @module HttpClient
 * @version 1.0.0
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * A generic HTTP client for API interactions.
 */
export default class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  /**
   * Initialize the HTTP client with a base URL and optional API key.
   * @param {string} baseURL - The base URL for the API.
   * @param {string} [apiKey] - Optional API key for authorization.
   */
  constructor(baseURL: string, apiKey?: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
  }

  /**
   * Send a GET request to the specified endpoint.
   * @returns {Promise<T>} - The response data.
   */
  public get = async <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await this.axiosInstance.get<T>(url, {
        ...config,
        params,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  /**
   * Send a POST request with optional data.
   * @returns {Promise<T>} - The response data.
   */
  public post = async <T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  /**
   * Send a PUT request with optional data.
   * @returns {Promise<T>} - The response data.
   */
  public put = async <T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  /**
   * Send a DELETE request to the specified endpoint.
   * @returns {Promise<T>} - The response data.
   */
  public delete = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  /**
   * Handle errors from HTTP requests.
   * @throws {Error} - Throws a detailed error message.
   */
  private handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `HTTP Error: ${error.message} | Response: ${
          error.response ? JSON.stringify(error.response.data) : "No response"
        }`
      );
    }
    throw new Error(`Unknown Error: ${String(error)}`);
  };
}
