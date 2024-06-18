const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 's',
	data: new SlashCommandBuilder()
		.setName('beast')
		.setDescription('mrbreast give me money'),
	async execute(interaction) {
    // Replaces the ChannelID with channel chosen, putting this id gives Mr Beast's Channel
    const channelId = 'UCX6OQ3DkcsbYNE6H8uQQuVA';

    // A valid API Key is needed to gain access to Youtube's API
    const apiKey = 'AIzaSyA7Ig2QHKRelv1n8ZPI2eXV3p_Vb7iSccA';
    
    /* fetches the youtube channel itself first, grabs data of every video and stacks it into a list then chooses a random id (random video)
    then gets the template of a video url and inputs the chosen video id, then replies with the finished yt url*/
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
    const videos = data.items;
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideoUrl = `https://www.youtube.com/watch?v=${videos[randomIndex].id.videoId}`;
    interaction.reply(randomVideoUrl);
    })}
};

