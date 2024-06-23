const { SlashCommandBuilder } = require('discord.js');

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
    and: ['shovel', 'garage', 'خضروات'],
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
    on: ['au', 'AM PRO 👊✊'],
    with: ['ou', 'cleaner', 'AM PRO 👊✊'],
    day: ['vup vup', 'مؤيد كبير 😂😂'],
    end: ['green', 'hat', 'water'],
    it: ['table', 'WOW', '🚱', 'iiiIIIIiiiiIIII']
};

const letterReplacements = { // lol X2
    b: ['d', 'p', 'β', 'bbbbbbb'],
    x: ['ks', '❌', 'x', 'ks', 'x'],
    as: ['ass', 'buttocks'],
    oo: ['U', 'o', 'uu', 'wÿ¤', '[][][][][][]'],
    ra: ['re', ' 𓀀 𓀁 𓀂 𓀃 𓀄'],
    e: ['ee', 'egg', 'EA', 'zÒ—^ÿ', 'ìd¯|', '¬øcl', '👈', '👇','👉', '🤓'],
    h: ['ha', 'eich', 'hee', 'h', 'Ê7gè÷Æ'],
    o: ['oh', '))', '', '[[', ,'😭','💯','🤘','0','00OOOÆÆ', '😊', '🔥'],
    a: ['', 'Æ', 'AA', 'a', '1110000OOOOO', 'e', 'a', 'ay', '', '😁','🤣','🥰', '🤡'],
    g: ['j', 'guh', 'j', 'g', 'g', 'g'],
    p: [' p ', 'pee', 'P', 'PLAYSATION 4', 'p', 'O9O', '🎅'],
    v: ['w', "v"],
    i: ["İ", "i", 'EEEEÜÜÜÜ'],
    w: ['m', "www", "w", "wWw"],
    f: ['²|DÁ', 'fuck', 'ASFDFJDSKDNVK', 'PH', 'free', 'ff', "³ò>öãOv", "Àïl", "f", "👲", "f", "🧏‍♀️"],
    is: ['ÃwÆÂ'],
    ea: ['ae', 'OE'],
    d: ['b', '🐱‍👤'],
    m: ['monday', 'money', 'þ&>|¨', 'ð'],
    t: ['⍑', '////', 't', '☂', 'ô>', 'teee'],
    mr: ['mrbeast'],
    c: ['ses', '', 'S', 'sex', 'k', 'ↄ'],
    1: ['E', '}', '|', '!', 'þ'],
    2: ['3', '5', '1', 'EIGHT'],
    5: ['task manager', '💀', '👃', '🥩'],
    6: ['sex', '(six)', 'RAGED.'],
    0: ['💯', '1', 'a lot', 'O'],
    n: ['n word', 'Ñ', 'KJFDLDGF'],
    l: ['1', 'L', 'I', '😜', '🙌', '💋'],
    s: ['$$$', 'SEX', 'Á', 'Microsoft store', '🍔', '🚜', 'Wii U'],
    ':': ['SMILEYS', '💥💢', 'OROR', 'IDATx^ìÝu|', '×6p‡š4mÊM', '»Ý}Ûm»Ýn»', '.'],
    '(': [')', 'H', '💮', '........'],
    ')': ['}', '(', '-=--=', 'KINGS OF HEARTDOM'],
    '[': ['808', ',,,', '⛎☦'],
    '}': ['_', '47', '6'],
    ']': ['TOYS', '[[[[', '🆑🅾', 'ÀPxú†À¤×ƒ5ý`–j÷'],
    '.': ['!!!!!', 'WHHHAAATTTT', '💫💨'],
    ',': ['E', 'playtime', 'ONION', '☢〽⚜⁉'],
    '!': ['FACTORIAL', '💤', '(●X◡X●)'],
    '\'': ['VVVvv', '😋'],
    r: ['KK((', 'الحرف ر', '字母 r😂', '💦'],
    '☹️': ['♍', 'frowningG', 'SMILE! You\'re on camera.', '059804865']
};


function getRandomReplacement(item, replacementsMap, level) {
    const replacements = replacementsMap[item.toLowerCase()];
    if (!replacements || replacements.length === 0) {
        return item; // Return the original item if no replacements are defined
    }

    let probability = level / 1000; 
    if (probability < 0.01) probability = 0.01; 

    if (Math.random() > probability) {
        return item;
    }
    const maxIndex = Math.min(replacements.length - 1, Math.floor(level / 10));
    return replacements[Math.floor(Math.random() * (maxIndex + 1))];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Reiterates the EXACT same thing you say totally!!!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Enter your text here')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Accuracy level (1-1000)')
                .setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const level = interaction.options.getInteger('level');

        if (!text) {
            await interaction.reply({ content: 'ENTER SOMETHING!!!', ephemeral: true });
            return;
        }

        if (level < 1 || level > 1000) {
            await interaction.reply({ content: 'Level must be between 1 and 1000.', ephemeral: true });
            return;
        }

        let replacedText = text.split(' ').map(word => getRandomReplacement(word, wordReplacements, level)).join(' ');

        let finalText = '';
        for (let i = 0; i < replacedText.length; i++) {
            const currentChar = replacedText[i];
            const replacement = getRandomReplacement(currentChar, letterReplacements, level);
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
