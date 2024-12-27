import { HttpAdapter } from "@/core/types/http-adapter";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { catchError, lastValueFrom, map, Observable } from "rxjs";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  constructor(private readonly axiosHttpAdapter: HttpService) {}

  request<T>(config?: AxiosRequestConfig): Promise<T> {
    return lastValueFrom(this.axiosHttpAdapter.request(config).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError(this.handleError)
    ));
  }

  private handleError(error: AxiosError): Observable<never> {
    throw new HttpException(
      error.response?.data || 'An error occurred during the HTTP request',
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

}
