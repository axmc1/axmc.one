import {Route, Router, type AroundNavHandler, Switch} from "wouter";
import Index from "./pages/Index.tsx";
import {flushSync} from "react-dom";
import Navbar from "./components/Navbar.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";

const aroundNav: AroundNavHandler = (navigate, to, options) => {
  if (!document.startViewTransition) {
    navigate(to, options);
    return;
  }

  document.startViewTransition(() => {
    flushSync(() => {
      navigate(to, options);
    });
  });
};

function App() {
  return (
    <Router aroundNav={aroundNav}>
      <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1 w-full flex justify-center xl:p-32 lg:p-16 p-8 overflow-y-auto">
          <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 sm:w-full">
            <Switch>
              <Route path="/" component={Index} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:id">
                {(params) => <BlogPost id={params.id} />}
              </Route>
              <Route>404: No such page!</Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App
