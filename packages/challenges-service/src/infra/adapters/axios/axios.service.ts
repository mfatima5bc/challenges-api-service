import { HttpAdapter } from '@/core/types/http-adapter';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  constructor(private readonly axiosHttpAdapter: HttpService) {}

  request<T>(config?: AxiosRequestConfig): Promise<T | AxiosResponse> {
    return lastValueFrom(
      this.axiosHttpAdapter.request(config).pipe(
        map((response: AxiosResponse<T>) => response),
        catchError((error: AxiosError<T>) => this.handleError<T>(error)),
      ),
    );
  }

  private handleError<T>(error: AxiosError): Observable<T | never> {
    if (String(error.response.status).startsWith('4')) {
      return new Observable((subscriber) => {
        subscriber.next(error.response as T);
        subscriber.complete();
      });
    }
    throw new HttpException(
      error.response?.data || 'An error occurred during the HTTP request',
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
