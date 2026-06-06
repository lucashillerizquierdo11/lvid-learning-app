import { sport } from './sportData';
import { film } from './filmData';
import { investering } from './investeringData';
import { politik } from './politikData';
import { lvid } from './lvidData';

export const categories = {
  musik: { name: 'Musik', color: '#a78bfa' },
  film,
  sport: { name: 'Sport', color: '#fb923c' },
  lvid: { name: 'Lvid', color: '#60a5fa' },
  investering: { name: 'Investering', color: '#a3e635' },
  studier: { name: 'Studier', color: '#fbbf24' },
  politik: { name: 'Politik', color: '#818cf8' },
  kemi: { name: 'Kemi', color: '#2dd4bf' },
  biologi: { name: 'Biologi', color: '#f87171' },
  vokabular: { name: 'Vokabulär', color: '#f472b6' },
  historia: { name: 'Historia', color: '#c084fc' },
};

export const subcatMap = {
  musik: ['Artister', 'Album', 'Genrer'],
  film: ['Handlingar', 'Citat', 'Karaktärer', 'Skådespelare'],
  sport: ['Basket', 'Golf', 'Positioner', 'Stjärnspelare (färskvara)', 'Allsvenskan', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Hammarby (trupp)'],
  lvid: ['Termer'],
  investering: ['Grundläggande', 'Värdering', 'Lönsamhet', 'Risk', 'Teknisk', 'Case'],
  studier: ['Tekniker', 'Anteckningar'],
  politik: ['Huvudstäder', 'Valutor', 'Språk', 'Statsskick', 'Sevärdheter', 'Ledare (färskvara)'],
  kemi: ['Grundämnen', 'Formler', 'Reaktioner'],
  biologi: ['Cellbiologi', 'Genetik', 'Ekologi'],
  vokabular: ['Engelska', 'Franska', 'Spanska'],
  historia: ['Antiken', 'Medeltiden', 'Modern'],
};

export const initialData = {
  sport,
  film,
  investering,
  politik,
  lvid,
  kemi: {
    'Grundämnen': [
      { title: 'H', definition: 'Väte – atomnummer 1, lättaste elementet', difficulty: 'lätt' },
      { title: 'O', definition: 'Syre – atomnummer 8, essentiellt för andning', difficulty: 'lätt' },
      { title: 'C', definition: 'Kol – atomnummer 6, bas för all organisk kemi', difficulty: 'medel' },
    ],
    'Formler': [
      { title: 'H2O', definition: 'Vatten – två väte och en syreatom', difficulty: 'lätt' },
      { title: 'NaCl', definition: 'Natriumklorid (salt) – jonisk förening', difficulty: 'medel' },
    ],
  },
  biologi: {
    'Cellbiologi': [
      { title: 'Mitokondrie', definition: 'Cellens kraftverk – producerar ATP för energi', difficulty: 'medel' },
      { title: 'Ribosomer', definition: 'Proteinsyntes-maskineri i cellen', difficulty: 'medel' },
    ],
  },
  film: {
    'Handlingar': [
      { title: 'The Shawshank Redemption', definition: 'En oskyldigt dömd man bygger ett nytt liv och en livslång vänskap i fängelset.', difficulty: 'medel' },
      { title: 'Moonlight', definition: 'En ung man växer upp genom tre faser av livet medan han kämpar med identitet, kärlek och tystnad.', difficulty: 'medel' },
      { title: 'Interstellar', definition: 'En grupp astronauter reser genom rymden för att hitta en ny framtid för mänskligheten.', difficulty: 'medel' },
      { title: 'Harakiri', definition: 'En samuraj söker rättvisa och avslöjar hyckleri och brutalitet i ett feodalt system.', difficulty: 'svår' },
      { title: 'Limitless', definition: 'En författare får tillgång till en drog som gör honom extremt intelligent.', difficulty: 'medel' },
      { title: 'The Death of Stalin', definition: 'Efter Stalins död utbryter kaos, maktspel och paranoia bland Sovjets ledare.', difficulty: 'svår' },
      { title: 'GoodFellas', definition: 'En ung man dras in i maffians värld och får uppleva både makt och förfall.', difficulty: 'medel' },
      { title: 'Inglourious Basterds', definition: 'Under andra världskriget planerar soldater och en biografägare hämnd mot nazisterna.', difficulty: 'medel' },
      { title: 'Doctor Strange', definition: 'En arrogant kirurg lär sig magi och måste skydda världen från kosmiska hot.', difficulty: 'medel' },
      { title: 'Inside Man', definition: 'En bankrånare och en förhandlare hamnar i ett intrikat psykologiskt spel.', difficulty: 'medel' },
    ],
    'Citat': [
      { title: 'The Shawshank Redemption', definition: '"Get busy living, or get busy dying."', difficulty: 'lätt' },
      { title: 'Moonlight', definition: '"In moonlight, black boys look blue."', difficulty: 'lätt' },
      { title: 'Interstellar', definition: '"Love is the one thing that transcends time and space."', difficulty: 'lätt' },
      { title: 'The Death of Stalin', definition: '"What is a committee? A committee is a suicide pact."', difficulty: 'medel' },
      { title: 'GoodFellas', definition: '"As far back as I can remember, I always wanted to be a gangster."', difficulty: 'lätt' },
      { title: 'Harakiri', definition: '"Honorable men are a lot of nonsense."', difficulty: 'medel' },
      { title: 'Limitless', definition: '"This is your life on NZT."', difficulty: 'lätt' },
      { title: 'Inglourious Basterds', definition: '"This is a bingo!"', difficulty: 'lätt' },
      { title: 'The Lord of the Rings', definition: '"One does not simply walk into Mordor."', difficulty: 'lätt' },
      { title: 'Home Alone', definition: '"Keep the change, ya filthy animal!"', difficulty: 'lätt' },
    ],
    'Karaktärer': [
      { title: 'The Shawshank Redemption', definition: 'Andy Dufresne, Red, Warden Norton, Brooks Hatlen, Captain Hadley', difficulty: 'lätt' },
      { title: 'Moonlight', definition: 'Chiron, Paula, Juan, Kevin, Teresa', difficulty: 'lätt' },
      { title: 'Interstellar', definition: 'Cooper, Murph, Brand, Dr. Mann, TARS', difficulty: 'lätt' },
      { title: 'GoodFellas', definition: 'Henry Hill, Jimmy Conway, Tommy DeVito, Karen Hill, Paulie Cicero', difficulty: 'lätt' },
      { title: 'Harakiri', definition: 'Hanshiro Tsugumo, Motome Chijiiwa, Saito, Hikokuro, Ii', difficulty: 'medel' },
      { title: 'Doctor Strange', definition: 'Stephen Strange, Wong, Ancient One, Mordo, Christine Palmer', difficulty: 'lätt' },
      { title: 'Inside Man', definition: 'Detective Frazier, Dalton Russell, Madeleine White, John Darius', difficulty: 'lätt' },
      { title: 'Inglourious Basterds', definition: 'Shosanna, Aldo Raine, Hans Landa, Bridget von Hammersmark, Hugo Stiglitz', difficulty: 'medel' },
      { title: 'The Hateful Eight', definition: 'John Ruth, Daisy Domergue, Major Warren, Chris Mannix, Oswaldo Mobray', difficulty: 'medel' },
      { title: 'John Wick', definition: 'John Wick, Viggo Tarasov, Winston, Marcus, Daisy', difficulty: 'lätt' },
    ],
    'Skådespelare': [
      { title: 'Keanu Reeves', definition: 'Kanadensisk skådespelare – The Matrix, John Wick. Global action-stjärna.', difficulty: 'lätt' },
      { title: 'Leonardo DiCaprio', definition: 'Amerikansk skådespelare – Titanic, Inception, The Revenant.', difficulty: 'lätt' },
      { title: 'Denzel Washington', definition: 'Amerikansk skådespelare – Training Day, Malcolm X, Fences.', difficulty: 'lätt' },
      { title: 'Meryl Streep', definition: 'Amerikansk skådespelerska – rekord i Oscar-nomineringar.', difficulty: 'lätt' },
      { title: 'Tom Hanks', definition: 'Amerikansk skådespelare – Forrest Gump, Saving Private Ryan, Cast Away.', difficulty: 'lätt' },
      { title: 'Robert De Niro', definition: 'Amerikansk skådespelare – Taxi Driver, Raging Bull, The Godfather Part II.', difficulty: 'lätt' },
      { title: 'Al Pacino', definition: 'Amerikansk skådespelare – The Godfather, Scarface, Scent of a Woman.', difficulty: 'lätt' },
      { title: 'Brad Pitt', definition: 'Amerikansk skådespelare/producent – Fight Club, Seven.', difficulty: 'lätt' },
      { title: 'Christian Bale', definition: 'Brittisk skådespelare – The Dark Knight-trilogin, The Machinist.', difficulty: 'medel' },
      { title: 'Joaquin Phoenix', definition: 'Amerikansk skådespelare – Joker, Her, Walk the Line.', difficulty: 'medel' },
      { title: 'Ryan Gosling', definition: 'Kanadensisk skådespelare – La La Land, Drive, Blade Runner 2049.', difficulty: 'lätt' },
      { title: 'Cillian Murphy', definition: 'Irländsk skådespelare – Peaky Blinders, Oppenheimer.', difficulty: 'medel' },
      { title: 'Heath Ledger', definition: 'Australisk skådespelare – The Dark Knight, Brokeback Mountain.', difficulty: 'medel' },
      { title: 'Daniel Day-Lewis', definition: 'Engelsk-irländsk skådespelare – There Will Be Blood, Lincoln.', difficulty: 'svår' },
      { title: 'Mads Mikkelsen', definition: 'Dansk skådespelare – Another Round, Casino Royale, Hannibal.', difficulty: 'medel' },
      { title: 'Gary Oldman', definition: 'Engelsk skådespelare – Darkest Hour, Tinker Tailor Soldier Spy.', difficulty: 'medel' },
      { title: 'Cate Blanchett', definition: 'Australisk skådespelerska – Blue Jasmine, Carol.', difficulty: 'medel' },
      { title: 'Natalie Portman', definition: 'Israelisk-amerikansk skådespelerska – Black Swan, Star Wars.', difficulty: 'lätt' },
      { title: 'Charlize Theron', definition: 'Sydafrikansk-amerikansk skådespelerska – Monster, Mad Max: Fury Road.', difficulty: 'medel' },
      { title: 'Timothée Chalamet', definition: 'Amerikansk skådespelare – Call Me by Your Name, Dune, Wonka.', difficulty: 'lätt' },
    ],
  },
};
