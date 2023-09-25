import { CommandObject, CommandType } from "wokcommands";

export default {
  description: "Ping",
  type: CommandType.BOTH,
  callback: () => {
    return {
      content: "Coal Alarm",
    }
  },
} as CommandObject