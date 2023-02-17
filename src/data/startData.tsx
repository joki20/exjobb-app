/**
 * Det intressanta är projekt som har lagts på en aktivitet.
 * Man behöver fylla i hur många timmar en dag man jobbat med en aktivitet.
 * Man vill ha totalsumman på hur många timmar som lagts på ett 
 * projekt av alla personer.
 * 
 * Varje person ska kunna se antal nedlagda timmar på ett visst projekt
 * och även ifall den haft alldeles för många projekt så den fått jobba 
 * massa övertid.
 * 
 * Chefen ska också ha lite koll på det där så inte några är överbelastade.
 * 
 * Så var och en bör kunna se sina nedlagda timmar och var
 * Chefen bör kunna se totalen (om det finns lediga resurser nånstans) och varje enskild resurs
 * 
 * Gärna grafiskt om möjligt.
 * 
 * Bästa om det är olika färger: grönt om det är 80% av tillgänglig tid
 * Över 80 upp till 100% är gult
 * Över 100% tillgänglig är rött (att man jobbat övertid, alltså använt mer än tillgänglig tid av resurs)
 * Detta kan man göra både på personnivå (t ex Per, som jobbat 50h ist för 40h = rött)
 * 
 * I planeringen och analysen så ska man kunna se att det är ett 
 * mellanrum där en viss resurs är fri, och kan beläggas på annat.
 * Det behöver inte vara personer, kan även vara
 * provutrustning som lagts på en
 * 
 * T ex man klickar på ett projekt, och sedan skriver i hur många timmar man lagt ner på det
 * T ex jobbar man bara på två projekt, så ska de synas.
 * Chefen fyller i vilka projekt som ska finnas och hos vilka användare
 * 
 * Har man inte varit inne i ett projekt på en vecka kanske inte det ska visas först
 * Projekt 1
 * Projekt 2
 * Projekt 3
 * Projekt 4
 * Projekt 5
 * 
 * Behövs inte visas fler för att visa principen.
 * 
 * klicka på projektet och fyllt i timmarna (8h normaltid) för dagen
 * Om man fyllt i 6h på ett projekt så ska det finnas 2h ytterligare att fördela
 * Så man inte kan 8h på ett projekt till
 * 
 * nästa gång man startar appen kommer den förhoppningsvis vilken user
 * 
 * på tiden behöver man inte vara så noggrann att det är vissa klockslag
 * räcker att det är antal timmar. Kanske decimal som t ex 4,5h
 * 
 * Om man har glömt att rapportera under gårdagen så ska man kunna fylla i det med
 * notes kanske nödvändigt om man har en viss komponent inom uppdraget man jobbar med
 * Annars kanske inte den behövs.
 * 
 * Två nivåer: hela projektet jobbat 3 veckor, så gjort 4 komponenter som tagit olika lång tid i samma projekt
 * T ex 8h på projektet, varav 3h en ritning och 5h en annan ritning
 * Respektive konstruktör skulle kunna hålla koll på det, ha ritningsnumret som referens
 * Jag skulle kunna tänka på att det skulle kunna gå att ha en undernivå i framtiden
 */

export const startData:any = {
    users: [
        {
            username: 'user',
            password: 'pass',
            projects: ['projekt1', 'projekt2', 'projekt3', 'projekt4', 'projekt5', 'projekt6'],
            entries: [
                {
                    date: '2023-02-06',
                    duration: [
                        '5 projekt1',
                        '3 projekt2' 
                    ],
                    away: 0
                },
                {
                    date: '2023-02-07',
                    duration: [
                        '2 projekt1',
                        '6 projekt3' 
                    ],
                    away: 0
                },
                {
                    date: '2023-02-08',
                    duration: [
                        '2 projekt4',
                        '6 projekt5' 
                    ],
                    away: 2
                }
            ]
        }
    ]
}
