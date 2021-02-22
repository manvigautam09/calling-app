import { createWebHistory, createRouter } from "vue-router";

import Home from "../Views/Home";
import Room from "../Views/Room";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/room/:roomName/:id", name: "Room", component: Room },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
