/*Un webhook es casi lo mismo que el post, si yo quiero hacer un post
con javascript debo usar express*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
/*Estas líneas son para poder usar express*/
const bot = require('./2_usandoBots_Libreria_Raul');
const eseMiFacebookService = require('./3_config');
/*Este se debe llamar igual a uno que va a estar abajo*/
/*Estas líneas son para usar las librerías que eran de los de devf y para acceder
a mi archivo donde va a estar mi bot*/
const generic =  [
    {'title': 'La construcción',
    'image_url':'https://urbania.pe/blog/wp-content/uploads/2015/02/edificio-lum1.jpg',
    'subtitle':'Este es el subtitulo :D',
    'buttons':[
     {'type':'postback',
       'title':'Cotizar',
       'payload':'COTIZAR_CONSTRUCCION_POSTBACK'}
   ]},
   {'title': 'Los contenidos',
   'image_url':'http://s3.amazonaws.com/digitaltrends-uploads-prod/2013/08/home-theater-under-3000-k.jpg',
   'subtitle':' ',
   'buttons':[
    {'type':'postback',
      'title':'Cotizar',
      'payload':'COTIZAR_CONTENIDOS_POSTBACK'}
  ]},
  {'title': 'Construcción y contenidos',
  'image_url':'https://www.deinmuebles.com.mx/wp-content/uploads/2016/11/Diseno-de-sala-y-cocina-de-mini-departamento.jpg',
  'subtitle':' ',
  'buttons':[
   {"type":"web_url",
      "title":"Latest News",
      "url":"https://www.messenger.com/",
      /*Aquí podemos poner la ruta a donde yo quiera enviar mi mensaje*/
      "webview_height_ratio":"tall"}
      /*El full que estaba en vez de tall originalmente abre toda la pantalla
      */
 ]}
];
/*Esta es una constante que se llama generic y me la pasaron por slack*/

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/*Estas líneas son para poder usar express*/

app.get('/',(req,res)=>{
    res.send('Bot de cinta roja')
})

/*Este método get se va a ocupar para cuando valida nuestro verifyToken y nuestro Token*/

// app.get('/eseWebhook', (req,res)=>{
//     console.log(req.query);
//     res.send('Hola webhook');
// })
/*Esto era para mostrar que me puede mostrar diferentes cosas el puerto 3000 que estoy usando
cuando le pongo una url distinta*/

app.get('/eseWebhook',(req,res) =>{
	console.log(req.query);
	if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === eseMiFacebookService.verifyToken) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  } 
})
/*Esto sirve para hacer que facebook valide el Webhook y me muestre el resultado en consola*/

// app.post(ruta a donde voy a mandar el post que debe ser la misma que el pasado, callback)
app.post('/eseWebhook', (req,res)=>{
    console.log(req.body.entry[0].messaging[0].sender.id)
    /*Esto sirve para saber quién me mandó el mensaje*/
    console.log(req.body.entry[0].messaging[0].message[0].text)
    /*Esto sirve para imprimir el mensaje que le llegó al bot*/
    /*Todo este camino de mi array se puede ver en la consola cuando vaya imprimiendo 1ero
    re.body ya visto a donde quiero llegar veo que es a entry y la 1era posicion, luego en
    esa posicion se encuentra messaging a donde me meto y asi hasta llegar a text que contiene
    mi mensaje*/
    let senderID = req.body.entry[0].messaging[0].sender.id;
    /*Esta variable guarda una parte del json que me regresa el req*/
    /*Es bueno usar variables let ya que así esta variable no podrá usarse fuera de aquí, esto
    evita que puedan pasar hackeos*/
    const respliceBot = new bot(eseMiFacebookService, accessToken);
    /*Aquí uso una clase bot y le doy como parámetros mi variable de arriba llamada 
    eseMiFacebookService y accesToken que se encuentra en config.js*/
    respliceBot.sendTextMessage(senderID, 'Hola soy el super bot Muajajaja!');
    /*Este es un método normal*/
    respliceBot.getUserProfile(senderID).then(response =>console.log(response));
    /*Este es un método en forma de promesa*/
    respliceBot.sendGenericTemplate(senderID, generic);
    /*Esto sirve para usar la constante generic de arriba que me pasaron*/

    res.sendStatus(200);
    /*Esto puede servir para enviarle un status al ngrok para limpiarlo*/
});
/*Aquí estamos imprimiendo lo que haya en el body del request de mi callback*/

app.listen(3000, ()=>{
    console.log('El bot está vivo en el puerto 3000');
})