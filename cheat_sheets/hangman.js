/* 
    * Deleksamen4 - Spillutvikling
    * Innføring i programmering
    * Hangman  
    * HIOF
    * Trond Vebjørn Omberg, 193211
*/ 

/* Deklarere variabler og klargjøre spillet */

window.onload = function() {
    
    // Lage en array som inneholder verdiene til alfabetet a-å :

    var myAlphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',                // alfabetet fra a - å
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','æ','ø','å'
    ];

    // Opprette variablene som skal tas i bruk :

    var wordsList;                                                                      // Array med ord som skal gjettes
    var guessedLetter;                                                                  // Gjetting av bokstaver
    var guessedLetterArray = [];                                                        // Lagre de gjettede bokstavene
    var emptySpace;                                                                     // Plassen mellomrommet i ordet tar, hvis noen
    var selectedWord;                                                                   // Tilfeldig valgt ord

    // Hent elementer :
    
    var showCurrentLives = document.getElementById("showMyLives");                      // Vis liv

    // Opprette alfabetet som individuelle knapper :

    var buttons = function() {
        myButtons = document.getElementById("buttons");                                 // Hente området jeg vil ha knappene i
        letters = document.createElement("ul");                                         // lage en ul-liste som skal motta li elementer

        // Gå igjennom arrayen myAlphabet og lage en knapp for enhver verdi
        for(var i = 0; i < myAlphabet.length; i++) {
            letters.id = "myAlphabet";                                                  // Legge ved id til bokstavene
            list = document.createElement("li");                                        // Lage liste elementer med <li>
            list.id = "letter";                                                         // Gi hver bokstav id letter
            list.innerHTML = myAlphabet[i];                                             // Innholdet i listen er tellingen i
            checkLetter();                                                              // Kalle på funksjonen checkLetter
            myButtons.appendChild(letters);                                             // Plassere listen i div-en "buttons"
            letters.appendChild(list);                                                  // Plassere bokstavene i listen
        } // for-loop  
    };

   
    // Opprette elementer for guessedLetter :
    displaySelectedWord = function() {
        wordHolder = document.getElementById("selectedWordHolder");                     // Hente elementet som holder løsningsordet
        correctLetter = document.createElement("ul");                                   // Lage ul til correctLetter

        // Gå igjennom lengden av ordet
        for( var i = 0; i < selectedWord.length; i++) {                 
            correctLetter.setAttribute("id", "chosenWord");                             // Sette attributter på ordet
            guessedLetter = document.createElement("li");                               // Lage liste-element til hver bokstav
            guessedLetter.setAttribute("class", "guessedLetter");                       // Sette attributter på bokstavene

            //visningen av bokstaver som skal gjettes
            if(selectedWord[i] === "-") {                                               // Hvis ordet har mellomrom
                guessedLetter.innerHTML = "-";                                          // Skal det vises med binnestrek
                emptySpace = 1;                                                         // Med en egen verdi kaldt spce
            } else {
                guessedLetter.innerHTML = "_";                                          // Ellers skal fremvisningen bestå av understreker
            } // if-else

            guessedLetterArray.push(guessedLetter);                                     // Pushe bokstavene
            wordHolder.appendChild(correctLetter);                                      // Plassere correctLetter i wordHolder
            correctLetter.appendChild(guessedLetter);                                   // Plassere gjettet bokstav i correctLetter
        }// for-loop
    };

    // Vis liv :

    updateLives = function() {
        showCurrentLives.innerHTML = "Du har " + lives + " liv";                        // Vise hvor mange liv du har
        //if-test for å sjekke om spillet et tapt eller vunnet
        if(lives < 1) {                                                                 // Hvis du har mindre liv enn 1
            showCurrentLives.innerHTML = "Game Over";                                   // Får du Game Over
        }
        //for-loop for å telle om alle bokstavene er gjettet
        for(var i = 0; i < guessedLetterArray.length; i++) {
            if(counter + emptySpace === guessedLetterArray.length) {                    // Hvis alle bokstavene er gjettet
                showCurrentLives.innerHTML = "Du vinner!";                              // Vinner man spillet
            }
        }
    };

    /* Hente canvas og tegne mannen */

    // Oppdater Canvas :
    var updateCanvas = function() {                                          
        var addLine = lives;                                                            // Opprette en variabel som har lik verdi som lives
        drawBodypartsArray[addLine]();                                                  // Kalle på arrayen som har elementene som skal tegnes
    };

    // Hangman: Canvas og streker :
    canvas = function() {
        myCanvas = document.getElementById('playboard');                                // Hente canvas som skal tegnes i
        ctx = myCanvas.getContext('2d');                                                // Hente contexten av canvas, som er 2d
        ctx.beginPath();                                                                // Starte tegningen
        ctx.strokeStyle = "black";                                                      // Farge strekene svart
        ctx.lineWidth = 2;                                                              // Bredden på strekene
    };

    // Tegne hodet : 
    head = function() {
        myCanvas = document.getElementById('playboard');                                // Hente canvas som skal tegnes i
        ctx = myCanvas.getContext('2d');                                                // Hente contexten av canvas siom er 2d
        ctx.beginPath();                                                                // Starte tegning
        ctx.arc(150, 80, 20, 0, Math.PI * 2, true);                                     // Lage en sirkel
        ctx.stroke();                                                                   // Slå strek
    };

    gallow = function() {                                                               // Galge (Kan forbedres siden det er mange like elementer)
        ctx.moveTo(10, 350);
        ctx.lineTo(250, 350);                                                           // Strek 1

        ctx.moveTo(10, 250);
        ctx.lineTo(100, 350);                                                           // Strek 2

        ctx.moveTo(10, 350);
        ctx.lineTo(10, 10);                                                             // Strek 3

        ctx.moveTo(10, 60);
        ctx.lineTo(80, 10);                                                             // Strek 4

        ctx.moveTo(10, 10);
        ctx.lineTo(150, 10);                                                            // Strek 5

        ctx.moveTo(150, 10);
        ctx.lineTo(150, 60);                                                            // Strek 6
        
        ctx.stroke();                                                                   // Slå strek
    };

    torso = function() {                                                                // Kropp
        ctx.moveTo(150, 100);
        ctx.lineTo(150, 150);
        ctx.stroke();
    };

    rightArm = function() {                                                             // Høyre arm
        ctx.moveTo(150, 100);
        ctx.lineTo(200, 120);
        ctx.stroke();
    };

    leftArm = function() {                                                              // Venstre arm
        ctx.moveTo(150, 100);
        ctx.lineTo(100, 120);
        ctx.stroke();
    };

    rightLeg = function() {                                                             // Høyre ben
        ctx.moveTo(150, 150);
        ctx.lineTo(200, 220);
        ctx.stroke();
    };

    leftLeg = function() {                                                              // Venstre ben
        ctx.moveTo(150, 150);
        ctx.lineTo(100, 220);
        ctx.stroke();
    };

    drawBodypartsArray = [                                                              // Array med hva som skal tegnes
        rightLeg,
        leftLeg,
        rightArm,
        leftArm,
        torso,
        head
    ];

    //onClick funksjon
    checkLetter = function() {
        list.onclick = function() {                                                     // Når du trykker på alfabet-elementene
            var guessedLetter = this.innerHTML;
            this.setAttribute("class", "clicked");                                      // Sette attributtene class og clicked for å navngi klassen dens "clicked"
            this.onclick = null;                                                        // Deaktivere knappen når den er blitt trykket

            for(var i = 0; i < selectedWord.length; i++) {                              // Gå igjennom det valgte ordet
                if(selectedWord[i] === guessedLetter) {                                 // Hvis bokstavene i det valgte ordet finnes blandt de gjettede bokstavene
                    guessedLetterArray[i].innerHTML = guessedLetter;                    // skal bokstaven vises istedenfor understrek
                    counter += 1;                                                       // Telleren plusser på 1
                }
            }
            var j = selectedWord.indexOf(guessedLetter);                
            if(j === -1) {                                                              // Hvis du mister ett prong
                lives -= 1;                                                             // Trekkes 1 fra lives
                updateLives();                                                          // Oppdater visningen av liv
                updateCanvas();                                                         // Oppdater tegningen
            }else {
                updateLives();                                                          // Oppdater visningen av liv
            }
        }; // list.onclick
    };

    // Velge et tilfeldig ord fra wordsList-arrayen :

    playGame = function() {                                                             // Hovedfunksjonen til spillet

        wordsList = [                                                                   // Opprette arrayen som inneholder løsningsord
            "inkrementering",
            "konkatinering",
            "javascript",
            "kodeeditor",
            "filstruktur",
            "utvikling",
            "animasjon",
            "brukerinput",
            "tastaturknapp",
            "planleggingsfase"
            ];                                                          

        selectedWord = wordsList[Math.floor(Math.random() * wordsList.length)];         // Bruke matte til å finne et tilfeldig ord
        //console.log(selectedWord);

        guessedLetterArray = [];                                                        // Resette guessedLetterArray
        lives = 6;                                                                      // Resette liv
        counter = 0;                                                                    // Resette counter
        emptySpace = 0;                                                                 // Resette mellomrommene i ordet
        buttons();                                                                      // Kalle på kanppene
        displaySelectedWord();                                                          // Kalle på displaySelectedWord
        updateLives();                                                                  // Kalle på updateLives
        canvas();                                                                       // Kalle på canvas
        gallow();                                                                       // Tegne galgen inn i canvas
    };

    playGame();                                                                         // Kalle på funksjonen playGame

    // Reset

    document.getElementById("reset").onclick = function() {                             // Hente ID fra "Spill igjen" knappen
        correctLetter.parentNode.removeChild(correctLetter);                            // Fjerne innholdet
        letters.parentNode.removeChild(letters);                                        // Fjerne innholdet
        ctx.clearRect(0, 0, 700, 400);                                                  // Resette contexten i canvas
        playGame();                                                                     // Kalle på funksjonen playGame
    };
}; // function