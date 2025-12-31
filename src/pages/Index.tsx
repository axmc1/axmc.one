import {useEffect, useState} from "react"
import type {Game} from "../../netlify/functions/latestGame.mts"

export default function Index() {
  const [game, setGame] = useState({name: "Loading..."} as Game)
  useEffect(() => {
    fetch("/api/latestgame")
      .then(res => res.json())
      .then(res => setGame(res))
  }, [])

  return (
    <>
      <h1 className="text-5xl">Alex (<i>axmc</i>)</h1>
      <h2 className="text-2xl">Apprentice Software Developer</h2>
      <br/>
      <p className="text-xl">
        web developer at heart, doing a bit here and there for the past 7 years.
        i also contribute to my local community, currently working in addiction prevention.
        in my free time im also a floorball player and a gamer. The last game I played was <a
        href={game.appid ? `https://store.steampowered.com/app/${game.appid}` : ""}
        className={game.appid ? "underline" : ""}>{game.name}</a>.
      </p>
      <br/>
      <p className="text-xl">
        when coding, i use c# at work, and go or typescript for my personal projects.
        my main interests are web development, devops and cloud computing.
        i rarely write code publicly, but checkout my <a href="https://gitlab.com/axmc1"
                                                         className="underline">gitlab</a>, maybe you get
        lucky.
      </p>
      <br/>
      <div className="text-xl">
        you won't find me a lot on the internet, but if you want to reach me, you can find me here:
        <ul className="list-disc list-inside">
          <li>Matrix: <a href="https://matrix.to/#/@axmc:axmc.one" target="_blank"
                         className="underline">@axmc:axmc.one</a></li>
          <li>alex {"{at}"} axmc {"{dot}"} one</li>
        </ul>
      </div>
      <br/>
      <p className="text-xl">
        see ya around :)
      </p>
    </>
  )
}