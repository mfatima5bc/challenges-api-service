import type { HttpAdapter } from '@/core/types/http-adapter';
import { HttpException } from '@nestjs/common';
import type { AxiosRequestConfig } from 'axios';

export class FakeHttpError implements HttpAdapter {
  request(config?: AxiosRequestConfig): Promise<any> {
    throw new HttpException('An error occurred during the HTTP request', 404);
  }
}
