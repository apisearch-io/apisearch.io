---
title:  "6 pasos para que todos tus correos lleguen a tus clientes"
description: ""
date:   2023-10-05 16:04:52 +0100
author: [mmoreram, Marc Morera]
---
Esta sensación tan maravillosa de enviar correos con nuestro proveedor de mailing y que, en el mejor de los casos,
nuestros clientes nos avisen de que no han recibido nada. Correos de facturas que no llegan, correos de confirmación que
nunca llegan, o peor aún, inversiones en email marketing que nunca dieron los números de conversión esperados.

Simple. 6 pasos para que no os ocurra nunca más y todos los emails lleguen a sus remitentes.

1. Primero de todo, os recomiendo que utilicéis un servicio externo para enviar emails. Hay sistemas que permiten enviar
correos desde la propia máquina donde residen nuestros proyectos, pero probablemente tengan todas las probabilidades
de entrar en spam o directamente ser bloqueados.
1. Una vez estemos utilizando un proveedor de email de cierto prestigio, no se trata de enviar correos y ya está.
Primero tenemos que configurar la integración de nuestro dominio con el proveedor en cuestión. Anotad estas palabras:
SPF y DKIM. No es necesario saber para qué sirve cada cosa, pero para que tengáis una idea por encima, son directrices
que uno configura en los DNS del dominio para proteger la identidad de quien envía emails en nombre de dicho dominio.
En el propio proveedor os saldrán instrucciones paso a paso de cómo configurarlo para darles permiso para enviar emails
en vuestro nombre.

1. Una vez configuradas estas directrices, hay otra palabra que tenéis que conocer: DMARC. Esta directriz se encarga de
definir las acciones pertinentes cuando los dos filtros anteriores fallan. En la definición del DNS se pone, entre
otras posibles configuraciones, un correo de tu dominio donde te enviarán reportes casi diarios con todo lo que ha
sucedido (emails que se han bloqueado, los que han pasado los filtros...). Es importante configurar este parámetro.

> ¡CUIDADO!: Hacemos una pequeña parada en este punto, porque una vez hayáis configurado el DMARC es posible que se os
rompa por otro lado. Y es que en este punto hemos definido cuan identificados deben estar nuestros correos para que
lleguen correctamente, por lo que ahora, tenemos que asegurarnos que en todos lados salgan bien autenticados.
Y si, estoy incluye nuestro correo habitual (Gmail, por ejemplo). En el caso de Gmail tendréis que configurar un DNS
con la configuración DKIM que os dará el sistema (podéis leer más
[aqui](https://support.google.com/a/answer/180504?hl=es-419)). Es muy importante no saltarse este paso
porque sino, (casi) ninguno de los emails que mandéis con vuestro Gmail llegará a su destinatario.`

4. Una de las más importantes. Vigila desde dónde se envían tus correos. Literalmente. Desde qué IPs se envían. En
servicios de envío de emails en los que te ofrecen planes gratuitos o muy baratos (los niveles más bajos) suelen
ofrecerte IPs compartidas para enviar los correos. Evitad a toda costa estas prácticas. Y es que compartir la IP de
envío con otros clientes hará que algunos de los filtros de IPs de tus clientes detecten tus correos como spam y los
bloqueen directamente.

1. Hay un valor llamado "reputación de un dominio". Este valor es algo que evoluciona en el tiempo y tiene en cuenta
absolutamente todo lo que ocurre con tus emails, desde las decisiones que se toman a la hora de filtrar, hasta las
acciones de tus clientes o posibles leads con los propios emails (marcarlos como spam, abrirlos o no). Revisa
constantemente este valor (algunos proveedores ya ofrecen este servicio) e intenta que nunca baje demasiado.
Valores muy bajos forzarán que tus emails se marquen como spam.

1. Cuidado con la puerta fría. Como hemos dicho anteriormente, el hecho de que un cliente potencial marque un email como
spam, lo derive a bandejas de promociones o simplemente no los abra, afectará negativamente a nuestra reputación.
Enviar puertas frías suele ser más propenso a que la reputación baje considerablemente.

En [Apisearch](https://apisearch.io) hemos seguido estos pasos para enviar nuestros correos a nuestros clientes, dado
que algunos de ellos son vitales para el correcto funcionamiento de la aplicación. Gracias a ellos, hemos conseguido
que lleguen el 100% de los correos, por lo que estamos contentos de poder decir que hemos llegado donde queríamos.

Y ya sabes, si quieres el mejor buscador para tu tienda online, Apisearch es siempre la mejor opción. Visita
[nuestra web](https://apisearch.io) y disfruta de una experiencia maravillosa.
