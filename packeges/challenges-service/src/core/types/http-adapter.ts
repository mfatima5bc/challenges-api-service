import type { AxiosRequestConfig } from "axios";

export abstract class HttpAdapter {
  abstract request(config?: AxiosRequestConfig): Promise<any>; // FIXME
}
