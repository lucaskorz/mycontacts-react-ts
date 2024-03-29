import APIError from "../../errors/APIError";
import delay from "../../utils/delay";

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string, options?: RequestInit) {
    const response = await this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal
    })

    return response
  }

  async post(path: string, options?: RequestInit): Promise<void> {
    await this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers
    })
  }

  async put(path: string, options?: RequestInit): Promise<void> {
    await this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers
    })
  }

  async delete(path: string, options?: RequestInit): Promise<void> {
    await this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers
    })
  }

  async makeRequest(path: string, options: RequestInit) {
    await delay(3000);

    const headers = new Headers()
    if (options.body) headers.append('Content-Type', 'application/json')

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value)
      })
    }

    const response: Response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
      signal: options.signal
    })

    const contentType = response.headers.get('Content-Type')

    let responseBody = null
    if (contentType?.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) return responseBody

    throw new APIError(response, responseBody);
  }
}

export default HttpClient
