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

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`
    );
  }

  async post<T>(path: string, body: T) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    const response: Response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })
  }
}

export default HttpClient
