import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import MainLayout from "./components/common/Layout";
import FunctionalCreate from "./pages/option-sets/createOptions";
/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Routes({ pages }) {
  const routes = useRoutes(pages);
  const routeComponents = routes.map(({ path, component: Component }) => (
    // path !== "/option-sets/" && 
    <Route key={path} path={path} element={<Component />}/>
  ));

  const NotFound = routes.find(({ path }) => path === "/notFound").component;

  return (
    <ReactRouterRoutes>
      <Route element={<MainLayout />}>
         {routeComponents}
      </Route>
      {/* <Route path="/option-sets/createoptions" element={<FunctionalCreate />} /> */}
      <Route path="/option-sets/createoptions/:id" element={<FunctionalCreate />} /> 
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "")
        .replace(/\.(t|j)sx?$/, "")
        .replace(/\/index$/i, "/")
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      return {
        path,
        component: pages[key].default,
      };
    })
    .filter((route) => route.component);

  return routes;
}
