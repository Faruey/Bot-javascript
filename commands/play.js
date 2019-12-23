const Discord = require('discord.js')
const ytdl = require('ytdl-core');
//npm i opusscript , npm i ytdl-core & npm i discord.js

exports.run = async (client, message, args, ops) => {
  
  //primeiro irei fazer as embeds de retorno do bot
  var semVoz = new Discord.RichEmbed()
  .setTitle('Você não está conectado ao chat de voz')
  .setDescription('Conecte-se ao chat de voz para eu poder tocar as suas músicas')
  .setColor(65507)
  .addField('Bot em beta!', 'sem comando de stop **por enquanto**', true)
  .setFooter(`Copyrighted by: CdA Internet Division©|Bot from Discord© have been maked in Javascript`)
  
  var jaConectado = new Discord.RichEmbed()
  .setTitle('O bot já está conectado a um chat de voz')
  .setDescription('Espere o seu amigo parar de escutar para eu poder tocar as suas músicas')
  .setColor(65507)
  .addField('Bot em beta!', 'sem comando de stop **por enquanto**', true)
  .setFooter(`Copyrighted by: CdA Internet Division©|Bot from Discord© have been maked in Javascript`)
  
  var semUrl = new Discord.RichEmbed()
  .setTitle('Acho que você se esqueceu de botar a url')
  .setDescription('Coloque uma url para eu poder tocar as suas músicas')
  .setColor(65507)
  .addField('Bot em beta!', 'sem comando de stop **por enquanto**', true)
  .setFooter(`Copyrighted by: CdA Internet Division©|Bot from Discord© have been maked in Javascript`)
  
  var Naoverificada = new Discord.RichEmbed()
  .setTitle('Seu link não passou pela verificação!')
  .setDescription('Coloque um link oficial do **youtube**')
  .setColor(65507)
  .addField('Bot em beta!', 'sem comando de stop **por enquanto**', true)
  .setFooter(`Copyrighted by: CdA Internet Division©|Bot from Discord© have been maked in Javascript`)
  
  
  
  //conferir se o autor da mensagem está conectado a um chat de voz que é permitido música
  if (!message.member.voiceChannel) return message.channel.send(semVoz);
  
  //conferir se o bot já está em um outro canal de música na guilda
  if (message.guild.me.voiceChannel) return message.channel.send(jaConectado);
  
  //conferir se a um link acompanhado do comando play
  //ex: -play [nada] / o bot ira retornar com a variavel embed semUrl
  if(!args[0]) return message.channel.send(semUrl);
  
  //definir o argumento validate
  //ex: -play ada / o bot ira verificar se isso é um link
  let validate = await ytdl.validateURL(args[0]);
  
  //ver se o link é oficial
  // apos verificar o link se o link for do youtube estara tudo bem
  if (!validate) return message.channel.send(Naoverificada);
  
  //pegar a descrição do vídeo
  //ex: 10 milhoes de inscritos / desc : ayhadpqdqoweqjwe9qe / info = desc  
  let info = await ytdl.getInfo(args[0]);
  
  //definir a conexão ao chat de voz
  //conectar o bot ao chat de musica
  let connection = await message.member.voiceChannel.join();
  
  //tocar a música
  //PARTE MAIS IMPORTANTE DO CODIGO / lembrando tem que dar o npm i opusscript
  let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
    
var tocando = new Discord.RichEmbed()
  .setTitle(`Estou tocando agora ${info.title}!`)
  .setDescription('Espere a música acabar para colocar outra \n assim não ocorrerá erros')
  .setColor(65507)
  .addField('Bot em beta!', 'sem comando de stop **por enquanto**', true)
  .setFooter(`Copyrighted by: CdA Internet Division©|Bot from Discord© have been maked in Javascript`)
  
  message.channel.send(tocando);
  
  
  
}
