import type { Config, Context } from "@netlify/functions";

export default async (_: Request, __: Context) => {
    const apiKey = Netlify.env.get("STEAM_API_KEY");
    const steamId = 76561198344247736n;
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
    const response = await fetch(url);
    const data = await response.json();
    const latestGame = data.response.games
        .map((game: Game) => {
            if (game.playtime_forever === 0) return null;
            return game;
        })
        .filter(Boolean)
        .sort((a: Game, b: Game) => b.rtime_last_played - a.rtime_last_played)[0];

    return new Response(JSON.stringify(latestGame));
}

export const config: Config = {
    path: "/api/latestgame"
}

export type Game = {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    rtime_last_played: number;
    content_descriptorids: number[];
    playtime_disconnected: number;
}
