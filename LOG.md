#### Day 1 
grid gebouwd. kleurstelling bepaald.
Het plan is om onhover twee pijltjes weer te geven naar boven en naar beneden of L en R. en dat mooi te animeren.
Klik op linker helft van het element stuurt de auto naar links.

Probleem: webpack bundelt de ts files opeens niet meer...
Wellicht omdat sass ook de distfolder aanspreekt?

#### Day 2
- De build configuratie gelijk getrokken met het template project zodat alles weer werkt.
- Styling van de pijltjes op de auto's gefixed
todo:
  - get rid of the origin and create a new repo
  - figure out where on the tile the mouse is and where the user wants to move to.

#### 14 APR
Er ontbreken een groot aantal logs. 
Ik heb vandaag in ieder geval een grote refactoring gedaan.
Ik had het al voor elkaar om blokjes over het grid te kunnen schuiven
d.m.v. de pijltjes, alleen het probleem was dat de blokjes alleen
maar konden verschuiven als enkel blokje. En voor de app is het een requirement
om auto's van meerdere blokjes groot te hebben. En dat die alleen maar horizontaal
of vertikaal kunnen bewegen. 
Hiervoor heb ik het hele lees en schrijf proces moeten omgooien. 
Nu wordt er eerst een Collection<GridItem> gelezen. Die wordt vervolgens naar een 
Collection<Car> gemapt. De business rules voor of een auto mag bewegen moet nog 
herschreven worden. Daarna wordt de lijst aan auto's weer terug gemapt naar een 
Collection<GridItems> en vervolgens weer naar HTML. 

Kortom: bijna alle state van de app bevind zich in de HTML. 

TODO:
- mag wel/niet verplaatsen logica refactoren
- zorgen dat een auto al zijn blokjes mee beweegt
- tests fixen
- pijltjes in de correcte directie fixen.
