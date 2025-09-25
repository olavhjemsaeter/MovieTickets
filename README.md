# MovieTickets

En kinobillett-app laget med Spring Boot. Du kan bestille billetter til forskjellige filmer, se alle bestillinger og slette dem.

## Teknologi

- **Backend**: Spring Boot, Java, H2 Database
- **Frontend**: HTML, CSS, JavaScript, jQuery, Bootstrap

## Hvordan kjøre appen

1. Klon repositoriet:
```bash
git clone https://github.com/olavhjemsaeter/MovieTickets.git
cd MovieTickets
```

2. Start appen:
```bash
./mvnw spring-boot:run
```

3. Åpne nettleseren og gå til `http://localhost:8080`

## Funksjonalitet

- Bestille kinobilletter
- Se alle bestillinger i en tabell
- Redigere eksisterende bestillinger
- Slette bestillinger
- Validering av skjemaer

## Filmer

Du kan velge mellom:
- Ocean's Eleven
- Ocean's Twelve  
- Ocean's Thirteen

## Database

Appen bruker H2 in-memory database. Alle data forsvinner når du stopper appen.