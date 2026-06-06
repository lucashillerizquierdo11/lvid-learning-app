// Investeringsbegrepp grupperade efter användningsområde i aktieanalys
// Alla är förklaringskort (noFill: true) – svaret är en mening, så de hoppas över i Fylla i.
export const investering = {
  'Grundläggande': [
    { title: 'Aktiekurs', definition: 'Priset på en aktie just nu, som du ser i t.ex. Avanza. Kostar en aktie 100 kr är kursen 100 kr. Inte nödvändigtvis samma som vad bolaget är "värt" på riktigt.', difficulty: 'lätt', noFill: true },
    { title: 'Börsvärde', definition: 'Hur mycket hela bolaget är värt enligt börsen: aktiekursen gånger antalet aktier. Om 1 leksak kostar 10 kr och det finns 1 000 leksaker är marknadsvärdet 10 000 kr.', difficulty: 'lätt', noFill: true },
    { title: 'Utveckling (1 år)', definition: 'Grafen visar hur aktien klättrat eller sjunkit under ett år. Går linjen uppåt har aktien gått upp.', difficulty: 'lätt', noFill: true },
    { title: 'Vinst per aktie (EPS)', definition: 'Hur mycket pengar bolaget tjänat per aktie. Tjänade bolaget 1 miljon och har 100 000 aktier blir vinst/aktie 10 kr. Grunden till nyckeltal som P/E.', difficulty: 'medel', noFill: true },
    { title: 'Omsättning per aktie', definition: 'Hur mycket pengar bolaget får in i försäljning per aktie. Högre kan betyda starkare affär, men måste jämföras med vinst/aktie och andra nyckeltal.', difficulty: 'medel', noFill: true },
  ],
  'Värdering': [
    { title: 'P/E-tal (price/earnings)', definition: 'Aktiekursen delat på vinst per aktie. Kurs 100 kr och vinst/aktie 10 kr ger P/E 10 – du betalar "10 årsvinster" för bolaget. Högt P/E = dyrt (eller höga tillväxtförväntningar).', difficulty: 'medel', noFill: true },
    { title: 'P/S-tal (price/sales)', definition: 'Aktiekursen delat på omsättning per aktie. Kurs 100 kr och omsättning/aktie 200 kr ger P/S 0,5. Lågt P/S kan betyda att aktien är billig jämfört med hur mycket bolaget säljer. Bra för bolag utan vinst än.', difficulty: 'medel', noFill: true },
    { title: 'P/B-tal (price/book)', definition: 'Aktiekursen delat på eget kapital per aktie. Kurs 100 kr och eget kapital/aktie 25 kr ger P/B 4. Visar hur mycket du betalar för bolagets bokförda tillgångar. Lågt P/B kan tyda på billig aktie.', difficulty: 'medel', noFill: true },
    { title: 'EV/EBIT', definition: 'Jämför hela bolagets värde (inklusive skulder) med rörelseresultatet (EBIT). Fungerar som P/E men mer komplett eftersom skulder räknas in. Högt EV/EBIT = hög värdering.', difficulty: 'svår', noFill: true },
    { title: 'Direktavkastning', definition: 'Utdelningen per aktie delat på aktiekursen, i procent. Utdelning 5 kr och kurs 200 kr ger 2,5 %. Hög direktavkastning = mer kassa per år, men kan också signalera låg tillväxt.', difficulty: 'medel', noFill: true },
  ],
  'Lönsamhet': [
    { title: 'ROE (Return on Equity)', definition: 'Hur mycket vinst bolaget gör på det egna kapitalet. ROE 15 % = 15 kr vinst per 100 kr eget kapital. Högre är oftast bättre – men bara om det inte uppnåtts via väldigt hög skuldsättning.', difficulty: 'medel', noFill: true },
    { title: 'Vinstmarginal', definition: 'Hur mycket av varje 100 kr i försäljning som blir kvar som vinst. 20 % marginal = 20 kr vinst per 100 kr försäljning. Högre = mer effektiv och lönsam verksamhet.', difficulty: 'medel', noFill: true },
    { title: 'EBITDA', definition: 'Ungefär hur mycket pengar verksamheten genererar före räntor, skatter, av- och nedskrivningar. Ett grovt mått på lönsamhet som låter dig jämföra bolag utan att skulder och skatter stör.', difficulty: 'medel', noFill: true },
    { title: 'CAGR (tillväxt över tid)', definition: 'Genomsnittlig årlig tillväxttakt. Går en aktie från 100 kr till 161 kr på 5 år är CAGR ca 10 %. Visar hur snabbt aktien, vinsten eller omsättningen vuxit per år i snitt.', difficulty: 'svår', noFill: true },
  ],
  'Risk': [
    { title: 'Nettoskuld/EBITDA', definition: 'Hur många år bolaget ungefär behöver för att betala av sina nettoskulder med EBITDA-flödet. Värdet 4 = ca 4 år om allt flöde går till skulder. Hög siffra = högre risk.', difficulty: 'svår', noFill: true },
    { title: 'Beta', definition: 'Hur mycket aktien gungar jämfört med hela börsen. Beta 1 svänger som börsen, beta 2 svänger dubbelt så mycket (högre risk), under 1 lugnare än börsen.', difficulty: 'medel', noFill: true },
  ],
  'Teknisk': [
    { title: 'Glidande medelvärde MA50', definition: 'En linje som visar snittkursen de senaste 50 dagarna. Korsar aktiekursen upp över MA50 kan det vara en kortsiktig köp-signal.', difficulty: 'medel', noFill: true },
    { title: 'Glidande medelvärde MA200', definition: 'En tjockare linje som visar snittkursen de senaste 200 dagarna. Ligger kursen ovanför MA200 säger många att aktien är i "upptrend".', difficulty: 'medel', noFill: true },
    { title: 'RSI (Relative Strength Index)', definition: 'Ett tal mellan 0–100 som visar om aktien är "utmattad". Över ca 70 anses den ofta överköpt (kan falla), under ca 30 översåld (kan studsa upp).', difficulty: 'medel', noFill: true },
    { title: 'MACD', definition: 'Två linjer som jämför kort- och långsiktiga medelkurser. När linjerna korsar uppåt kan det tyda på att aktien börjar stärkas.', difficulty: 'medel', noFill: true },
    { title: 'Trendlinjer (support/motstånd)', definition: 'Linjer på grafen som visar var aktien ofta vänt uppåt (support) och vänt nedåt (motstånd). Bryter kursen upp genom motståndet kan en ny uppgång inledas.', difficulty: 'medel', noFill: true },
    { title: 'Fibonacci-nivåer', definition: 'Givna procentnivåer (38,2 %, 50 %, 61,8 %) som används för att gissa var en aktie kan vända efter en kraftig rörelse. Mest ett kartverktyg för möjliga vändpunkter.', difficulty: 'svår', noFill: true },
    { title: 'Volym (handelsvolym)', definition: 'Hur många aktier som handlas under en dag. Hög volym tillsammans med stor kursrörelse brukar betyda att många är med i rörelsen (starkare signal).', difficulty: 'medel', noFill: true },
    { title: 'RSI-divergens', definition: 'När kursen går upp men RSI går ner (eller tvärtom). Ett motstridigt tecken som kan varna för att trenden är svagare än den ser ut.', difficulty: 'svår', noFill: true },
    { title: 'Candlestick', definition: 'Visar öppning, stängning, högsta och lägsta kurs för en period (dag/timme). En lång grön kropp betyder stark uppgång, en lång röd stark nedgång.', difficulty: 'medel', noFill: true },
    { title: 'Gap-mönster', definition: 'Ett gap uppstår när öppningskursen är mycket högre eller lägre än gårdagens stängning. Tyder ofta på nyhetsdriven handel över natten. Gap kan "fyllas" (gå tillbaka) eller starta en ny trend.', difficulty: 'medel', noFill: true },
  ],
  'Case': [
    { title: 'Bolag A: P/E 8, ROE 18%, skuld låg, vinst stabil', definition: 'Ser billigt och sunt ut. Lågt P/E (8 = ~8 årsvinster) i kombination med hög ROE (18%) och låg skuld är en klassisk "kvalitet till bra pris"-signal. Kontrollfråga: varför är det så billigt? Om inget varningstecken finns kan det vara köpvärt.', difficulty: 'medel', noFill: true },
    { title: 'Bolag B: P/E 9, men vinsten faller 20%/år', definition: 'En möjlig värdefälla (value trap). Lågt P/E ser billigt ut men speglar bara dagens vinst – faller vinsten snabbt blir morgondagens P/E högt. Billigt av en anledning. Lågt P/E är aldrig bra i sig om lönsamheten krymper.', difficulty: 'medel', noFill: true },
    { title: 'Bolag C: ingen vinst än, men omsättning +40%/år, P/S 4', definition: 'Klassiskt tillväxtbolag. P/E går inte att använda (ingen vinst), så P/S blir måttet. P/S 4 är inte lågt, men kan vara rimligt om tillväxten håller. Risken: värderingen bygger helt på framtida vinst som ännu inte finns.', difficulty: 'medel', noFill: true },
    { title: 'Bolag D: ROE 25%, men nettoskuld/EBITDA 5', definition: 'Hög ROE men av fel anledning. ROE 25% imponerar, men nettoskuld/EBITDA 5 (≈5 år att betala av skulden) betyder att avkastningen drivs av hög belåning, inte stark verksamhet. Hög risk om räntor stiger eller vinsten viker.', difficulty: 'svår', noFill: true },
    { title: 'Bolag E: direktavkastning 9%, vinsten täcker knappt utdelningen', definition: 'Varningssignal, inte fynd. Ovanligt hög direktavkastning beror oftast på att kursen fallit kraftigt. Om vinsten knappt räcker till utdelningen är den sannolikt ohållbar och kan sänkas. Hög direktavkastning är ofta en risk, inte en gåva.', difficulty: 'medel', noFill: true },
    { title: 'Bolag F: vinstmarginal 30%, ROE 22%, men P/E 35', definition: 'Toppbolag till högt pris. Stark lönsamhet (marginal 30%, ROE 22%) men du betalar 35 årsvinster. Kvaliteten finns – frågan är om tillväxten motiverar priset. Bra bolag är inte alltid en bra aktie om värderingen redan är hög.', difficulty: 'medel', noFill: true },
    { title: 'Bolag G: P/E 12, P/B 0,7, ROE 5%', definition: 'Billigt men trögt. P/B under 1 betyder att du betalar mindre än bokfört värde – ser ut som fynd. Men låg ROE (5%) säger att bolaget gör dålig avkastning på sitt kapital. Ofta billigt för att verksamheten är svag. Kräver en plan för vad som ska vända.', difficulty: 'svår', noFill: true },
    { title: 'Helhet: hur väger jag ihop talen?', definition: 'Ordning: 1) Värdering – är aktien dyr eller billig (P/E, P/S, P/B)? 2) Lönsamhet – tjänar bolaget bra pengar (ROE, marginal)? 3) Risk – är det farligt skuldsatt (nettoskuld/EBITDA)? 4) Timing – vad säger grafen (MA, RSI)? Inget tal räcker ensamt; styrkan ligger i kombinationen.', difficulty: 'svår', noFill: true },
  ],
};
