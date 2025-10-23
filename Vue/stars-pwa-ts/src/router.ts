import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { 
  WelCome,
  About,
  Setting,
  StarMatch,
  StarMatchDetails,
  StarExplain,
  StarExplainDetails,
  StarForecast,
  StarForecastDetails
} from '@/Page'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/wel_come'
  }, {
    path: '/wel_come',
    component: WelCome
  }, {
    path: '/star_forecast',
    component: StarForecast
  }, {
    path: '/star_forecast/details/:stars/:dayType',
    component: StarForecastDetails
  }, {
    path: '/star_match',
    component: StarMatch,
  }, {
    path: '/star_match/details/:starsI/:starsII',
    component: StarMatchDetails
  }, {
    path: '/star_explain',
    component: StarExplain
  }, {
    path: '/star_explain/details/:stars',
    component: StarExplainDetails
  }, {
    path: '/setting',
    component: Setting
  }, {
    path: '/setting/about',
    component: About
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;