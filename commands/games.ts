import { CommandObject, CommandType } from "wokcommands";
import data from '../data.json'

function chooseRandomGame() {
    let games = data.games;
    let randomGame = games[Math.floor(Math.random() * games.length)];

    return randomGame;
}

export default {
  description: "Choose a game randomly from a selection",
  type: CommandType.BOTH,
  callback: () => {
    return {
      content: `The random game chosen is **${chooseRandomGame()}**!`,
    }
  },
} as CommandObject