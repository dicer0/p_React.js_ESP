const Bootbot = require('bootbot');
/*Con esto llamo la bilbioteca require de npm*/
const bot = new Bootbot({
    // accessToken: 'FB_ACCESS_TOKEN',
    accessToken: 'EAAFLuhWH1HcBADtg5CeWVsO60W85sPBHNMGXMHZCIKQxXO62ZCEY9pZA3qXxSOXoZB41LZCZBVh8Defn0R4uo9jBs8wNqMGrN4SO6p3pWfeuKehzJoMTn46r9OJhvlu18dTsFt3BYUZC1eryZCINSZCqKrzguZCdAJKTZCgDWnZCrYq8sFJRvbC6K2bH',
    /*Este es el token que me pasa facebook cuando me meto a su api*/
    // verifyToken: 'FB_VERIFY_TOKEN',
    verifyToken: 'soy don vergas',
    /*Este es el token que creo yo para darle a facebook*/
    // appSecret: 'FB_APP_SECRET'
    appSecret: 'c59089ce5ce5bbe34f41dfe68b8efd9c'
    /*Este codigo lo saco de facebook donde dice configurar después de que me pidió
    mi contraseña de facebook*/
});
/*A de los parámetros del objeto Bootbot me llegará un JSON */

// bot.on('mensajito', (payload, chat)=>{
//     console.log(payload);
//     /*el payload es todo lo que trae el usuario*/
//     console.log('-------------------------------');
//     console.log(chat);
//     /*El chat es lo que voy a contestar al usuario*/
//     //chat.say('Hola soy tu primer bot');
//     //Este fue mi 1er mensaje
//     chat.say(`El mensaje que me mandó el usuario fue: ${payload.mensajito.text}`)
//     /*Con payload me meto al JSON de lo que me mandó el usuario, con mensajito
//     me voy a meter a otro JSON contenido que tiene varios datos y al final me 
//     meto al mensaje tal cuál que me mando el usuario*/
// });

bot.hear(['Hola', 'Oli', 'Hi', 'Que onda', 'Holi'],(payload, chat)=>{
    /*Este sólo va a escuchar éstas cadenas de texto en específico y va a dar
    éstas respuestas en específico*/
    chat.say('Hola tu saludo fue correcto pequeño mortal');
});

bot.hear(['Chido bay', 'Hasta nunca', 'Bay'],(payload, chat)=>{
    chat.say('Tu despedida fue correcta pequeño mortal');
});

bot.hear('Comida', 'Hambre',(payload, chat)=>{
    chat.say({
        text: 'Qué vas a tragar hoy?????? ',
        quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
        /*Aquí no deben pasar de 10 caracteres (letras ) o me dará error */
    });
});

bot.hear(['Aiuuda'],(payload,chat)=>{
    chat.say({text: 'Ahora en qué la cagaste?',
    buttons: [{type: 'postback', title: 'En todo', payload: 'HELP_SETTINGS'},
              {type: 'postback', title: 'En nada', payload: 'HELP_FAQ'},
              {type: 'postback', title: 'Sabe :,(', payload: 'HELP_HUMAN'}
             ]
    });
});


bot.hear(['Yo amo al señor jugoso'],(payload, chat)=>{
    chat.say({ text: 'Yo tambien te amo Anita hermosa :*',
                buttons: [
                    {type: 'postback', title: 'Esta cursilería ', payload:'Boom'},
                    {type: 'postback', title: 'digital se destruirá', payload:'Super Boom'},
                    {type: 'postback', title: 'en...3,2,1...BOOM', payload:'Arhci Mega Recontra Boom'}
                ]
    });
});

bot.start();
/*Con esto se inicializa el bot que configuraremos en la pagina de developers de facebook*/

/*Cuando haya un error no hay que mandar otro mensaje ya que si hay algún status diferente 
del 200 facebook se espera a que se corriga el error cierto tiempo pero si vuelvo a mandarle
un mensaje y todavia no responde se va a esperar el doble de tiempo para que se corriga el 
error, esto pasará cada vez que mande mensaje así que hay que esperar sin mandar mensajes 
y sin entrar en pánico para que pueda correr mi bot*/