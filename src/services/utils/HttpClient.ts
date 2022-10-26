import APIError from "../../errors/APIError";
import delay from "../../utils/delay";

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string) {
    await delay(500);
    const response = await fetch(`${this.baseURL}${path}`);

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType!.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) return body

    throw new APIError(response, body);
  }

  async post<T>(path: string, body: T) {
    await delay(500);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    const response: Response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })

    const contentType = response.headers.get('Content-Type')

    let responseBody = null
    if (contentType!.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) return responseBody

    throw new APIError(response, responseBody);
  }
}

export default HttpClient
