---
title:  "¿Cómo impactará la inteligencia artificial generativa en el mundo de los ecommerce?"
description: ""
date:   2023-10-05 16:04:52 +0100
author: [mmoreram, Marc Morera]
published: false
---
Entre tanta saturación por noticias y información sobre cómo la inteligencia artificial generativa está cambiando el
mundo, estoy seguro que en algún momento os habéis preguntado... bueno, ¿y esto que puede aportarle a mi negocio? Y es
que, para responder a esta pregunta, es importante conocer un poco qué es la inteligencia artificial generativa. Solo de
esta forma, podremos tener una foto de hasta donde puede esta llegar, y hasta que punto, y siendo al
final esta la única razón por la cual nos interesamos por algo desde la perspectiva de empresario, nos ayudará a vender
más.

Es importante entender que las explicaciones que formulo a continuación son aproximadas y no exactas. La comprensión de
los modelos generativos es un trabajo muy complejo paraPara entender cómo
funciona exactamente, os recomiendo leer blogs especializados o los papers en cuestión.

## Funcionamiento de la inteligencia artificial generativa

Podríamos dar muchísimas vueltas a este tema, y entrar en tanto detalle como fuera necesario, pero en este post quiero
que quede clara la base. La inteligencia artificial generativa no es inteligente. De hecho, ninguna inteligencia
artificial lo és. No hay inteligencia de ningún tipo. No hay ningún ente central pensante. Solo hay números, grafos y
estadística pura.

El funcionamiento es simple.

Revisas todo internet y calculas la probabilidad de que, tras una palabra A exista la palabra B. Para que nos
situemos, se genera una lista enorme con esta información. A modo de ejemplo, después de la palabra "La", la
probabilidad de que le siga la palabra "casa" según se ha encontrado en todos los documentos, webs y artículos de
internet, es de un 1% (no importa el idioma).

Pero no es todo, porque de esta forma generaríamos texto
completamente inconexo y descontextualizado. Esta lista también genera relaciones de más de una palabra, por ejemplo
después de las palabras "la casa", hay una probabilidad de que la palabra "verde" les siga. Y así textos tan largos
como se desee (¿os suena la palabra contexto? A mayor es el contexto, más relaciones se hacen del tipo "la casa verde
era muy grande y muy" => "cara 3%, alta 2%, barata 1,3%"). Obviamente, no se guarda una lista con toda esta información
sino que dicha información se guarda de forma aproximada en una red neuronal, de tal forma que tu puedas pasarle como
valor de entrada el texto (contexto) y el sistema genere las palabras con más porcentage de aparición, las mezcle
aleatoriamente y saque una de ellas. Y así, palabra a palabra.

Por lo que, cuando escribimos en un sistema del tipo ChatGPT, lo único que estamos haciendo es generar las primeras
palabras de esta cadena, y la inteligencia artificial, genera palabra trás palabra con todo lo escrito y generado
anteriormente como contexto.

## Alucinaciones

Cómo podéis ver, lo único que recibimos de ello es texto aleatorio, por lo que una de las características que tienen
todas las implementaciones de inteligencias artificiales generativas son las llamadas alucinaciones. Invenciones. Texto
generado que nada tiene que ver con el resultado esperado, cómo por ejemplo precios en nuestro catálogo, productos que
el sistema genera sin tener nada que ver con nuestro inventario o sencillamente respuestas enteras que, de forma
estadística podrían tener sentido pero que, en nuestro contexto, solo podrían generar una respuesta negativa en nuestros
clientes.

Esto es, ahora mismo, el gran hándicap que tienen todos los modelos generativos. Por muy grandes que sean, absolutamente
todos carecen de la capacidad de generar contenido 100% controlado, y esto es un problema muy serio a la hora de
exponerlo como representante directo de nuesto negocio.

## Contexto

Las instrucciones que nosotros le damos al modelo generativo no es nada más que, como hemos dicho anteriormente, las
primeras palabras a tener en cuenta a la hora de generar todo el contenido. Las buenas aproximaciones de contextos son
aquellas que, con una buena batería de pruebas, aciertan no tan solo en la calidad y veracidad del contenido generado
(si tiene en cuenta solo los productos añadidos en el contexto), sino en el respeto de las instrcciones dadas, como por
ejemplo el formato del contenido (si queremos que nos devuelva el resultado como un JSON para poder tratarlo luego desde
el servidor)

Hay varias pistas de cómo dar ciertas directrices a un modelo como estos, pero todas ellas pueden mostrarse
completamente ignoradas en ciertos casos, por lo que nunca, absolutamente nunca, ninguna opción te garantiza un 100% de
éxito.

Una de las variables con las que se juega a la hora de exponer un modelo nuevo es en la dimensión del contexto. La
cantidad de instrucciones que puedes agregar al modelo para que empieze a generar nuevas palabras. Teóricamente, y
hablo de la teoría porque en la práctica no trata solo de la longitud del contexto sino de la calidad del mismo, cuan
más largo sea el contexto, más específico podrás ser en las instrucciones y más acotadas podrán ser las respuestas.

Actualmente el modelo más avanzado de OpenAI, el modelo GPT4, cuenta con un máximo de alrededor 24.000 palabras a
utilizar como contexto.

## Retos

Dada esta información, y ahora que tenemos un poco más de contexto (nunca mejor dicho), la pregunta sigue siendo la
misma. ¿Cómo podemos integrar estos modelos en nuestra tienda online para vender más?

Mucho más allá de utilizar modelos generativos como ChatGPT para generar o mejorar descripciones para nuestros productos,
el más ilusionante y uno de los más complejos de los retos es dotar a un modelo como estos el conocimiento
entero de nuestra empresa, empezando por nuestro catálogo, pasando por nuestra cultura y forma de tratar a nuestros
clientes, y terminando por todo conocimiento que sea posible para acompañar a nuestros clientes durante toda la venta.

Tarea compleja. Os lo aseguro.


v=spf1 include:_spf.google.com include:sendgrid.net ~all
