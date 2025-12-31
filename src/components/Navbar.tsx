import {Link} from "wouter";

const links = [
  {
    name: "home",
    path: "/"
  },
  {
    name: "blog",
    path: "/blog"
  },
]

export default function Navbar() {
  return (
    <header className="bg-[#0a0a0a] text-white p-4">
      <nav>
        <div className="flex flex-row items-center justify-center gap-4 text-white/20">
        {
          links.map(l => (
            <Link to={l.path} className={(active) => (active ? "underline" : "hover:underline")}>{l.name}</Link>
          ))
        }
        </div>
      </nav>
    </header>
  )
}