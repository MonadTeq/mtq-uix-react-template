export type ApiError = {
  status: number
  message: string
}

export class HttpError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init)

  if (!response.ok) {
    throw new HttpError(response.status, `Request failed: ${response.statusText}`)
  }

  return (await response.json()) as T
}
