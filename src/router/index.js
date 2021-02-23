import { createWebHistory, createRouter } from "vue-router";

import Home from "../Views/Home";
import Room from "../Views/Room";
import PageNotFound from "../Views/PageNotFound";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/room/:roomName/:id", name: "Room", component: Room },
  { path: "/:pathMatch(.*)", component: PageNotFound },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
