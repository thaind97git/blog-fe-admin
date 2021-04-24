import AxiosRequest from './axios-base';

class HttpRequest {
  constructor() {
    this.baseRequest = AxiosRequest;
  }

  async get(url, config) {
    return this.baseRequest.get(url, config);
  }

  async post(url, data, config) {
    return this.baseRequest.post(url, data, config);
  }

  async put(url, data, config) {
    return this.baseRequest.put(url, data, config);
  }

  async patch(url, data, config) {
    return this.baseRequest.patch(url, data, config);
  }
}

export default new HttpRequest();
