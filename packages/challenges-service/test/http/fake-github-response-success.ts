import type { HttpAdapter } from '@/core/types/http-adapter';
import type { AxiosRequestConfig } from 'axios';

export class FakeHttp implements HttpAdapter {
  async request(config?: AxiosRequestConfig): Promise<any> {
    return {
      data: {
        id: 754906309,
        node_id: 'R_kgDOLP70xQ',
        name: 'node-core-course',
        full_name: 'mfatima5bc/node-core-course',
        private: false,
      },
      status: 200
    };
  }
}
