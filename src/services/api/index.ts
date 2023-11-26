import {AuthApi} from './auth';
import {CounterApi} from './counter';
import {ContentApi} from './content';

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;
  auth: AuthApi;
  content: ContentApi;

  constructor() {
    this.counter = new CounterApi();
    this.auth = new AuthApi();
    this.content = new ContentApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
