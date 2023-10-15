const express = require("express");
const authRoutes = require("../modules/auth/auth.route");
const userRoutes = require("../modules/user/user.route");
const expertRoutes = require("../modules/expert/expert.route");

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/expert",
    route: expertRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

module.exports = routes;
