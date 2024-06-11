import { createStore } from 'vuex';
import auth from './modules/auth/index';

const store = createStore({
    modules: {
      auth
    }
  });

console.log(createStore); 

export default store;