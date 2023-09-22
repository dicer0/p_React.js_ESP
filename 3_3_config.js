const facebook_service = { 
    url: 'https://graph.facebook.com/v2.2/me/messages',
    graph: 'https://graph.facebook.com/v2.2/me/messenger_profile',
    verifyToken: 'Que_pedotl',
    /*Este es el que le doy yo, es más recomendable que no tenga espacios*/
    accessToken: 'EAAFLuhWH1HcBAE9I68vf24yeNhSwMAVOPFsZCU17nXb5gYJ5HE2vILYK6O2tbvThacD97ccYLlfZAUTPk1FaZBUX2VMuDvjhMwtpmNsQyJNPsZA9vXfWOa6J8CCdniZCUbrCYDESyS9tLeDxk6Q7NJHu92gomdNDDCEmhqvS8fM17xTkaGOWY'
    /*Este me lo daba en messenger configuración etc*/
  }
  /*Esto va a ser para meter los tokens que me manda la API de facebook y para poner el que le debo dar
  yo después*/

  module.exports = facebook_service;