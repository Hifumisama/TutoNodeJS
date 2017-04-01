/*
    La ligne ci-dessous permet de récupérer la bibliothèque HTTP, qui nous permet de manier les requêtes... HTTP (MERCI CAPTAIN OBVIOUS XD)
*/
var http = require('http');

/* 
    on peut intégrer cette fonction directement dans le createServer, Cependant j'ai volontairement créé cette fonction dans une variable pour simplifier la compréhension, 
    et aussi pour éviter le "callback hell".
    Maintenant faut expliquer à quoi que cela sert cette fonction :
    Celle ci sert à gérer les requêtes de l'utilisateur d'un coté, et de l'autre le contenu à renvoyer :D.
*/
var response = function(req,res) {
    // Le head de la réponse, qui indique que tout va bien nickel :D
    res.writeHead(200);
    // la suite, indique que l'on termine la réponse avec le contenu entre parenthèses ^^.
    res.end('Salut tout le monde, à nouveau :D');
}
/*
    Cette fonction sert à créer le serveur proprement dit, on remarque d'ailleurs que la fonction response, est une fonction de callback contenant les requêtes que l'on fait au serveur !
*/
var server = http.createServer(response);

// on indique simplement au serveur de se tenir prêt à exécuter les prochaines instructions :D (en écoutant le port numéro 8080, mais le nombre peut tout à fait être arbitraire ^^).
server.listen(8080);