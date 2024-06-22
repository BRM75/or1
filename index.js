const fs = require('node:fs'); 
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const wordReplacements = { // lol
    hello: ['die', 'salutations', 'cry'],
    hi: ['die', 'salutations', 'cry'],
    world: ['volcano', 'rock', 'hell'],
    discord: ['snapchat', 'xvideos', 'myspace'],
    out: ['in'],
    him: ['clock', 'john cena', 'ooger'],
    her: ['grandma', 'raisins', 'free palestine'],
    the: ['big baby', 'dancing baby', 'og', 'wa'],
    kill: ['eat', 'lick', 'shove'],
    and: ['shovel', 'garage'],
    yourself: ['your mom'],
    or: ['or', ']æõÀÃ='],
    loser: ['television', 'billionaire', 'programmer', 'dropshipper'],
    american: ['queer', 'black person', 'indian'],
    hate: ['love', 'appreciate'],
    alot: ['O really need to retake 3rd grade English'],
    fucking: ['pooping', 'shagging', 'eating'],
    retard: ['dude', 'person'],
    faggot: ['amazing person', 'dude'],
    kys: ['have a great day', 'enjoy life'],
    bitch: ['lady', 'puppy'],
    gay: ['happy', 'rad', 'excited'],
    dumb: ['smart', 'high iq', 'me'],
    stupid: ['your likes are now private', 'super'],
    angry: ['twitter'],
    mad: ['twitter'],
    hate: ['love', 'like','lust for'],
    are: ['am'],
    you: ['i', 'me', 'ogre'],
    on: ['au']
};

const letterReplacements = { // lol X2
    b: ['d', 'p', 'β'],
    x: ['ks', '❌', 'x', 'ks', 'x'],
    as: ['ass', 'buttocks'],
    oo: ['U', 'o', 'uu', 'wÿ¤', '[][][][][][]'],
    ra: ['re', ' 𓀀 𓀁 𓀂 𓀃 𓀄'],
    e: ['ee', 'egg', 'EA', 'zÒ—^ÿ', 'ìd¯|', '¬øcl', '👈', '👇','👉',],
    h: ['ha', 'eich', 'hee', 'h', 'Ê7gè÷Æ'],
    o: ['oh', '))', '', '[[', ,'😭','💯','🤘','0','00OOOÆÆ'],
    a: ['', 'Æ', 'AA', 'a', 'e', 'a', 'ay', '', '😁','🤣','🥰',],
    g: ['j', 'guh', 'j', 'g', 'g', 'g'],
    p: [' p ', 'pee', 'P', 'PLAYSATION 4', 'p', 'OOO'],
    v: ['w', "v"],
    i: ["İ", "i"],
    w: ['m', "www", "w", "wWw"],
    f: ['²|DÁ', 'fuck', 'ASFDFJDSKDNVK', 'PH', 'free', 'ff', "³ò>öãOv", "Àïl", "f", "f", "f", "f"],
    is: ['ÃwÆÂ'],
    ea: ['ae'],
    d: ['b'],
    m: ['monday', 'money', 'þ&>|¨', 'ð'],
    t: ['⍑', '////', 't', '☂', 'ô>', 'teee'],
    mr: ['mrbeast'],
    c: ['ses', '', 'S', 'sex', 'k', 'ↄ'],
    1: ['E', '}', '|', '!', 'þ'],
    2: ['3', '5', '1', 'EIGHT'],
    5: ['task manager', '💀', '👃'],
    6: ['sex', '(six)', 'RAGED.'],
    0: ['💯', '1', 'a lot', 'O']
};

function getRandomReplacement(item, replacementsMap) {
    const replacements = replacementsMap[item.toLowerCase()];
    if (!replacements || replacements.length === 0) {
        return item; // Return the original item if no replacements are defined :frowning2:
    }
    return replacements[Math.floor(Math.random() * replacements.length)];
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.cooldowns = new Collection();
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return;
	} else if(message.content.toLowerCase().includes('thanksgiving') || message.content.toLowerCase().includes('turkey') || message.content.toLowerCase().includes('turkish') || message.content.toLowerCase().includes('gobble')) {
        message.channel.send('WOW NOW ANT-TÜRKİNG!'); 
    }

    
    
    if (message.content.includes('%raid')) {
        const func = () => message.channel.send('Get raidied nintendos.');
        const messagecontent = message.content
            times = (messagecontent.match(/\d+/g) || []).map(n => parseInt(n));
            if (!(times <= 15 && times >= 1)) {times = 0, message.channel.send('You cannot input this amount or you did not input anything.')} else {times = times}
            if (times == 0)
            times = Math.floor(times)
            console.log(times)
        Array.from({length: times}, () => func());
    }

    if (message.content == '%randomnum') {
        const randomNum = Math.floor((Math.random() * 1000) + 1)
        message.channel.send(`${randomNum} `);
    } 

    if (message.content.startsWith('%say')) {
        const text = message.content.slice('%say'.length).trim(); // Extract text after '%say'

        if (!text) {
            message.channel.send('ENTER SOMETHING!!1');
            return;
        }

        // Word replacements XD
        let replacedText = text.split(' ').map(word => getRandomReplacement(word, wordReplacements)).join(' ');

        // Letter replacements XD
        let finalText = '';
        for (let i = 0; i < replacedText.length; i++) {
            const currentChar = replacedText[i];
            const replacement = getRandomReplacement(currentChar, letterReplacements);
            finalText += replacement;
        }

        // Function to randomly remove characters from a string to avoid 2k limit
        function trimToLimit(text, limit) {
            while (text.length > limit) {
                const randomIndex = Math.floor(Math.random() * text.length);
                text = text.slice(0, randomIndex) + text.slice(randomIndex + 1);
            }
            return text;
        }

        const characterLimit = 2000;
        if (finalText.length > characterLimit) {
            finalText = trimToLimit(finalText, characterLimit);
        }

        message.channel.send(finalText);
    }


    if (message.content == '%loop') {
        channelId = 919208608682639442
        const hourlymessage = "or1";
    setInterval(() => {
        message.channelId.send(hourlymessage);
    }, 600000);}
    
    if (message.content == '%joe') {
        // Replace 'CHANNEL_ID' with the actual YouTube channel ID
const channelId = 'UCX8YNAJLTBf2eTXC3B9R7kw';

// Replace 'API_KEY' with your YouTube Data API key
const apiKey = 'AIzaSyA7Ig2QHKRelv1n8ZPI2eXV3p_Vb7iSccA';

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const videos = data.items;
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideoUrl = `https://www.youtube.com/watch?v=${videos[randomIndex].id.videoId}`;
    message.reply(randomVideoUrl);
  })}

  if (message.content == '%mrbeast') {
    // Replace 'CHANNEL_ID' with the actual YouTube channel ID
const channelId = 'UCX6OQ3DkcsbYNE6H8uQQuVA';

// Replace 'API_KEY' with your YouTube Data API key
const apiKey = 'AIzaSyA7Ig2QHKRelv1n8ZPI2eXV3p_Vb7iSccA';

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&key=${apiKey}`)
.then(response => response.json())
.then(data => {
const videos = data.items;
const randomIndex = Math.floor(Math.random() * videos.length);
const randomVideoUrl = `https://www.youtube.com/watch?v=${videos[randomIndex].id.videoId}`;
message.reply(randomVideoUrl);
})}

if (message.content == "%help") {
    message.reply("https://sites.google.com/view/brm75socials/or1-help")
}
    

if (message.content =='%buy') {
    message.reply('What do you wanna buy?').then(() => {
    const randomMultiplier = Math.floor(Math.random() * 10)
    const cost = Math.floor(Math.random() * randomMultiplier * 100)
    message.channel.awaitMessages({time: 10000, max: 1, errors: ['time'] })
    .then(messages => {
        const shopoutcomes = [
            `You've bought that for `+ cost + ` dollars.`,
            "You thought the item was too expensive hahahaha",
            `You've bought that for `+ cost + ` dollars.`,
            "Lmaooo you thought the item was trash quality",
            `You've bought that for `+ cost + ` dollars.`,
            "You did an unbased move of shoplifting and got caught <:Karma:950470611338158121>",
            `You've bought that for `+ cost + ` dollars.`,
            "Someone called you for an emergency and you left",
            `You've bought that for `+ cost + ` dollars.`,
            "Sold out."
        ];
        const shopresponse = shopoutcomes[Math.floor(Math.random() * shopoutcomes.length)];
        message.reply(shopresponse);
    })
    .catch(() => {
        message.reply('You were kicked out for sleeping on the table.');
    });
    }
)};

    if (message.content.toLowerCase().includes(' ratio') || message.content.includes('this ratio') && !message.content.includes('failed')) {
        message.react('👎');
        message.reply('cringe');
    }

    if(message.content.includes(' s ')) {
        message.channel.send(`s`)
    }

    if(message.content == ('s')) {
        message.channel.send(`s`)
    }

    if(message.content == '%%') {
        message.reply(`a command!!!!`)
    }

    if(message.content == '%%%') {
        message.channel.send("﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n").then((sentMessage) => sentMessage.edit("** **")).then((sentMessage) => sentMessage.edit("﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n﷽\n")).then((sentMessage) => sentMessage.edit("** **"))
    }

    if(message.content == '%%%%') {
        message.channel.send("wtf lmao **for**got to make one **for four** percents because I have **four** brain cells **for** whatever reason please **for**give me")
    }


if(message.content == '%%%%%') {
    message.reply({ content: "there isn't another response after this one.,/,././.,/", ephemeral: true });
}

if(message.content == '%%%%%%') {
    message.reply({ content: "ok maybe there is!!!!", ephemeral: true });
}


if(message.content == '%%%%%%%') {
    message.reply({ content: "**NO MORE!!!!**", ephemeral: true });
}

if(message.content == '%%%%%%%%') {
    message.channel.send("`undefined`");
}

if(message.content == '%%%%%%%%%') {
    message.channel.send("https://cdn.discordapp.com/attachments/965372333596491806/981130610070392882/scot.mp4");
}


    if(message.content == '%username&password') {
        message.channel.send(`MarioIQDarwin75, SOMEONEORNOONE`)
    }

    if(message.content == '%encodeid') {
        const encodeuser = message.mentions.users.first() || message.author.id;
        let str = (encodeuser);
        let encodedString = btoa(str);
        message.channel.send(encodedString)
    }
   
    
    if(message.content == '%getitoffmyscreen') {
        message.channel.send(`||\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n||`)
    }

    if(message.content == 'brim' || message.content == 'BRIM' || message.content == 'brimed.' || message.content == 'BRIMED.') {
        message.channel.send(`BRIM LORE`)
    }

    if(message.content.toLowerCase().includes('job')) {
        message.reply(`ironic`)
    }

    if(message.content.toLowerCase().includes('get a job')) {
        message.reply(`you get one`)
    }

    if(message.content.toLowerCase().includes('get a job asap')) {
        message.reply(`cringe`)
    }

    if(message.content.toLowerCase().includes('seek help')) {
        message.reply(`you seek help instead`)
    }

    if(message.content.toLowerCase().includes('seek employment')) {
        message.reply(`just shut down`)
    }

    if(message.content.includes('GFM') || message.content.includes('gfm') || message.content.toLowerCase().includes('faries') || message.content.includes('gfmed.') || message.content.includes('GFMED.') || message.content.includes('faries') || message.content.includes('FARIES') || message.content.includes('<@513536179380027393>')){
        message.channel.send(`gfm sound`)
    }

    if(message.content.includes('kill yourself') || message.content.includes('kys') || message.content.includes('end yourself') || message.content.includes('kms') || message.content.includes('kill myself') || message.content.includes('end yourself') || message.content.includes('khs') || message.content.includes('hang yourself') || message.content.includes('end your life') || message.content.includes('ing your life') || message.content.includes('ing my life') || message.content.includes('kill themsel') || message.content.includes('kill himself') || message.content.includes('kill herself')|| message.content.includes('commit suicide')){
        message.channel.send(`https://blog.opencounseling.com/suicide-hotlines/`)
    }


    if(message.content == 'muted role so bad i was able to use webhook to chat') {
        console.log('LLLLLLLLLLLLLLLLLLLLLLLLL')
        message.channel.send(`What's this?\nDiscohook is a free tool that sends messages with embeds to your Discord server. To do that it uses webhooks, a Discord feature that lets any application send messages to a channel.\nTo send messages, you need a webhook URL, you can get one via the "Integrations" tab in your server's settings.\nNote that Discohook cannot respond to user interactions, it only sends messages when you tell it to.\nAs such creating an automatic feed or custom commands is not possible with Discohook.\nDiscord bot\nDiscohook has a complementary bot, while it's not strictly required to send messages it may be helpful to have it.\nBelow is a small but incomplete overview of what the bot can do for you.\nMentioning users, roles, channels, and using emojis\nThese things have manual ways, however they're easy to mess up for someone that doesn't know what they're doing.\nIf you don't understand the above link, using Discohook's bot for this is recommended.\nThe relevant commands in the bot are user, role, channel, and emoji. Each of those will return formatting which you can copy into the editor to get the appropriate output.\nTo use Discord's default emojis, use its short name wrapped in colons. As an example, "👀" will make the eyes emoji.\nCreating reaction roles\nYou can create reaction roles with the bot using the reactionrole command, the set-up process is very simple: add a reaction to any existing message in your server, and name the role.\nNote that while other bots may allow you to configure reaction roles, Discohook's are the only ones we can give support for.\nRecover Discohook messages from your server\nThe bot is capable of turning most message links sent inside your server into Discohook links. Use the restore command with a message link to move that message from Discord into Discohook.`)
    }

    if(message.content == '%lgm') {
        const littleresponses = require('./liggy.json')
        const littlelist = littleresponses[Math.floor(Math.random() * littleresponses.length)];
        message.channel.send(littlelist);
    }

    if(message.content == '%fg64') {
        const fireglitch = require('./fg64.json')
        const fireglitchy64 = fireglitch[Math.floor(Math.random() * fireglitch.length)];
        message.channel.send(fireglitchy64);
    }

    if(message.content == '%mm7829') {
        const grammer = require('./mmed.json')
        const mm = grammer[Math.floor(Math.random() * grammer.length)];
        message.channel.send(mm);
    }

});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	const { cooldowns } = interaction.client;

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 0.5;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);