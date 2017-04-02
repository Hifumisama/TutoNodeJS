/*
    La ligne ci-dessous permet de récupérer la bibliothèque HTTP, qui nous permet de manier les requêtes... HTTP (MERCI CAPTAIN OBVIOUS XD)
*/
var http = require('http');

// Cette fois nous avnos besoin d'un module pour gérer le système de navigation entre les pages (ou plus simplement le système d'URL ^^)

var url = require('url');

// ce module nous sert à récupérer non pas l'url en entier, mais les paramètres contenus dans celle ci (placés généralement après le cararctère "?") 

var querystring = require('querystring');

// Le module que l'on vient d'appeler sert à créer des évents personnalisés, et cela peut être particulièrement utile d'ailleurs ^^.

 var events = require('events').EventEmitter;

/* 
    on peut intégrer cette fonction directement dans le createServer, Cependant j'ai volontairement créé cette fonction dans une variable pour simplifier la compréhension, 
    et aussi pour éviter le "callback hell".
    Maintenant faut expliquer à quoi que cela sert cette fonction :
    Celle ci sert à gérer les requêtes de l'utilisateur d'un coté, et de l'autre le contenu à renvoyer :D.
*/
var response = function(req,res) {
    // Le head de la réponse, qui indique que tout va bien nickel :D A noter que l'entête peut aussi contenir d'autres informations (comme le type de contenu attendu dans la réponse par exemple.)
    res.writeHead(200, {"Content-type" : "text/html"});
    
    // la suite, indique que l'on termine la réponse avec le contenu entre parenthèses ^^ Ce contenu peut être ce que l'on souhaite,pour peu que l'on y indique son type dans le header de la réponse.
    res.end('<p>Salut tout le monde, à nouveau :D et écrit en HTML</p>');
}

// on peut aussi y construire des pages HTML via la fonction Write, Comme ci dessous : (on notera qu'il faut TOUJOURS un res.end, afin de signifier la fin de la réponse...)
var responseHTML = function(req,res) {
    res.writeHead(200, {"Content-type" : "text/html"});
    res.write(
        '<!DOCTYPE html>'+

        '<html>'+

        '    <head>'+

        '        <meta charset="utf-8" />'+

        '        <title>Ma page Node.js !</title>'+

        '    </head>'+ 

        '    <body>'+

        '       <p>Voici un paragraphe <strong>HTML</strong> !</p>'+

        '   </body>'+

        '</html>');
    res.end();
}

//Fort heureusement on n'aura pas à écrire de cette facon le code HTML habituellement, on peut tout à fait se servir de moteurs de templates pour cela.

/*
    Ici on teste le système de récupération de l'url de l'utilisateur par le serveur.
*/

var testURL = function(req,res){
    // Cette ligne est utile pour récupérer et stocker dans une variable le contenu de l'adresse fournie à node.js On noteraque que l'on utilise une requête "req", prouvant que l'on récupère au lieu de cette fois directement renvoyer.
    var page = url.parse(req.url).pathname;
    
    // ici on met en place la fonction permettant de choper les paramètres contenus dans une URL.
    var params = querystring.parse(url.parse(req.url).query);
    
    res.writeHead(200, {"Content-type" : "text/plain"});
    
    // ici on teste les différentes routes que l'on peut mettre en place en fonction de l'URL renvoyée. Si la page est inconnue cela renvoie d'ailleurs à un message indiquant une non existance de la page ^^.
    
    if(page == '/')
        {
            // On ajoute ici un test afin de constater la présence de paramètres injectés dans la page par l'utilisateur. 
            
            if ('prenom' in params && 'nom' in params)
            {
                res.write('Vous vous nommez' + params['prenom'] + params['nom']+' je me trompe ?' );
            }
            res.write("Bienvenue à l'accueil :D");
        }
    else if(page == '/yolo')
        {
            res.write("Z etes pas un peu cinglés ? xD");
        }
    else if(page == '/connaissance')
        {
            res.write("Le chemin de la connaissance passe par l'acceptation de son existence... plus ou moins mdr");
        }
    else
        {
            res.writeHead(404);
            res.write("Cette page n existe pas ou plus ? NAAAAAAAAAAAN sans blague ? mdr");  
        }
    
    console.log(page);
    res.end();
}

/*
    Cette fonction sert à créer le serveur proprement dit, on remarque d'ailleurs que la fonction response, est une fonction de callback contenant les requêtes que l'on fait au serveur !
*/

var server = http.createServer(testURL);

// Ce qu'il y a ci dessous concerne le système de création et d'écoute des évènements pouvant survenir dans le fonctionnement du serveur.

// Pour cela on crée d'abord le nom de la variable, et on l'affecte à la fonction d'eventemmiter indiquée plus hauts
var jeu = new events();


// on initialise l'écoute de évent (Note ici, on place les écouteurs de l'évent AVANT l'émission des évènements eux mêmes, si non on se retrouve dans le cas ou lorsque l'évènement apparait, il n'est pas capté)

jeu.on('gameover',function (message){
    console.log(message);
});


// on écrit l'émission du message proprement dit

jeu.emit('gameover','vous avez paumé quelque chose mdr');



// on indique simplement au serveur de se tenir prêt à exécuter les prochaines instructions :D (en écoutant le port numéro 8080, mais le nombre peut tout à fait être arbitraire ^^).
server.listen(8080);