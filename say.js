const { SlashCommandBuilder } = require('discord.js');

const wordReplacements = { // lol
    hello: ['die', 'salutations', 'cry'],
    hi: ['die', 'salutations', 'cry'],
    world: ['volcano', 'rock', 'hell'],
    discord: ['snapchat', 'xvideos', 'myspace'],
    kill: ['eat', 'lick', 'shove'],
    yourself: ['your mom'],
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
};

const letterReplacements = { // lol X2
    b: ['d', 'p', 'β'],
    x: ['ks', '❌', 'x', 'ks', 'x'],
    as: ['ass'],
    oo: ['U', 'o', 'uu'],
    ra: ['re'],
    are: ['am'],
    you: ['i', 'me'],
    e: ['ee', 'egg', 'e'],
    h: ['ha', 'eich', 'hee', 'h'],
    o: ['oh', 'o'],
    a: ['a', 'Æ', 'AA', 'a', 'e', 'a', 'ay', 'a'],
    g: ['j', 'guh', 'j', 'g', 'g', 'g'],
    p: [' p ', 'pee'],
    v: ['w', "v"],
    i: ["İ", "i"],
    w: ['m', "www", "w", "w"],
    f: ['²|DÁ', 'fuck', 'ASFDFJDSKDNVK', 'PH', 'free', 'ff', "³ò>öãOv", "Àïl", "f", "f", "f", "f"],
    is: ['ÃwÆÂ'],
    ea: ['ae'],
    t: ['⍑', 't', 't', '☂', 't'],
    mr: ['mrbeast']
};

function getRandomReplacement(item, replacementsMap) {
    const replacements = replacementsMap[item.toLowerCase()];
    if (!replacements || replacements.length === 0) {
        return item; // Return the original item if no replacements are defined
    }
    return replacements[Math.floor(Math.random() * replacements.length)];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Reiterates the EXACT same thing you say totally!!!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Enter your text here')
                .setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');

        if (!text) {
            await interaction.reply({ content: 'ENTER SOMETHING!!!', ephemeral: true });
            return;
        }

        let replacedText = text.split(' ').map(word => getRandomReplacement(word, wordReplacements)).join(' ');

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


        try {
            await interaction.deferReply({ ephemeral: false }); 

            await interaction.editReply(finalText);
        } catch (error) {
            console.error('Failed to send message:', error);
            await interaction.followUp({ content: 'Failed to send message', ephemeral: true });
        }
    },
};
