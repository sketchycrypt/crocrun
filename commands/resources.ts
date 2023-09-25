import { CommandObject, CommandType, CommandUsage } from "wokcommands";
import { EmbedBuilder, CommandInteraction } from "discord.js";
import osu from "node-os-utils";
import data from "../data.json";

var mem = osu.mem;
var cpu = osu.cpu;

async function resourceUsage() {
  var memoryInfo = await mem.info();
  var cpuInfo = await cpu.usage();

  var memoryUsage = memoryInfo.freeMemMb + "MB";
  var cpuUsage = cpuInfo + "%";

  return [memoryUsage, cpuUsage];
}

export default {
  description: "Displays used resources to run crocrun",
  type: CommandType.SLASH,
  callback: async ({ interaction }: CommandUsage) => {
    const [memoryUsage, cpuUsage] = await resourceUsage();
    var addEmbed = new EmbedBuilder()
      .setTitle("neofetch")
      .setThumbnail(data.gifs.croccy)
      .addFields(
        { name: "OS:", value: `Arch_Linux` },
        { name: "Host:", value: `Latitude 7280` },
        { name: "Kernel:", value: `6.4.12-arch1-1` },
        { name: "CPU:", value: `Intel i5-6500U (4)` },
        { name: "CPU Usage:", value: `${cpuUsage}` },
        { name: "MEM Usage:", value: `${memoryUsage}` }
      );
    return { embeds: [addEmbed] };
  },
} as CommandObject;
