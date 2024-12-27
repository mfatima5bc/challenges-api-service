import type { HttpAdapter } from '@/core/types/http-adapter';
import type { AxiosRequestConfig } from 'axios';

export class FakeHttp implements HttpAdapter {
  request(config?: AxiosRequestConfig): Promise<any> {
    return {
      id: 754906309,
      node_id: 'R_kgDOLP70xQ',
      name: 'notifications-service',
      full_name: 'mfatima5bc/notifications-service',
      private: false,
    };
  }
}
