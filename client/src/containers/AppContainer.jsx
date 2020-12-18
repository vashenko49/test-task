import React, { lazy, Suspense, useMemo } from "react"
import { useSelector } from "react-redux"
import { Switch } from "react-router-dom"

import { PageLoader, Preloader } from "@components/Loader"
import PrivateRoute from "@components/PrivateRoute"

const routes = [
  {
    isPublic: true,
    exact: true,
    path: "/login",
    component: lazy(() => import("@pages/Auth/LogIn")),
  },
  {
    isPublic: true,
    exact: true,
    path: "/signup",
    component: lazy(() => import("@pages/Auth/SignUp")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/transaction",
    component: lazy(() => import("@pages/Transaction")),
  },
  {
    isPublic: false,
    exact: true,
    path: "/",
    component: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    isAdminRoute: true,
    exact: true,
    path: "/admin",
    component: lazy(() => import("@pages/Admin")),
  },
]

const AppContainer = () => {
  const loading = useSelector((state) => state.auth.loading)

  const routeComponents = useMemo(
    () =>
      routes.map(({ isPublic,isAdminRoute, ...route }) => (
        <PrivateRoute key={route.path} isPublic={isPublic} isAdminRoute={isAdminRoute} {...route} />
      )),
    []
  )

  return (
    <>
      <Preloader loaded={!loading} />
      <Suspense fallback={<PageLoader loaded={!loading} />}>
        <Switch>{routeComponents}</Switch>
      </Suspense>
    </>
  )
}

export default AppContainer
