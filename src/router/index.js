import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import Users from '../components/user/Users'
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: Home,
    redirect: '/welcome',
    children: [{ path: "/welcome", component: Welcome },{path:'/users',component:Users}],
  },
];

const router = new VueRouter({
  routes,
});

//导航守卫
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
  if (to.path === "/login") return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem("token");
  //没有token,强制跳转登录页
  if (!tokenStr) return next("/login");
  next();
});
export default router;
