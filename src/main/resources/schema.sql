CREATE TABLE Bestilling
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    numTickets INTEGER NOT NULL,
    movie VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber BIGINT NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id)
);