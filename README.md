# P7_Groupomania

Bonjour,

- Le projet consiste à construire un réseau social interne pour les employés de Groupomania.

- La specification technique du projet se trouve à la racine du dossier P7_GROUPOMANIA.

- Pour lancer le projet sur votre ordianateur :

1/ Importez dans phpMyAdmin le fichier groupomania.sql comprenant les données de la base de donnée. Le fichier se trouve à la racine du dossier P7_GROUPOMANIA.

2/ Créer un fichier .env avec les données fournies dans le fichier P7_02_Acces.pdf, joint avec le livrable, et comprenant les differents mots de passes.

3/ Ouvrez le dossier P7_GROUPOMANIA qui comprend:
	un dossier backend
	un dossier frontend
	une spécification technique (Groupomania_Specs_Fr_DWJ_VF.pdf)
	un fichier groupomania.sql
	un fichier README

4/ Lancez votre terminal de commande et executez:

	pour le frontend : 
		executez =>			cd frontend
		puis executez =>	npm run serve
	
	pour le backend :
		Vérifiez de bien utiliser NPM pour utiliser les dependances dans le fichier package.json.
		executez =>			cd backend
		puis executez =>	nodemon serve

5/ Ouvrez votre navigateur et accedez à l'application sur 
	http://localhost:8080/#/ => page d'acceuil
	http://localhost:8080/#/login => page login
	http://localhost:8080/#/register	=> page d'inscription
	http://localhost:8080/?#/home => page de l'utilisateur

6/ Les acces au compte administrateur sont fournis dans le document P7_02_Acces.pdf.

Merci de votre attention et bon surfing.