webpackJsonp([14],{

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(300),
        __webpack_require__(301),
        __webpack_require__(302),
        __webpack_require__(303)
    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(function () {

    'use strict';

    (function () {
        var app = window.app = window.app || {};
        app.cultures = app.cultures || {};
        app.cultures.fr = {
            /*
            secureStorage: {
                success: 'Avec le vérouillage écran activé, vous bénéficiez de l’encryption des données confidentielles.',
                warning: 'Le vérouillage écran est désactivé. Désolé, mais notre application ne peut pas stocker les données confidentielles sans.'
            },
            */
            versions: {
                draft: {
                    name: 'Brouillon'
                },
                published: {
                    name: 'Version {0}'
                }
            },
            // Main layout
            layout: {
                back: 'Retour'
            },
            // Activities view
            activities: {
                viewTitle: 'Activités',
                buttonGroup: {
                    chart: 'Graphique',
                    list: 'Liste'
                },
                listView: {
                    groups: {
                        today: 'Aujourd’hui',
                        yesterday: 'Hier',
                        startOfWeek: 'Cette semaine',
                        startOfMonth: 'Ce mois'
                    }
                }
            },
            // Categories view
            categories: {
                viewTitle: 'Explorer'
            },
            // Correction view
            correction: {
                viewTitle: 'Page {0} de {1}',
                // Labels
                explanations: 'Explications'
            },
            // Dialogs and alerts
            dialogs: {
                buttons: {
                    cancel: {
                        text: 'Annuler',
                        icon: 'close'
                    },
                    ok: {
                        text: 'OK',
                        icon: 'ok'
                    }
                },
                confirm: 'Confirmation',
                error: 'Erreur',
                info: 'Information',
                success: 'Succès'
            },
            appStoreReview: {
                title: 'Votez pour {0}',
                message: 'Si vous aimez {0}, il suffit d’une minute pour encourager nos développements. Merci pour votre soutien !',
                buttons: {
                    cancel: {
                        text: 'Plus tard'
                    },
                    ok: {
                        text: 'Voter maintenant'
                    }
                }
            },
            // Drawer
            drawer: {
                activities: 'Activités',
                categories: 'Explorer',
                favourites: 'Favoris',
                scan: 'QR Code',
                settings: 'Réglages'
            },
            // Favourites view
            favourites: {
                viewTitle: 'Favoris'
            },
            // Finder view
            finder: {
                viewTitle: 'Recherche'
            },
            // Network connection view
            network: {
                viewTitle: 'Connexion',
                message: 'Pas de réseau'
            },
            // Notification messages
            notifications: {
                activitiesQueryFailure: 'Il y a eu une erreur lors du chargement des activités.',
                appVersionFailure: 'Vous utilisez une ancienne version qui pourrait poser des problèmes de compatibilité. Veuillez mettre à jour.',
                batteryCritical: 'Niveau de batterie critique. Rechargez maintenant!',
                batteryLow: 'Niveau de batterie faible. Rechargez bientôt!',
                clickSubmitInfo: 'Pressez <i class="kf kf-submit"></i> pour calculer votre score.',
                confirmSubmit: 'Voulez-vous vraiment soumettre pour obtenir votre score et la correction ?',
                dbMigrationFailure: 'La migration de la base de données mobile a échoué lors de la mise à niveau.',
                networkOffline: 'Vous n’êtes pas connecté à Internet.',
                networkOnline: 'Votre connexion Internet est restaurée.',
                oAuthTokenFailure: 'Le service d’authentification a retourné une erreur.',
                openUrlUnknown: 'Il y a eu une erreur d’ouverture d’une url inconnue.',
                openUrlLanguage: 'Veuillez changer de langue pour ouvrir cette url.',
                pageNavigationInfo: 'Pressez <i class="kf kf-previous"></i> et <i class="kf kf-next"></i> pour changer de page.',
                pinSaveFailure: 'Les pins à 4 chiffres ne correspondent pas.',
                pinSaveInfo: 'Veuillez saisir et confirmer votre pin à 4 chiffres avant d’enregistrer.',
                pinValidationFailure: 'Mauvais pin à 4 chiffres.',
                pinValidationInfo: 'Veuillez saisir votre pin à 4 chiffres pour vous connecter.',
                scanFailure: 'Erreur de scan. Vérifiez que l’app soit autorisée à utiliser la caméra.',
                scanPrompt: 'Veuillez placer un code dans l’espace délimité.',
                scanLanguageWarning: 'Veuillez changer de language dans les paramètres pour scanner ce code.',
                scanMatchWarning: 'Ce code ne correspond pas.',
                scoreCalculationFailure: 'Il y a eu une erreur de calcul de votre score.',
                scoreSaveFailure: 'Il y a eu une erreur d’enregistremenet de votre score.',
                scoreSaveSuccess: 'Votre score a été enregistré avec succès.',
                settingsLoadFailure: 'Il y a eu une erreur lors du chargement des paramètres.',
                sharingFailure: 'Il y a eu une erreur lors du partage du quiz.',
                sharingSuccess: 'Ce quiz a été partagé avec succès.',
                showScoreInfo: 'Pressez <i class="kf kf-score"></i> pour retourner à votre score.',
                signinUrlFailure: 'Il y a eu une erreur d’obtention d’url de connexion pour le service d’authentification.',
                summariesQueryFailure: 'Il y a eu une erreur de recherche dans la base de données.',
                summaryLoadFailure: 'Il y a eu une erreur lors du chargement des données du résumé descriptif.',
                summaryViewInfo: 'Pressez le bouton en bas de page.',
                syncBandwidthLow: 'Vous ne pouvez pas synchroniser vos données avec une faible bande passante.',
                syncBatteryLow: 'Vous ne pouvez pas synchroniser vos données avec des batteries déchargées.',
                syncFailure: 'Il y a eu une erreur de synchronisation des données.',
                syncSuccess: 'les données locales sont synchronisées avec les serveurs distants.',
                syncUnauthorized: 'Vous n’êtes pas autorisé à synchroniser vos données. Veuillez vous identifier avec un service d’authentification.',
                unknownError: 'Il y a eu une erreur inconnue. Veuillez redémarrer l’app.',
                userLoadFailure: 'Il y a eu une erreur lors du chargement du profil utilisateur.',
                userSaveFailure: 'Il y a eu une erreur d’enregistremenet de votre profil utilisateur.',
                userSaveSuccess: 'Votre profil utilisateur a été enregistré avec succès.',
                userSignInSuccess: 'Vous êtes connecté en tant que {0}.',
                usersQueryFailure: 'Il y a eu une erreur lors du chargement de la liste des utilisateurs.',
                versionLoadFailure: 'Il y a eu une erreur lors du chargement de la version.',
                versionsLoadFailure: 'Il y a eu une erreur lors du chargement des versions.'
            },
            osNotifications: {
                title: 'Ça fait longtemps...',
                text: 'Pourquoi ne pas lancer {0} pour mesurer vos progrès?'
            },
            // Player view
            player: {
                viewTitle: 'Page {0} de {1}',
                // Labels
                instructions: 'Instructions'
            },
            // Score view
            score: {
                viewTitle: 'Score {0:p0}',
                listView: {
                    groups: 'Page {0}',
                    answer: 'Réponse',
                    solution: 'Solution'
                }
            },
            // Settings view
            settings: {
                viewTitle: 'Réglages',
                // Labels
                category: 'Curriculum',
                language: 'Langue',
                theme: 'Thème',
                user: 'Utilisateur',
                version: 'Version',
                // Buttons
                switch: 'Changer d’utilisateur',
                tour: 'Faire un tour',
                // Copyright
                copyright: 'Copyright &copy; 2013-2018 Memba&reg; Sarl'
            },
            // Sign-in view
            signin: {
                viewTitle: 'Tour',
                viewTitle2: 'Identification',
                // Onboarding
                page0: 'Naviguez et recherchez des exercices et des tests de connaissance organisés par matière.',
                page1: 'Jouez les questions, donnez vos réponses et l’application calcule votre score.',
                page2: 'Suivez et mesurez vos progrès.',
                // Notification
                welcome: 'Veuillez sélectionner un service d’identification. Nous ne l’utiliserons jamais pour publier à votre insu.',
                welcome2: '{0}, veuillez sélectionner l’identification par {1} pour renouveler vos autorisations ou pressez <i class="kf kf-user"></i>.'
            },
            // Summary view
            summary: {
                viewTitle: 'Détails',
                // Labels
                author: 'Auteur',
                category: 'Catégorie',
                description: 'Description',
                metrics: '',
                published: 'Publié le',
                tags: 'Mots Clés',
                title: 'Titre',
                // Buttons
                go: 'Aller',
                // ActionSheet
                actionSheet: {
                    cancel: 'Annuler',
                    feedback: 'Signaler',
                    play: 'Jouer',
                    share: 'Partager'
                },
                // Social Sharing
                socialSharing: {
                    chooserTitle: 'Sélectionnez une application',
                    // message: 'Evaluez vos connaissances sur Kidoju.\n\nTitre:\t\t{0}\nLien:\t\t{1}\nDescription:\t{2}',
                    message: 'Testez vos connaissances sur Kidoju.\n\n{0}\n{1}',
                    subject: 'Répondez à \u201C{0}\u201D?'
                }
            },
            // Sync view
            sync: {
                viewTitle: 'Synchronisation',
                title: 'Progrès',
                message: {
                    activities: 'Synchonisation des activités',
                    complete: 'Synchronisation terminée'
                },
                pass: {
                    remote: 'Central',
                    local: 'Local'
                },
                buttons: {
                    continue: 'Continuer'
                }
            },
            // User view
            user: {
                viewTitle: 'Utilisateur',
                // Labels
                firstName: 'Prénom',
                lastName: 'Nom',
                lastUse: 'Dern. Util.',
                pin: 'PIN',
                newPIN: 'Nouv. PIN',
                confirm: 'Confirmation',
                // Buttons
                save: 'Enregistrer',
                signIn: 'S’identifier',
                newUser: 'Nouvel Utilisateur',
                changePIN: 'Nouveau PIN'
            },
            // viewModel
            viewModel: {
                languages: [
                    { value: 'en', text: 'Anglais' },
                    { value: 'fr', text: 'Français' }
                ],
                themes: [
                    { value: 'android-dark', text: 'Android Dark' },
                    { value: 'android-light', text: 'Android Light' },
                    { value: 'blackberry', text: 'Blackberry' },
                    { value: 'fiori', text: 'Fiori' },
                    { value: 'flat', text: 'Flat' },
                    { value: 'ios', text: 'iOS 6' },
                    { value: 'ios7', text: 'iOS 7+' },
                    { value: 'material-dark', text: 'Material Dark' },
                    { value: 'material-light', text: 'Material Light' },
                    { value: 'meego', text: 'Meego' },
                    { value: 'nova', text: 'Nova' },
                    { value: 'office365', text: 'Office 365' }
                    // { value: 'wp-dark', text: 'Windows Dark' },
                    // { value: 'wp-light', text: 'Windows light' }
                ]
            }
        };
        window.kendo.culture('fr-FR');
    }());

    return window.app;

}, __webpack_require__(0));


/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** 
 * Kendo UI v2018.1.117 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2018 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        f();
    }
}(function(){
(function( window, undefined ) {
    kendo.cultures["fr-FR"] = {
        name: "fr-FR",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Euro",
                abbr: "EUR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
                    namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
                    namesShort: ["di","lu","ma","me","je","ve","sa"]
                },
                months: {
                    names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
                    namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** 
 * Kendo UI v2018.1.117 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2018 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        f();
    }
}(function(){
(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Est égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Est égal à",
    "gte": "Est postérieur ou égal à",
    "gt": "Est postérieur",
    "lte": "Est antérieur ou égal à",
    "lt": "Est antérieur",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colonnes",
  "sortAscending": "Tri croissant",
  "sortDescending": "Tri décroissant",
  "settings": "Paramètres de colonne",
  "done": "Fini",
  "lock": "Bloquer",
  "unlock": "Ouvrir"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "jour(s)",
    "repeatEvery": "Répéter chaque:"
  },
  "end": {
    "after": " Après",
    "occurrence": "occurrence(s)",
    "label": "Finir:",
    "never": "Jamais",
    "on": "Sur",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Une fois par jour",
    "monthly": "Une fois par mois",
    "never": "Jamais",
    "weekly": "Une fois par semaine",
    "yearly": "Une fois par an"
  },
  "monthly": {
    "day": "Jour",
    "interval": "mois",
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:"
  },
  "offsetPositions": {
    "first": "premier",
    "fourth": "quatrième",
    "last": "dernier",
    "second": "second",
    "third": "troisième"
  },
  "weekly": {
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "semaine(s)"
  },
  "yearly": {
    "of": "de",
    "repeatEvery": "Répéter chaque:",
    "repeatOn": "Répéter l'opération sur:",
    "interval": "année(ans)"
  },
  "weekdays": {
    "day": "jour",
    "weekday": "jour de la semaine",
    "weekend": "jour de week-end"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Insérer",
    "destroy": "Effacer",
    "canceledit": "Annuler",
    "update": "Mettre à jour",
    "edit": "Éditer",
    "excel": "Export vers Excel",
    "pdf": "Export en PDF",
    "select": "Sélectionner",
    "cancel": "Annuler les modifications",
    "save": "Enregistrer les modifications"
  },
  "editable": {
    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
    "cancelDelete": "Annuler",
    "confirmDelete": "Effacer"
  },
  "noRecords": "Aucun enregistrement disponible."
});
}
  /* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Aucun enregistrement à afficher",
  "loading": "Chargement...",
  "requestFailed": "La requête a échoué.",
  "retry": "Réessayer",
  "commands": {
      "edit": "Modifier",
      "update": "Mettre à jour",
      "canceledit": "Annuler",
      "create": "Créer",
      "createchild": "Créer un élément enfant",
      "destroy": "Supprimer",
      "excel": "Export Excel",
      "pdf": "Export PDF"
  }
});
}

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.columnMenu =
$.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
    "messages": {
        "columns": "Choisissez les colonnes",
        "filter": "Appliquer les filtres",
        "sortAscending": "Tri (croissant)",
        "sortDescending": "Tri (décroissant)"
    }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tous",
  "page": "Page",
  "display": "Afficher les items {0} - {1} de {2}",
  "of": "de {0}",
  "empty": "Aucun enregistrement à afficher.",
  "refresh": "Actualiser",
  "first": "Aller à la première page",
  "itemsPerPage": "articles par page",
  "last": "Aller à la dernière page",
  "next": "Aller à la page suivante",
  "previous": "Aller à la page précédente",
  "morePages": "Plusieurs pages"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Filtrer",
  "clear": "Effacer filtre",
  "isFalse": "est fausse",
  "isTrue": "est vrai",
  "operator": "Opérateur"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Filtrer",
  "and": "Et",
  "clear": "Effacer filtre",
  "info": "Afficher les lignes avec la valeur qui",
  "selectValue": "-Sélectionner-",
  "isFalse": "est fausse",
  "isTrue": "est vrai",
  "or": "Ou",
  "cancel": "Annuler",
  "operator": "Opérateur",
  "value": "Valeur"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Choisir toutes",
  "clear": "Effacer filtre",
  "filter": "Filtrer",
  "search": "Recherche"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Gras",
  "createLink": "Insérer un lien hypertexte",
  "fontName": "Police",
  "fontNameInherit": "(police héritée)",
  "fontSize": "Taille de police",
  "fontSizeInherit": "(taille héritée)",
  "formatBlock": "Style du paragraphe",
  "indent": "Augmenter le retrait",
  "insertHtml": "Insérer HTML",
  "insertImage": "Insérer image",
  "insertOrderedList": "Liste numérotée",
  "insertUnorderedList": "Liste à puces",
  "italic": "Italique",
  "justifyCenter": "Centrer",
  "justifyFull": "Justifier",
  "justifyLeft": "Aligner le texte à gauche",
  "justifyRight": "Aligner le texte à droite",
  "outdent": "Diminuer le retrait",
  "strikethrough": "Barré",
  "styles": "Styles",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Souligné",
  "unlink": "Supprimer le lien hypertexte",
  "deleteFile": "Êtes-vous sûr de vouloir supprimer \"{0}\"?",
  "directoryNotFound": "Un répertoire avec ce nom n'a pas été trouvé.",
  "emptyFolder": "Vider le dossier",
  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers supportés sont {1}.",
  "orderBy": "Organiser par:",
  "orderByName": "Nom",
  "orderBySize": "Taille",
  "overwriteFile": "Un fichier avec le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous le remplacer?",
  "uploadFile": "Télécharger",
  "backColor": "Couleur de fond",
  "foreColor": "Couleur",
  "dialogButtonSeparator": "Ou",
  "dialogCancel": "Fermer",
  "dialogInsert": "Insérer",
  "imageAltText": "Le texte de remplacement",
  "imageWebAddress": "Adresse Web",
  "imageWidth": "Largeur (px)",
  "imageHeight": "Hauteur (px)",
  "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
  "linkText": "Text",
  "linkToolTip": "Info-bulle",
  "linkWebAddress": "Adresse Web",
  "search": "Search",
  "createTable": "Insérer un tableau",
  "addColumnLeft": "Ajouter colonne à gauche",
  "addColumnRight": "Ajouter colonne à droite",
  "addRowAbove": "Ajouter ligne au-dessus",
  "addRowBelow": "Ajouter ligne au-dessous",
  "deleteColumn": "Supprimer la colonne",
  "deleteRow": "Supprimer la ligne",
  "dropFilesHere": "drop files here to upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insérer un Fichier",
  "dialogOk": "OK",
  "tableWizard": "Assistant de tableau",
  "tableTab": "Table",
  "cellTab": "Cellule",
  "accessibilityTab": "Accessibilité",
  "caption": "Sous-titre",
  "summary": "Sommaire",
  "width": "Largeur",
  "height": "Hauteur",
  "cellSpacing": "Espacement des cellules",
  "cellPadding": "Rembourrage des cellules",
  "cellMargin": "Marge des cellules",
  "alignment": "Alignement",
  "background": "Fond",
  "cssClass": "CSS Classe",
  "id": "Id",
  "border": "Bordure",
  "borderStyle": "Style de bordure",
  "collapseBorders": "Rétracter bordures",
  "wrapText": "Renvoi à la ligne",
  "associateCellsWithHeaders": "Cellules associées aux entêtes",
  "alignLeft": "Aligner à gauche",
  "alignCenter": "Aligner le centre",
  "alignRight": "Aligner à droite",
  "alignLeftTop": "Aligner à gauche et haut",
  "alignCenterTop": "Aligner le centre et haut",
  "alignRightTop": "Aligner à droite et haut",
  "alignLeftMiddle": "Aligner à gauche et milieu",
  "alignCenterMiddle": "Aligner le centre et milieu",
  "alignRightMiddle": "Aligner à droite et milieu",
  "alignLeftBottom": "Aligner à gauche et bas",
  "alignCenterBottom": "Aligner le centre et bas",
  "alignRightBottom": "Aligner à droite et bas",
  "alignRemove": "Retirer alignement",
  "columns": "Colonnes",
  "rows": "Lignes",
  "selectAllCells": "Sélectionner toutes les cellules"
});
}

/* FileBrowser and ImageBrowser messages */

var browserMessages = {
  "uploadFile" : "Charger",
  "orderBy" : "Trier par",
  "orderByName" : "Nom",
  "orderBySize" : "Taille",
  "directoryNotFound" : "Aucun répértoire de ce nom.",
  "emptyFolder" : "Répertoire vide",
  "deleteFile" : 'Etes-vous sûr de vouloir supprimer "{0}"?',
  "invalidFileType" : "Le fichier sélectionné \"{0}\" n'est pas valide. Les type fichiers supportés sont {1}.",
  "overwriteFile" : "Un fichier du nom \"{0}\" existe déjà dans ce répertoire. Voulez-vous le remplacer?",
  "dropFilesHere" : "glissez les fichiers ici pour les charger",
  "search" : "Recherche"
};

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages, browserMessages);
}

if (kendo.ui.ImageBrowser) {
kendo.ui.ImageBrowser.prototype.options.messages =
$.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
}


/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Annuler",
  "dropFilesHere": "déposer les fichiers à télécharger ici",
  "remove": "Retirer",
  "retry": "Réessayer",
  "select": "Sélectionner...",
  "statusFailed": "échoué",
  "statusUploaded": "téléchargé",
  "statusUploading": "téléchargement",
  "uploadSelectedFiles": "Télécharger des fichiers",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "toute la journée",
  "cancel": "Annuler",
  "editable": {
    "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?"
  },
  "date": "Date",
  "destroy": "Effacer",
  "editor": {
    "allDayEvent": "Toute la journée",
    "description": "Description",
    "editorTitle": "Evènement",
    "end": "Fin",
    "endTimezone": "End timezone",
    "repeat": "Répéter",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Début",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Fuseau horaire",
    "timezoneEditorTitle": "Fuseaux horaires",
    "title": "Titre",
    "noTimezone": "Pas de fuseau horaire"
  },
  "event": "Evènement",
  "recurrenceMessages": {
    "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
    "editWindowOccurrence": "Modifier l'occurrence courante",
    "editWindowSeries": "Modifier la série",
    "editWindowTitle": "Modification de l'élément courant"
  },
  "save": "Sauvegarder",
  "time": "Time",
  "today": "Aujourd'hui",
  "views": {
    "agenda": "Agenda",
    "day": "Jour",
    "month": "Mois",
    "week": "Semaine",
    "workWeek": "Semaine de travail",
    "timeline": "Chronologie"
  },
  "deleteWindowTitle": "Suppression de l'élément",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables"
});
}


/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} est requis",
  "pattern": "{0} n'est pas valide",
  "min": "{0} doit être plus grand ou égal à {1}",
  "max": "{0} doit être plus petit ou égal à {1}",
  "step": "{0} n'est pas valide",
  "email": "{0} n'est pas un courriel valide",
  "url": "{0} n'est pas une adresse web valide",
  "date": "{0} n'est pas une date valide",
  "dateCompare": "La date de fin doit être postérieure à la date de début"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Fermer"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "OK"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annuler"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annuler"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Supprimer",
    "moveUp": "Déplacer vers le haut",
    "moveDown": "Déplacer vers le bas",
    "transferTo": "Transférer à",
    "transferFrom": "Transférer de",
    "transferAllTo": "Transférer tout à",
    "transferAllFrom": "Transférer tout de"
  }
});
}

})(window.kendo.jQuery);
}));

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        f();
    }
}(function(){
    (function ($, undefined) {

        var kendo = window.kendo;
        var ui = kendo.mobile.ui;

        /* ListView messages */
        if (ui.ListView) {
            // Beware: this makes all mobile list views filterable by default
            // So non-filterable list views need to have filterable explicitly set to false
            ui.ListView.prototype.options.filterable =
                $.extend(true, ui.ListView.prototype.options.filterable,{
                    placeholder: 'Rechercher...'
                });
            ui.ListView.prototype.options.messages =
                $.extend(true, ui.ListView.prototype.options.messages,{
                    loadMoreText: 'Plus de résultats'
                });
        }

    })(window.kendo.jQuery);
}));


/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false */

(function (f, define) {
    'use strict';
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(function () {

    'use strict';

    var kendo = window.kendo;
    var ui = kendo.ui;
    var options;

    /*  This function has too many statements. */
    /* jshint -W071 */

    /*  This function's cyclomatic complexity is too high. */
    /* jshint -W074 */

    (function ($, undefined) {

        /* kidoju.widgets.assetmanager */
        if (ui.AssetManager) {
            options = ui.AssetManager.prototype.options;
            options.messages = $.extend(true, options.messages, {
                toolbar: {
                    upload: 'Mettre en ligne', // comme sur Youtube.fr
                    delete: 'Supprimer',
                    filter: 'Collection: ',
                    search: 'Recherche'
                },
                tabs: {
                    default: 'Projet'
                },
                data: {
                    defaultName: 'Chargement...',
                    defaultImage: '' // TODO
                }
            });
        }

        /* kidoju.widgets.codeeditor */
        if (ui.CodeEditor) {
            options = ui.CodeEditor.prototype.options;
            options.messages = $.extend(true, options.messages, {
                formula: 'Formule:',
                notApplicable: 'N/A',
                solution: 'Solution:',
                value: 'Valeur:',
                test: 'Test',
                success: 'Succès',
                failure: 'Échec',
                omit: 'Omission',
                error: 'Erreur',
                ajaxError: 'Erreur de chargement de la librairie de validation.',
                jsonError: 'Erreur d\'analyse de la valeur par json. Placez les chaînes de caractères entre guillemets.',
                timeoutError: 'L\'exécution du processus de validation a pris trop de temps.'
            });
        }

        /* kidoju.widgets.codeinput */
        /*
         if (ui.CodeInput) {
            options = ui.CodeInput.prototype.options;
            options.messages = $.extend(true, options.messages, {
                // TODO
            });
         }
         */

        /* kidoju.widgets.explorer */
        if (ui.Explorer) {
            options = ui.Explorer.prototype.options;
            options.messages = $.extend(true, options.messages, {
                empty: 'Rien à afficher'
            });
        }

        /* kidoju.widgets.imagelist */
        if (ui.ImageList) {
            options = ui.ImageList.prototype.options;
            options.messages = $.extend(true, options.messages, {
                toolbar: {
                    add: 'Ajouter'
                },
                validation: {
                    image: 'Une image est requise.',
                    text: 'Du texte est requis.'
                }
            });
        }

        /* kidoju.widgets.markeditor */
        if (ui.MarkEditor) {
            options = ui.MarkEditor.prototype.options;
            options.messages = $.extend(true, options.messages, {
                image: 'Une image sans description',
                link: 'Cliquez ici'
            });
        }
        if (kendo.markeditor && kendo.markeditor.messages.dialogs) {
            kendo.markeditor.messages.dialogs =
                $.extend(true, kendo.markeditor.messages.dialogs, {
                    cancel: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Annuler',
                    okText: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK',
                    headingsDialog: {
                        title: 'Titres',
                        buttons: {
                            h1: 'Titre 1',
                            h2: 'Heading 2',
                            h3: 'Heading 3',
                            h4: 'Heading 4',
                            h5: 'Heading 5',
                            h6: 'Heading 6'
                        }
                    },
                    linkDialog: {
                        title: 'Hyperlien',
                        labels: {
                            text: 'Url'
                        }
                    },
                    imageDialog: {
                        title: 'Image',
                        labels: {
                            url: 'Url'
                        }
                    },
                    latexDialog: {
                        title: 'Expression Mathématique',
                        labels: {
                            display: 'Affichage',
                            inline: 'en ligne'
                        }
                    },
                    previewDialog: {
                        title: 'Aperçu'
                    }
                });
        }
        if (kendo.markeditor && kendo.markeditor.messages.toolbar) {
            kendo.markeditor.messages.toolbar =
                $.extend(true, kendo.markeditor.messages.toolbar, {
                    undo: 'Annuler',
                    redo: 'Rétablir',
                    headings: 'Titres',
                    headingsButtons: {
                        h1: 'Titre 1',
                        h2: 'Titre 2',
                        h3: 'Titre 3',
                        h4: 'Titre 4',
                        h5: 'Titre 5',
                        h6: 'Titre 6'
                    },
                    bold: 'Gras',
                    italic: 'Italique',
                    bulleted: 'Liste à Puces',
                    numbered: 'Liste Numérotée',
                    blockquote: 'Bloc de Citation',
                    hrule: 'Ligne Horizontale',
                    link: 'Hyperlien',
                    image: 'Image',
                    code: 'Code',
                    latex: 'Expression Mathématique',
                    preview: 'Aperçu dans une Fenêtre'
                });
        }

        /* kidoju.widgets.mathinput */
        if (kendo.mathinput && kendo.mathinput.messages.dialogs) {
            kendo.mathinput.messages.dialogs =
                $.extend(true, kendo.mathinput.messages.dialogs, {
                    keypad: {
                        title: 'Clavier',
                        buttons: {
                            comma: ',',
                            stop: '.',
                            n0: '0',
                            n1: '1',
                            n2: '2',
                            n3: '3',
                            n4: '4',
                            n5: '5',
                            n6: '6',
                            n7: '7',
                            n8: '8',
                            n9: '9',
                            a: 'a',
                            b: 'b',
                            c: 'c',
                            i: 'i',
                            j: 'j',
                            k: 'k',
                            n: 'n',
                            p: 'p',
                            q: 'q',
                            x: 'x',
                            y: 'y',
                            z: 'z',
                            pi: 'Pi',
                            infty: 'Infini',
                            space: 'Espace',
                            subscript: 'Indice'
                        }
                    },
                    basic: {
                        title: 'Basique',
                        buttons: {
                            equal: 'Égal',
                            plus: 'Plus',
                            minus: 'Moins',
                            cdot: 'Fois',
                            times: 'Fois',
                            div: 'Divisé par',
                            pleft: 'Parenthèse gauche (',
                            pright: 'Parenthèse droite )',
                            frac: 'Fraction',
                            sqrt: 'Racine carrée',
                            pow2: 'Puissance de 2',
                            pow3: 'Puissance de 3',
                            sin: 'Sinus',
                            cos: 'Cosinus',
                            tan: 'Tangente'
                        }
                    },
                    greek: {
                        title: 'Grec',
                        buttons: {
                            alpha: 'Alpha',
                            beta: 'Beta',
                            gamma: 'Gamma',
                            delta: 'Delta',
                            epsilon: 'Epsilon', // varepsilon
                            zeta: 'Zeta',
                            eta: 'Eta',
                            theta: 'Theta', // vartheta
                            iota: 'Iota',
                            kappa: 'Kappa', // varkappa
                            lambda: 'Lambda',
                            mu: 'Mu',
                            nu: 'Nu',
                            xi: 'Xi',
                            omicron: 'Omicron',
                            pi: 'Pi', // varpi
                            rho: 'Rho', // varrho
                            sigma: 'Sigma', // varsigma
                            tau: 'Tau',
                            upsilon: 'Upsilon',
                            phi: 'Phi', // varphi
                            chi: 'Chi',
                            psi: 'Psi',
                            omega: 'Omega'
                        }
                    },
                    operators: {
                        title: 'Operateurs',
                        buttons: {
                            equal: 'Égal',
                            plus: 'Plus',
                            minus: 'Moins',
                            cdot: 'Fois',
                            times: 'Tois',
                            div: 'Divisé par',
                            pleft: 'Parenthèse gauche (',
                            pright: 'Parenthèse droite )',
                            bleft: 'Crochet gauche [',
                            bright: 'Crochet droit ]',
                            cleft: 'Accolade gauche {',
                            cright: 'Accolade droite }',
                            vleft: 'Ligne verticale gauche |',
                            vright: 'Ligne verticale droite |',
                            lt: 'Inférieur à',
                            le: 'Inférieur ou égal à',
                            gt: 'Supérieur à',
                            ge: 'Supérieur ou égal à',
                            neq: 'Non égal (différent)',
                            approx: 'Approximativement égal à',
                            propto: 'Proportionnel à',
                            plusminus: 'Plus-Moins',
                            percent: 'Pourcent',
                            not: 'Non (négation)',
                            and: 'Et',
                            or: 'Ou',
                            circ: 'Composition',
                            nabla: 'Nabla'
                        }
                    },
                    expressions: {
                        title: 'Fonctions',
                        buttons: {
                            sqrt: 'Racine carrée',
                            cubert: 'Racine cubique',
                            nthroot: 'Racine Nième',
                            pow2: 'Puissance de 2',
                            pow3: 'Puissance de 3',
                            pow: 'Puissance',
                            log: 'Logarithme',
                            log10: 'Logarithme base 10',
                            ln: 'Logarithm Népérien',
                            sin: 'Sinis',
                            cos: 'Cosinus',
                            tan: 'Tangente',
                            arcsin: 'Arc sinus',
                            arccos: 'Arc cosinus',
                            arctan: 'Arc tangente',
                            deriv: 'Dérivée',
                            partial: 'Dérivée partielle',
                            int: 'Intégrale',
                            oint: 'Intégrale curviligne sur un contour fermé',
                            sum: 'Somme',
                            prod: 'Produit',
                            lim: 'Limite'
                        }
                    },
                    sets: {
                        title: 'Ensembles',
                        buttons: {
                            cset: 'Complexes',
                            pset: 'Premiers',
                            nset: 'Naturels',
                            qset: 'Rationels',
                            rset: 'Réels',
                            zset: 'Entiers',
                            emptyset: 'Ensemble vide',
                            forall: 'Quel que soit',
                            exists: 'Il existe',
                            nexists: 'Il n\'existe pas',
                            in: 'Appartient',
                            nin: 'N\'appartient pas',
                            subset: 'Est inclus dans (sous-ensemble)',
                            supset: 'Inclut (sur-ensemble)',
                            nsubset: 'N\'est pas inclus dans',
                            nsupset: 'N\'inclut pas',
                            intersection: 'Intersection',
                            union: 'Union',
                            to: 'To',
                            implies: 'Implique',
                            impliedby: 'Implied by',
                            nimplies: 'Not implies',
                            iff: 'Equivalent to'
                        }
                    },
                    matrices: {
                        title: 'Matrices',
                        buttons: {
                            vector: 'Vecteur',
                            widehat: 'Chapeau (angle)',
                            matrix: 'Matrice',
                            pmatrix: 'Matrice avec parenthèses',
                            bmatrix: 'Matrice avec crochets',
                            bbmatrix: 'Matrice with accolades',
                            vmatrix: 'Matrice avec lignes verticales',
                            vvmatrix: 'Matrice à double ligne verticale',
                            column: 'Ajouter un colonne',
                            row: 'Ajouter une rangée'
                        }
                    },
                    statistics: {
                        title: 'Statistiques',
                        buttons: {
                            factorial: 'Factorielle',
                            binomial: 'Combinaison',
                            overline: 'Surlignage (moyenne)'
                        }
                    }
                    /*
					units: {
						title: 'Units',
						buttons: {}
					},
					chemistry: {
						title: 'Chemistry',
						buttons: {}
					}
					*/
                });
        }
        if (kendo.mathinput && kendo.mathinput.messages.toolbar) {
            kendo.mathinput.messages.toolbar =
                $.extend(true, kendo.mathinput.messages.toolbar, {
                    field: {
                        title: 'Zone de saisie'
                    },
                    backspace: {
                        title: 'Retour arrière'
                    },
                    keypad: {
                        title: 'Clavier',
                        buttons: {
                            comma: ',',
                            stop: '.',
                            n0: '0',
                            n1: '1',
                            n2: '2',
                            n3: '3',
                            n4: '4',
                            n5: '5',
                            n6: '6',
                            n7: '7',
                            n8: '8',
                            n9: '9',
                            a: 'a',
                            b: 'b',
                            c: 'c',
                            i: 'i',
                            j: 'j',
                            k: 'k',
                            n: 'n',
                            p: 'p',
                            q: 'q',
                            x: 'x',
                            y: 'y',
                            z: 'z',
                            pi: 'Pi',
                            infty: 'Infini',
                            space: 'Espace',
                            subscript: 'Indice'
                        }
                    },
                    basic: {
                        title: 'Basique',
                        buttons: {
                            equal: 'Égal',
                            plus: 'Plus',
                            minus: 'Moins',
                            cdot: 'Fois',
                            times: 'Fois',
                            div: 'Divisé par',
                            pleft: 'Parenthèse gauche (',
                            pright: 'Parenthèse droite )',
                            frac: 'Fraction',
                            sqrt: 'Racine carrée',
                            pow2: 'Puissance de 2',
                            pow3: 'Puissance de 3',
                            sin: 'Sinus',
                            cos: 'Cosinus',
                            tan: 'Tangente'
                        }
                    },
                    greek: {
                        title: 'Grec',
                        buttons: {
                            alpha: 'Alpha',
                            beta: 'Beta',
                            gamma: 'Gamma',
                            delta: 'Delta',
                            epsilon: 'Epsilon', // varepsilon
                            zeta: 'Zeta',
                            eta: 'Eta',
                            theta: 'Theta', // vartheta
                            iota: 'Iota',
                            kappa: 'Kappa', // varkappa
                            lambda: 'Lambda',
                            mu: 'Mu',
                            nu: 'Nu',
                            xi: 'Xi',
                            omicron: 'Omicron',
                            pi: 'Pi', // varpi
                            rho: 'Rho', // varrho
                            sigma: 'Sigma', // varsigma
                            tau: 'Tau',
                            upsilon: 'Upsilon',
                            phi: 'Phi', // varphi
                            chi: 'Chi',
                            psi: 'Psi',
                            omega: 'Omega'
                        }
                    },
                    operators: {
                        title: 'Operateurs',
                        buttons: {
                            equal: 'Égal',
                            plus: 'Plus',
                            minus: 'Moins',
                            cdot: 'Fois',
                            times: 'Tois',
                            div: 'Divisé par',
                            pleft: 'Parenthèse gauche (',
                            pright: 'Parenthèse droite )',
                            bleft: 'Crochet gauche [',
                            bright: 'Crochet droit ]',
                            cleft: 'Accolade gauche {',
                            cright: 'Accolade droite }',
                            vleft: 'Ligne verticale gauche |',
                            vright: 'Ligne verticale droite |',
                            lt: 'Inférieur à',
                            le: 'Inférieur ou égal à',
                            gt: 'Supérieur à',
                            ge: 'Supérieur ou égal à',
                            neq: 'Non égal (différent)',
                            approx: 'Approximativement égal à',
                            propto: 'Proportionnel à',
                            plusminus: 'Plus-Moins',
                            percent: 'Pourcent',
                            not: 'Non (négation)',
                            and: 'Et',
                            or: 'Ou',
                            circ: 'Composition',
                            nabla: 'Nabla'
                        }
                    },
                    expressions: {
                        title: 'Fonctions',
                        buttons: {
                            sqrt: 'Racine carrée',
                            cubert: 'Racine cubique',
                            nthroot: 'Racine Nième',
                            pow2: 'Puissance de 2',
                            pow3: 'Puissance de 3',
                            pow: 'Puissance',
                            log: 'Logarithme',
                            log10: 'Logarithme base 10',
                            ln: 'Logarithm Népérien',
                            sin: 'Sinis',
                            cos: 'Cosinus',
                            tan: 'Tangente',
                            arcsin: 'Arc sinus',
                            arccos: 'Arc cosinus',
                            arctan: 'Arc tangente',
                            deriv: 'Dérivée',
                            partial: 'Dérivée partielle',
                            int: 'Intégrale',
                            oint: 'Intégrale curviligne sur un contour fermé',
                            sum: 'Somme',
                            prod: 'Produit',
                            lim: 'Limite'
                        }
                    },
                    sets: {
                        title: 'Ensembles',
                        buttons: {
                            cset: 'Complexes',
                            pset: 'Premiers',
                            nset: 'Naturels',
                            qset: 'Rationels',
                            rset: 'Réels',
                            zset: 'Entiers',
                            emptyset: 'Ensemble vide',
                            forall: 'Quel que soit',
                            exists: 'Il existe',
                            nexists: 'Il n\'existe pas',
                            in: 'Appartient',
                            nin: 'N\'appartient pas',
                            subset: 'Est inclus dans (sous-ensemble)',
                            supset: 'Inclut (sur-ensemble)',
                            nsubset: 'N\'est pas inclus dans',
                            nsupset: 'N\'inclut pas',
                            intersection: 'Intersection',
                            union: 'Union',
                            to: 'To',
                            implies: 'Implique',
                            impliedby: 'Implied by',
                            nimplies: 'Not implies',
                            iff: 'Equivalent to'
                        }
                    },
                    matrices: {
                        title: 'Matrices',
                        buttons: {
                            vector: 'Vecteur',
                            widehat: 'Chapeau (angle)',
                            matrix: 'Matrice',
                            pmatrix: 'Matrice avec parenthèses',
                            bmatrix: 'Matrice avec crochets',
                            bbmatrix: 'Matrice with accolades',
                            vmatrix: 'Matrice avec lignes verticales',
                            vvmatrix: 'Matrice à double ligne verticale',
                            column: 'Ajouter un colonne',
                            row: 'Ajouter une rangée'
                        }
                    },
                    statistics: {
                        title: 'Statistiques',
                        buttons: {
                            factorial: 'Factorielle',
                            binomial: 'Combinaison',
                            overline: 'Surlignage (moyenne)'
                        }
                    }
                    /*
					units: {
						title: 'Units',
						buttons: {}
					},
					chemistry: {
						title: 'Chemistry',
						buttons: {}
					}
					*/
                });
        }

        /* kidoju.widgets.mediaplayer */
        if (ui.MediaPlayer) {
            options = ui.MediaPlayer.prototype.options;
            options.messages = $.extend(true, options.messages, {
                play: 'Jouer/Pauser',
                mute: 'Avec/Sans son',
                full: 'Plein écran',
                notSupported: 'Fichier non supporté'
            });
        }

        /* kidoju.widgets.multiinput */
        if (ui.MultiInput) {
            options = ui.MultiInput.prototype.options;
            options.messages = $.extend(true, options.messages, {
                delete: 'Effacer'
            });
        }

        /* kidoju.widgets.multiquiz */
        if (ui.MultiQuiz) {
            options = ui.MultiQuiz.prototype.options;
            options.messages = $.extend(true, options.messages, {
                placeholder: 'Sélectionner...'
            });
        }

        /* kidoju.widgets.navigation */
        if (ui.Navigation) {
            options = ui.Navigation.prototype.options;
            options.messages = $.extend(true, options.messages, {
                empty: 'Rien à afficher'
            });
        }

        /* kidoju.widgets.playbar */
        if (ui.PlayBar) {
            options = ui.PlayBar.prototype.options;
            options.messages = $.extend(true, options.messages, {
                empty: 'Rien à afficher',
                page: 'Page',
                of: 'de {0}',
                first: 'Aller à la première page',
                previous: 'Aller à la page précédente',
                next: 'Aller à la prochaine page',
                last: 'Aller à la dernière page',
                refresh: 'Rafraichîr',
                morePages: 'Plus de pages'
            });
        }

        /* kidoju.widgets.propertygrid */
        if (ui.PropertyGrid) {
            options = ui.PropertyGrid.prototype.options;
            options.messages = $.extend(true, options.messages, {
                property: 'Propriété',
                value: 'Valeur'
            });
        }

        /* kidoju.widgets.quiz */
        if (ui.Quiz) {
            options = ui.Quiz.prototype.options;
            options.messages = $.extend(true, options.messages, {
                optionLabel: 'Sélectionner...'
            });
        }

        /* kidoju.widgets.rating */
        /*
         if (ui.Rating) {
             options = ui.Rating.prototype.options;
         options.messages = $.extend(true, options.messages, {
                // TODO
            });
         }
         */

        /* kidoju.widgets.social */
        if (ui.Social) {
            options = ui.Social.prototype.options;
            options.messages = $.extend(true, options.messages, {
                classroom: 'Partager sur Google Classroom',
                facebook: 'Partager sur Facebook',
                google: 'Partager sur Google+',
                linkedin: 'Partager sur LinkedIn',
                pinterest: 'Partager sur Pinterest',
                twitter: 'Partager sur Twitter'
            });
        }

        /* kidoju.widgets.stage */
        if (ui.Stage) {
            options = ui.Stage.prototype.options;
            options.messages = $.extend(true, options.messages, {
                contextMenu: {
                    delete: 'Supprimer',
                    duplicate: 'Dupliquer'
                },
                noPage: 'Veuillez ajouter ou sélectionner une page'
            });
        }

        /* kidoju.widgets.styleeditor */
        if (ui.StyleEditor) {
            options = ui.StyleEditor.prototype.options;
            options.messages = $.extend(true, options.messages, {
                columns: {
                    name: 'Nom',
                    value: 'Valeur'
                },
                toolbar: {
                    create: 'Nouveau',
                    destroy: 'Effacer'
                },
                validation: {
                    name: 'Nom de style manquant',
                    value: 'Valeur manquante'
                }
            });
        }

        /* kidoju.widgets.toolbox */
        /*
         if (ui.ToolBox) {
            options = ui.ToolBox.prototype.options;
            options.messages = $.extend(true, options.messages, {
                // TODO
            });
         }
         */

        /**
         * kidoju.data & kidoju.tools
         */

        if (window.kidoju) {

            var kidoju = window.kidoju;
            var adapters = kidoju.adapters;
            var data = kidoju.data;
            var tools = kidoju.tools;
            var Tool = kidoju.Tool;
            var attributes;
            var properties;

            if (adapters && adapters.CharGridAdapter) {
                adapters.CharGridAdapter.prototype.messages = {
                    layout: '<h3>Concevez la grille</h3><p>Chaque caractère saisi dans la grille est verrouillé et ne peut être modifié  en mode d\'exécution.</p><p>Utilisez le caractère `{0}` pour désigner les cellules vides.</p>',
                    solution: '<h3>Saisissez la solution</h3><p>Utilisez les caractères autorisés de la liste blanche, i.e. `{0}`.</p>'
                };
            }

            /*
            if (data && data.PageComponent) {
                data.PageComponent.prototype.messages = {
                }
            }
            */

            if (data && data.Page) {
                data.Page.prototype.messages = {
                    emptyPage: 'La page {0} ne doit pas être vide.',
                    minConnectors: 'Au moins {0} Connecteurs sont nécessaires pour faire une question en page {1}.',
                    missingDraggable: 'Des Étiquettes et Images déplaçables sont requis pour la/les Zone(s) de Dépôt en page {0}.',
                    missingDropZone: 'Une Zone de Dépôt est requise pour les Étiquettes et Images déplaçables en page {0}.',
                    missingLabel: 'Une Étiquettes est recommandée en page {0}.',
                    missingMultimedia: 'Un élément multimédia (Image, Audio, Vidéo) est recommandé en page {0}.',
                    missingQuestion: 'Une question est recommandé en page {0}.',
                    missingInstructions: 'Des instructions sont recommandées en page {0}.',
                    missingExplanations: 'Des explications sont recommandées en page {0}.'
                };
            }

            if (data && data.Stream) {
                data.Stream.prototype.messages = {
                    duplicateNames: 'Supprimez les composants utilisant le même nom `{0}` en pages {1}',
                    minPages: 'Il faut au moins {0} pages pour pouvoir publier.',
                    minQuestions: 'Il faut au moins {0} questions pour pouvoir publier.',
                    typeVariety: 'On recommande l\'usage d\'au moins {0} types de questions (Choix Multiple, Boîte de Texte, Connecteurs ou autre).',
                    qtyVariety: 'On recommande plus de variété quand {0:p0} des questions sont du type {1}.'
                };
            }

            // if (kidoju.Tool instanceof Function) {
            if (Tool && Tool.constructor && Tool.constructor.name === 'Function') {
                Tool.prototype.i18n = $.extend(true, Tool.prototype.i18n, {
                    tool: {
                        top: { title: 'Pos. Haut' },
                        left: { title: 'Pos. Gauche' },
                        height: { title: 'Hauteur' },
                        width: { title: 'Largeur' },
                        rotate: { title: 'Rotation' }
                    },
                    dialogs: {
                        ok: { text: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK' },
                        cancel: { text: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Annuler' }
                    },
                    messages: {
                        invalidAltText: 'Un(e) {0} en page {1} nécessite un texte alternatif dans les attributs d\'affichage.',
                        invalidAudioFile: 'Un(e) {0} en page {1} nécessite un fichier mp3 dans les attributs d\'affichage.',
                        invalidColor: 'Un(e) {0} on page {1} a une couleur invalide dans les attributs d\'affichage.',
                        invalidData: 'Un(e) {0} en page {1} nécessite des valeurs dans les attributs d\'affichage.',
                        invalidDescription: 'Un(e) {0} nommé(e) `{1}` en page {2} nécessite une question dans la logique de test.',
                        invalidDropValue: 'Une {0} en page {1} nécessite une valeur de dépôt dans la logique de test.',
                        invalidFailure: 'Un(e) {0} nommé(e) `{1}` en page {2} a un score d\'échec supérieur au score d\'omission ou zéro dans la logique de test.',
                        invalidFormula: 'Un(e) {0} on page {1} nécessite une formule dans les attributs d\'affichage.',
                        invalidImageFile: 'Un(e) {0} en page {1} nécessite un fichier image dans les attributs d\'affichage.',
                        invalidName: 'Un(e) {0} nommé(e) `{1}` on page {2} a un nom invalide.',
                        invalidSolution: 'Un(e) {0} nommé(e) `{1}` en page {2} nécessite une solution dans la logique de test.',
                        invalidStyle: 'Un(e) {0} en page {1} a un style invalide dans les attributs d\'affichage.',
                        invalidSuccess: 'Un(e) {0} nommé(e) `{1}` en page {2} a un score de succès inférieur au score d\'omission ou zéro dans la logique de test.',
                        invalidText: 'Un(e) {0} en page {1} nécessite un texte dans les attributs d\'affichage.',
                        invalidValidation: 'Un(e) {0} nommé(e) `{1}` en page {2} nécessite une formule de validation dans la logique de test.',
                        invalidVideoFile: 'Un(e) {0} en page {1} nécessite un fichier mp4 dans les attributs d\'affichage.'
                    }
                });
            }

            if (tools instanceof kendo.Observable) {

                if (tools.audio instanceof Tool) {
                    // Description
                    tools.audio.constructor.prototype.description = 'Lecteur Audio';
                    // Attributes
                    attributes = tools.audio.constructor.prototype.attributes;
                    attributes.autoplay.title = 'Auto.';
                    attributes.mp3.title = 'Fichier MP3';
                    attributes.ogg.title = 'Fichier OGG';
                }

                if (tools.chart instanceof Tool) {
                    // Description
                    tools.chart.constructor.prototype.description = 'Diagramme';
                    // Attributes
                    attributes = tools.chart.constructor.prototype.attributes;
                    attributes.type.title = 'Type';
                    attributes.title.title = 'Titre';
                    attributes.categories.title = 'Catégories';
                    attributes.values.title = 'Valeurs';
                    attributes.legend.title = 'Légende';
                    attributes.data.title = 'Données';
                    attributes.style.title = 'Style';
                }

                if (tools.chargrid instanceof Tool) {
                    // Description
                    tools.chargrid.constructor.prototype.description = 'Character Grid';
                    // Attributes
                    attributes = tools.chargrid.constructor.prototype.attributes;
                    attributes.blank.title = 'Vide';
                    attributes.columns.title = 'Colonnes';
                    attributes.layout.title = 'Mise en Page';
                    attributes.rows.title = 'Lignes';
                    attributes.whitelist.title = 'Caractères';
                    attributes.gridFill.title = 'Fond de Grille';
                    attributes.gridStroke.title = 'Contour de Grille';
                    // blankFill = gridStroke
                    attributes.selectedFill.title = 'Fond Sélectionné';
                    attributes.lockedFill.title = 'Fond Vérouillé';
                    // lockedColor = valueColor = fontColor
                    attributes.fontColor.title = 'Couleur Police';
                    // Properties
                    properties = tools.chargrid.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                }

                if (tools.connector instanceof Tool) {
                    // Description
                    tools.connector.constructor.prototype.description = 'Connecteur';
                    // Attributes
                    attributes = tools.connector.constructor.prototype.attributes;
                    attributes.color.title = 'Couleur';
                    // Properties
                    properties = tools.connector.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                    properties.disabled.title = 'Désactivé';
                }

                if (tools.dropzone instanceof Tool) {
                    // Description
                    tools.dropzone.constructor.prototype.description = 'Zone de Dépot';
                    // Attributes
                    attributes = tools.dropzone.constructor.prototype.attributes;
                    attributes.center.title = 'Centrer';
                    attributes.text.defaultValue = false;
                    attributes.style.title = 'Style';
                    attributes.text.title = 'Texte';
                    attributes.text.defaultValue = 'Veuillez déposer ici.';
                    // Properties
                    properties = tools.dropzone.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                    properties.disabled.title = 'Désactivé';
                }

                if (tools.image instanceof Tool) {
                    // Description
                    tools.image.constructor.prototype.description = 'Image';
                    // Attributes
                    attributes = tools.image.constructor.prototype.attributes;
                    attributes.alt.title = 'Texte';
                    attributes.alt.defaultValue = 'Image';
                    attributes.src.title = 'Source';
                    attributes.src.defaultValue = 'cdn://images/o_collection/svg/office/painting_landscape.svg';
                    attributes.style.title = 'Style';
                    // Properties
                    properties = tools.image.constructor.prototype.properties;
                    properties.draggable.title = 'Déplaçable';
                    properties.dropValue.title = 'Valeur';
                }

                if (tools.imageset instanceof Tool) {
                    // Description
                    tools.imageset.constructor.prototype.description = 'Image';
                    // Attributes
                    attributes = tools.imageset.constructor.prototype.attributes;
                    attributes.style.title = 'Style';
                    attributes.data.title = 'Images';
                    attributes.data.defaultValue = [{ text: 'Image set', image: 'cdn://images/o_collection/svg/office/photos.svg' }];
                    // Properties
                    properties = tools.imageset.constructor.prototype.properties;
                    properties.name.title = 'Name';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Success';
                    properties.failure.title = 'Failure';
                    properties.omit.title = 'Omit';
                }

                if (tools.label instanceof Tool) {
                    // Description
                    tools.label.constructor.prototype.description = 'Étiquette';
                    // Attributes
                    attributes = tools.label.constructor.prototype.attributes;
                    attributes.style.title = 'Style';
                    attributes.text.title = 'Texte';
                    attributes.text.defaultValue = 'Label';
                    // Properties
                    properties = tools.label.constructor.prototype.properties;
                    properties.draggable.title = 'Déplaçable';
                    properties.dropValue.title = 'Valeur';
                }

                if (tools.mathexpression instanceof Tool) {
                    // Description
                    tools.mathexpression.constructor.prototype.description = 'Expression Mathématique';
                    // Attributes
                    attributes = tools.mathexpression.constructor.prototype.attributes;
                    attributes.formula.title = 'Formule';
                    attributes.formula.defaultValue = '\\sum_{n=1}^{\\infty}2^{-n}=1';
                    attributes.inline.title = 'Aligné';
                    attributes.inline.defaultValue = false;
                    attributes.style.title = 'Style';
                }

                if (tools.multiquiz instanceof Tool) {
                    // Description
                    tools.multiquiz.constructor.prototype.description = 'Question à Choix Multiple';
                    // Attributes
                    attributes = tools.multiquiz.constructor.prototype.attributes;
                    attributes.data.title = 'Valeurs';
                    attributes.data.defaultValue = [{ text: 'Option 1', image: 'cdn://images/o_collection/svg/office/hand_count_one.svg' }, { text: 'Option 2', image: 'cdn://images/o_collection/svg/office/hand_point_up.svg' }];
                    attributes.groupStyle.title = 'Style Groupe';
                    attributes.itemStyle.title = 'Style Element';
                    attributes.mode.title = 'Mode';
                    attributes.selectedStyle.title = 'Style Sélection';
                    attributes.shuffle.title = 'Mélanger';
                    // Properties
                    properties = tools.multiquiz.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                }

                if (tools.quiz instanceof Tool) {
                    // Description
                    tools.quiz.constructor.prototype.description = 'Question à Choix Unique';
                    // Attributes
                    attributes = tools.quiz.constructor.prototype.attributes;
                    attributes.data.title = 'Valeurs';
                    attributes.data.defaultValue = [{ text: 'Vrai', image: 'cdn://images/o_collection/svg/office/ok.svg' }, { text: 'Faux', image: 'cdn://images/o_collection/svg/office/error.svg' }];
                    attributes.groupStyle.title = 'Style Groupe';
                    attributes.itemStyle.title = 'Style Element';
                    attributes.mode.title = 'Mode';
                    attributes.selectedStyle.title = 'Style Sélection';
                    attributes.shuffle.title = 'Mélanger';
                    // Properties
                    properties = tools.quiz.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                }

                if (tools.selector instanceof Tool) {
                    // Description
                    tools.selector.constructor.prototype.description = 'Selecteur';
                    // Attributes
                    attributes = tools.selector.constructor.prototype.attributes;
                    attributes.color.title = 'Couleur';
                    attributes.shape.title = 'Forme';
                    // Properties
                    properties = tools.selector.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                    properties.disabled.title = 'Désactiver';
                }

                if (tools.table instanceof Tool) {
                    // Description
                    tools.table.constructor.prototype.description = 'Table Statique';
                    // Attributes
                    attributes = tools.table.constructor.prototype.attributes;
                    attributes.columns.title = 'Colonnes';
                    attributes.rows.title = 'Lignes';
                    attributes.data.title = 'Données';
                }

                if (tools.textarea instanceof Tool) {
                    // Description
                    tools.textarea.constructor.prototype.description = 'Aire de Texte';
                    // Attributes
                    attributes = tools.textarea.constructor.prototype.attributes;
                    attributes.style.title = 'Style';
                    // Properties
                    properties = tools.textarea.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                }

                if (tools.textbox instanceof Tool) {
                    // Description
                    tools.textbox.constructor.prototype.description = 'Boîte de Texte';
                    // Attributes
                    attributes = tools.textbox.constructor.prototype.attributes;
                    attributes.mask.title = 'Masque';
                    attributes.style.title = 'Style';
                    // Properties
                    properties = tools.textbox.constructor.prototype.properties;
                    properties.name.title = 'Nom';
                    properties.question.title = 'Question';
                    properties.solution.title = 'Solution';
                    properties.validation.title = 'Validation';
                    properties.success.title = 'Succès';
                    properties.failure.title = 'Échec';
                    properties.omit.title = 'Omission';
                    properties.disabled.title = 'Désactivé';
                }

                if (tools.video instanceof Tool) {
                    // Description
                    tools.video.constructor.prototype.description = 'Lecteur Vidéo';
                    // Attributes
                    attributes = tools.video.constructor.prototype.attributes;
                    attributes.autoplay.title = 'Auto.';
                    attributes.toolbarHeight.title = 'Haut. Commandes';
                    attributes.mp4.title = 'Fichier MP4';
                    attributes.ogv.title = 'Fichier OGV';
                    attributes.wbem.title = 'Fichier WBEM';
                }
            }

        }

    })(window.kendo.jQuery);

    /* jshint +W074 */
    /* jshint +W071 */

    return window.kendo;

}, __webpack_require__(0));


/***/ })

});
//# sourceMappingURL=app.culture.fr.chunk.js.map?v=0.3.4