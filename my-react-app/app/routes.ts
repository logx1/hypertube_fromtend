import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("components", "./routes/infos/infos.tsx"),
  route("profile", "./routes/profile/Profile.tsx"),
] satisfies RouteConfig;
