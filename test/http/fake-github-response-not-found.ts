import type { HttpAdapter } from '@/core/types/http-adapter';
import type { AxiosRequestConfig } from 'axios';

export class FakeHttpNotFound implements HttpAdapter {
  async request(config?: AxiosRequestConfig): Promise<any> {
    return {
      data: {
        message: 'Not Found',
        documentation_url:
          'https://docs.github.com/rest/repos/repos#get-a-repository',
        status: '404',
      },
      status: '404',
    };
  }
}
