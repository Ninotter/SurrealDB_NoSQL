Système d’exploitation : Windows 10
SGBD : SurrealDB

Nécessaires (installations ci-dessous) :
Git :
https://git-scm.com/download/win avec la version adaptée

Node.js : 
https://nodejs.org/en/download Windows Installer MSI avec version adaptée (Ne pas désactiver l’installation de NPM) 

SurrealDB :
Ouvrir powershell:

Rentrer la commande :
“ iwr https://windows.surrealdb.com -useb | iex “

Utiliser Git pour récupérer le dépôt :
1)	Créer un dossier
2)	Ouvrir powershell dedans
3)	Utiliser la commande « git clone https://github.com/Ninotter/SurrealDB_NoSQL »
4)	Utiliser la commande « cd .\SurrealDB_NoSQL\ »
5)	Utiliser la commande « npm install »
6)	Utiliser la commande « npm run dev »
Lancer le serveur SurrealDB : 
1)	Ouvrir une autre fenêtre powershell
2)	Utiliser la commande « surreal start --log trace --user root --pass root memory »
(Note : avec le mot-clé « memory » ci-dessus, la base de données est juste stocké en mémoire et sera effacé à l’arrêt du serveur. Pour garder la base de donnée en mémoire, utiliser « surreal start --log trace --user root --pass root file://"[absolute_path_to_directory_to_store_database]" » à la place.)

Remplir la base de données avec contacts.csv :
-Ouvrir powershell
-Lancer une requête avec la commande :
« Invoke-WebRequest -URI http://127.0.0.1:3000/fillcsv »

-Visualiser le contenu de la base de données :
	-Lancer une requête avec la commande : 
« Invoke-WebRequest -URI http://127.0.0.1:3000/readall/contacts »
