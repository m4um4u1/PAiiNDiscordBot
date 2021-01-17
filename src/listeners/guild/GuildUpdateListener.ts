import { Listener } from "discord-akairo";
import dbGuild from "../../models/guild.model";

export default class GuildCreateListener extends Listener {
    public constructor() {
        super('guildUpdate', {
            emitter: 'client',
            event: 'guildUpdate'
        });
    }

    public async exec(guild) {
        try {
            await dbGuild.findOneAndUpdate({guildId: guild.id},
                {
                guildName: guild.name
            });

            this.client.logger.info(`Ich wurde zu ${guild.guildName} eingeladen`)
        } catch (e) {
            this.client.logger.error(e);
        }
    }
}
