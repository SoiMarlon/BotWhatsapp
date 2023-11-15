const { Client, RemoteAuth, MessageMedia } = require('whatsapp-web.js');

const qrcode = require('qrcode-terminal');
const colors = require('colors');

const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
require('dotenv').config();
const logo = MessageMedia.fromFilePath(`${__dirname}/img/logo.jpg`);

const prefix = '/';
const owner = "wa.me/573214327301";

const menu = `
*-----MENU IMPROVISADO-----*

_Para usar el bot: /menu_
_Creador: ${owner}_

*-----REGISTRO-----*

_COMING SOON..._
`;

const keywords = [
    "Hola :D", "hola :3", "ola", "sexooo",
    "Hola Mundo", 'ChatBot te dice: "Hola!"'
]

const connection = mongoose.connection;

    connection.once('open', () => {
    console.log('Conectado con la base de datos!'.yellow)
    })
// Load the session data

mongoose.connect(process.env.MONGODB_URI).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000,
        }),
    });


    client.on("remote_session_saved", () => {
        console.log("Sesión guardada!".blue)
    })



    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    })
    
    client.on('ready', () => {
        console.log("Conectado con éxito!".green);
    })

    client.on('message', async msg => {
        if(msg.hasMedia){
            const media = await msg.downloadMedia();
            if(media.mimetype == "image/webp"){
                console.log("# " + "Sticker".green);
            }else if(media.mimetype == "image/jpeg"){
                console.log("# " + "Imágen".red);
            }else if(media.mimetype == "video/mp4"){
                console.log("# " + "Vídeo".blue);
            }
        }else{
        console.log("# " + msg.body.yellow);

        if (msg.body == "Hola"){
            msg.reply(
                keywords[Math.round(Math.random()*6)]
            );
        }else if (msg.body == "ola"){
            msg.reply(
                keywords[Math.round(Math.random()*6)]
                );
        }else if (msg.body == "hola"){
            msg.reply(
                keywords[Math.round(Math.random()*6)]
                );
        }else if (msg.body == "Buenos días"){
            msg.reply(
                "Buenos días :D!"
                );
        }else if (msg.body == "buenos dias"){
            msg.reply(
                "Buenos días :D!"
                );
        }else if (msg.body == "buenos días"){
            msg.reply(
                "Buenos días :D!"
                );
        }else if (msg.body == "Buenos dias"){
            msg.reply(
                "Buenos días :D!"
                );
        }else if (msg.body == "Buenas tardes"){
            msg.reply(
                "Buenas tardes :D!"
                );
        }else if (msg.body == "buenas tardes"){
            msg.reply(
                "Buenas tardes :D!"
                );
        }else if (msg.body == "Buenas Tardes"){
            msg.reply(
                "Buenas tardes :D!"
                );
        }else if (msg.body == "Buenas noches"){
            msg.reply(
                "Buenas noches :D!"
                );
        }else if (msg.body == "buenas noches"){
            msg.reply(
                "Buenas noches :D!"
                );
        }else if (msg.body == "Buenas Noches"){
            msg.reply(
                "Buenas noches :D!"
                );
        }
}});

    client.on('message', msg => {
        if (msg.body === prefix + "menu"){
            client.sendMessage(msg.from, logo, {
                caption: menu,
            });
        }
    })
 
    client.initialize()

});


