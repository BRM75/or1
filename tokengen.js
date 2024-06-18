const { SlashCommandBuilder } = require('discord.js');
const crypto = require('crypto')
module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('generatetoken')
		.setDescription('generate whole ass token'),
	async execute(interaction) {
        // Function to generate a fake Discord token
function generateFakeDiscordToken() {
    // Generate a random user ID
    const userID = Math.floor(Math.random() * 1120355826712985622).toString(36);
    const EncodeduserID = btoa(userID).replace(/=/g, '');

    // Generate a random timestamp (in seconds)
    const timestamp = Math.floor(Date.now() / 1000).toString(36);
    const base64Timestamp = btoa(timestamp).replace(/=/g, '');

    // Generate a random HMAC (in base64)
    const hmac = btoa(Array.from(crypto.getRandomValues(new Uint8Array(18)))
        .map(byte => String.fromCharCode(byte)).join('')).replace(/=/g, '');

    // Combine the parts to form a token
    const token = `${EncodeduserID}.${base64Timestamp}.${hmac}`;

    return token;
}

// Generate and log the fake token
const fakeToken = generateFakeDiscordToken();
await interaction.reply(fakeToken)

	},
};
