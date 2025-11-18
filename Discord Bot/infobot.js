const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');

const BOT_INFO = {
    name: "CoderMaster",
    version: "1.0.0",
    publicKey: "c754a88258af8d04269c334d31632c463f6c74cceb320f6c27c404a41dc5d4a1",
    author: "mola"
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let gameTimer = 0;
const MAX_HOURS = 20;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'Bot Online',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        bot: BOT_INFO
    });
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
    console.log(`✅ HTTP Server running on port ${PORT}`);
    console.log(`🌍 Accessible at http://localhost:${PORT}`);
});

const programmingMemes = [
    "It works on my machine! 🤷‍♂️",
    "Copy from Stack Overflow? It's called research! 📚",
    "Why do programmers prefer dark mode? Because light attracts bugs! 💡🐛",
    "There are only 10 types of people: those who understand binary and those who don't! 🔢",
    "99 little bugs in the code... take one down, patch it around... 127 little bugs in the code! 🐛",
    "Debugging: Being the detective in a crime movie where you are also the murderer! 🔍",
    "Programming is like writing a book... except if you miss a single comma the whole thing is trash! 📚",
    "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
    "Why do Java developers wear glasses? Because they can't C# 👓",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
    "My code doesn't always work, but when it does, I don't know why! 🤔",
    "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science! ⚗️",
    "I don't always test my code, but when I do, I do it in production! 🚀",
    "Roses are red, violets are blue, unexpected '{' on line 32! 🌹",
    "Git commit -m 'fixed bug' // creates 5 new bugs 🔄"
];

const hiResponses = [
    "Heyho, how ya doing? ☕",
    "Hi! You coding right now? 💻", 
    "Hey, how is life going? 😊",
    "Hi creature, what's life on earth doing? 🌍"
];

const coffeeResponses = [
    "Time for coffee break! ☕ Who's joining?",
    "Coffee time! Let's fuel our coding session! ⚡",
    "Perfect timing! I was craving some coffee too ☕",
    "Coffee break = best break! Grab your mug! 🍵"
];

const motivationQuotes = [
    "Code like you're changing the world! 🌟",
    "Every bug is just a feature in disguise! 🐛✨",
    "You're not stuck, you're just debugging life! 🔧",
    "Keep coding, keep growing! 💪"
];

const goodnightResponses = [
    "Sweet dreams! Don't forget to push your code! 🌙",
    "Sleep tight! May your dreams be bug-free! 😴",
    "Good night! Tomorrow's code awaits! ⭐",
    "Rest well, coding warrior! 🛡️💤"
];

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

client.once('ready', () => {
    console.log(`${BOT_INFO.name} v${BOT_INFO.version} is online!`);
    console.log(`Logged in as ${client.user.tag}`);
    
    updateGameStatus();
    setInterval(updateGameStatus, 3600000);
});

function updateGameStatus() {
    gameTimer++;
    if (gameTimer > MAX_HOURS) {
        gameTimer = 2;
    }
    
    client.user.setPresence({
        activities: [{
            name: 'Battlefield 6',
            type: ActivityType.Playing,
            details: `${gameTimer}h gespielt`,
            state: `Multiplayer Match`,
            applicationId: '1435244593301159978',
            assets: {
                large_image: 'battlefield',
                large_text: 'Battlefield 6'
            },
            timestamps: {
                start: Date.now() - (gameTimer * 3600000)
            }
        }],
        status: 'online'
    });
}

const processedMessages = new Set();

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const messageId = message.id;
    if (processedMessages.has(messageId)) return;
    processedMessages.add(messageId);
   
    setTimeout(() => {
        processedMessages.delete(messageId);
    }, 60000);
    
    if (message.content === '!hi') {
        message.reply(getRandomResponse(hiResponses));
    }
    
    if (message.content === '!github') {
        message.reply("Check that out my friend! `https://github.com/molaskidata`");
    }

    if (message.content === '!coffee') {
        message.reply(getRandomResponse(coffeeResponses));
    }
    
    if (message.content === '!meme') {
        message.reply(getRandomResponse(programmingMemes));
    }
    
    if (message.content === '!motivation') {
        message.reply(getRandomResponse(motivationQuotes))
    }
    
    if (messages.content === '!gg') {
        messages.reply("GG WP! 🎉")
    }


    if (message.content === '!goodnight') {
        message.reply(getRandomResponse(goodnightResponses));
    }
    
    if (message.content === '!help') {
        message.reply('**Available Commands:**\n`!hi` - Say hello\n`!coffee` - Time for coffee!\n`!meme` - Programming memes\n `!github` - Bots Owner Github and my Repo! \n`!motivation` - Get motivated\n`!goodnight` - Good night messages\n`!ping` - Test bot\n`!info` - Bot info');
    }
    
    if (message.content === '!ping') {
        message.reply('Pong! Bot is running 24/7');
    }
    
    if (message.content === '!info') {
        message.reply(`Bot: ${BOT_INFO.name} v${BOT_INFO.version}\nStatus: Online 24/7`);
    }
});

client.login(process.env.DISCORD_TOKEN);

setInterval(() => {
    console.log(`Bot alive: ${new Date().toISOString()}`);
    process.stdout.write('\x1b[0G');
}, 60000);

setInterval(() => {
    console.log(`Bot alive at: ${new Date().toISOString()}`);
}, 300000);

module.exports = { client, BOT_INFO, app };