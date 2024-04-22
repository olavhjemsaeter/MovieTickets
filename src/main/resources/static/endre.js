$(function(){  // kjøres når dokumentet er ferdig lastet
    henteEnBestilling();
});

function henteEnBestilling(){
    const id = window.location.search.substring(1); // kommer fra kallet i index.js
    const url = "/henteEnBestilling?id="+id;
    $.get( url, function(enBillett) {
        // overfør til input-feltene i skjemaet
        $("#id").val(enBillett.id); // må ha med denne for å vite hvilken id
        $("#numTickets").val(enBillett.numTickets);
        $("#firstName").val(enBillett.firstName);
        $("#lastName").val(enBillett.lastName);
        $("#phoneNumber").val(enBillett.phoneNumber);
        $("#email").val(enBillett.email);
    })}

function endreBestilling() {
    const bestilling = {
        id : $("#id").val(),
        movie : $("#movie").val(),
        numTickets : $("#numTickets").val(),
        firstName : $("#firstName").val(),
        lastName : $("#lastName").val(),
        phoneNumber : $("#phoneNumber").val(),
        email : $("#email").val(),
    };

    if (!bestilling.movie || !bestilling.numTickets || !bestilling.firstName || !bestilling.lastName || !bestilling.phoneNumber || !bestilling.email) {
        alert("Alle felt må fylles ut!");
        return;
    }

    if (!validatePhoneNumber(bestilling.phoneNumber)) {
        alert("Telefonnummeret er ikke gyldig!");
        return;
    }

    if (!validateEmail(bestilling.email)) {
        alert("E-postadressen er ikke gyldig!");
        return;
    }
    $.post("/endre", bestilling, function(){
        hentAlle();
    })
    window.location.href="index.html";
}

function validatePhoneNumber(phoneNumber) {
    const re = /^\d{8}$/; // Tillater bare 8 sifre
    return re.test(phoneNumber);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


