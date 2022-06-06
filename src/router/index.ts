import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Quote.vue"),
  },
  {
    path: "/booking",
    name: "Booking",
    component: () => import("@/views/Booking.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/Test.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
