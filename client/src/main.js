import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LogInPage from './components/LogInPage.vue';
import SignInPage from './components/SignInPage.vue';
import dashboardPage from './components/RequestForm.vue';
import RequestList from './components/RequestList.vue'


// Set the base URL for your API
axios.defaults.baseURL = 'http://localhost:3000/api/face-detect';

const router = createRouter({
  history: createWebHistory(),
  routes: [
   {
    path: '/', component: LogInPage, props: true
  },
  { 
    path: '/signup/', component: SignInPage
  },
  { 
    path: '/dashboard/', component: dashboardPage
  },
  { 
    path: '/request-list/', component: RequestList
  }
  ]
});
  
createApp(App).use(router).mount('#app');