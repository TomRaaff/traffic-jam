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
Hiervoor heb ik het hele lees- en schrijf-proces moeten omgooien. 
Nu wordt er eerst een Collection<GridItem> gelezen. Die wordt vervolgens naar een 
Collection<Car> gemapt. De business rules voor of een auto mag bewegen moet nog 
herschreven worden. Daarna wordt de lijst aan auto's weer terug gemapt naar een 
Collection<GridItems> en vervolgens weer naar HTML. 

Kortom: bijna alle state van de app bevind zich in de HTML. 

TODO:
- mag wel/niet verplaatsen logica refactoren
- zorgen dat een auto al zijn blokjes meebeweegt
- tests fixen
- pijltjes in de correcte directie fixen.

#### 21 April
functionaliteit toegevoegd om een grid naar een lijst van auto's toe te mappen

#### 4 Mei
Logs zijn niet compleet.
Checks toegevoegd om te kijken of een auto wel mag bewegen. Hij moet geblokkeerd worden
door de randen van het grid, en er mag geen andere auto staan.
Ook een paar refactorings doorgevoerd op de Maybe wat hem een stuk logischer maakt:
in de getOrElse niet om 2 functies vragen, maar alleen om een functie voor als de waarde niet bestaat.
Ik heb het ook met Jacob gehad over de Either en dat hij een Either hernoemd heeft naar een Result
om beter de intentie er van te kunnen duiden. Either klinkt alsof beide paden goed zijn, maar
mijn implementatie is eigenlijk een unhappy- en een happy-flow. 

De unittests werken ook weer zoals het hoort. Het herschrijven na de grote refactoring
was minder werk dan aanvankelijk gedacht. 

Ook heb ik er voor gezorgd dat de blokjes niet meer 4 pijltjes hebben, maar 2. Echter werkt dat nog 
niet volledig. Bij het klikken op de horizontale pijltjes, worden opeens alle pijltjes op alle
auto's horizontaal. De styling moet ook nog gefixed worden voor de horizontale pijltjes.

#### 5 Mei
Fixed the alignment bug, refactored some functionality and restyled the arrows.
Now the app is actually working correctly. It took me far longer than I imagined and that's partly
because I didn't do enough upfront-design. I came to the conclusion that I actually want the 
interaction with the user to be different. Not based on arrows, but on which part of the car you click.
If I'd have thought about that earlier, it wouldn't have been a big deal. Now, I'm not likely to 
implement it.

TODO:
- Create winning conditions
- Add levels
- Switch levels when winning
- Add a reset button

Nice to have: 
- Change the user-interaction: 
    Instead of having arrows to click on, use the car tiles to determine which way the car goes.

#### 11 Mei
Correctly implemented the winning conditions. 

#### 12 Mei
implemented 6 levels
Also implemented the changing of levels, though I didn't really get around to celebrating
it...
'Falsy' values really bit me in the ass today. Apparently 0 is falsy, so when you map the
value inside a Maybe to a 0, the result will be a None (map creates a new Maybe).
When refactoring the implementation of the Maybe constructor, I ran into the fact that
somewhere it is still possible to create a Some with undefined as it's value. Definitely
a problem. I've been searching for more than an hour, but I can't find the source yet...
Very frustrating...

#### 19 Mei
Finished the project. 
Somewhere in the last days I've found the bug. In the constructor
of the Maybe, I was setting the inner value in a if-style that was based around quick
return statements. But there were no return statements, so I was just overwriting the 
inner value...
Also added a restart level button.

### Lessons learned
- upfront-design is belangrijk.
    Als ik van tevoren had uitgetekend hoe ik het spelletje had willen maken, dan had ik halverwege
    niet een grote refactoring hoeven doen.
- Test driven development heeft mij enorm geholpen in dit proces
- De implementatie van de Maybe, Either en de Collection waren echt brein-brekers
- Erg veel geleerd over DOM-manipulatie.
    - het is lastig om programmatisch, zonder abstracties, het creeeren en wijzigen 
      van html-elementen goed leesbaar te maken.
    - template literals zijn fijn om het leesbaar te maken, maar zijn wel weer lastig
      aan functies toe te wijzen die niet in de file zelf staan. (Die moet je namelijk
      globaal maken...)
- Het is mogelijk om de volledige state van een app in de html te houden.
  Ik heb echter nog niet de grens bereikt tot waar dit nog logisch/onderhoudbaar blijft.
