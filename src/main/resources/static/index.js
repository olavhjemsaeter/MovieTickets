$(function (){
    hentAlle();
    });

function regBestilling() {
    const bestilling = {
        numTickets : $("#numTickets").val(),
        movie : $("#movie").val(),
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

    $.post("/lagre", bestilling, function(){
        hentAlle();
    });
}

function hentAlle(){
    $.get("/hentAlle", function ( bestillinger ) {
        formaterData(bestillinger);
    })}

function formaterData(bestillinger){
    let ut = "<table class ='table table-striped'><tr><th>Antall billetter</th><th>Film</th>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th><th></th><th></th></tr>";
    for(const bestilling of bestillinger ){
        ut += "<tr><td>" + bestilling.numTickets + "</td><td>" + bestilling.movie + "</td><td>" + bestilling.firstName + "</td>" +
            "<td>" + bestilling.lastName + "</td><td>" + bestilling.phoneNumber + "</td><td>" + bestilling.email + "</td>" +
            "<td> <button class='btn btn-primary text-md-center' onclick='idTilEndring("+bestilling.id+")'>Endre</button></td>"+
            "<td> <button class='btn btn-danger text-md-center' onclick='slettEnBestilling("+bestilling.id+")'>Slett</button></td>"+
            "</tr>";
    }
    ut += "</table>";
    $("#bestillingene").html(ut);
}

function idTilEndring(id){
    window.location.href = "/endre.html?"+id;
}

function slettEnBestilling(id) {
    const url = "/slettEnBestilling?id="+id;
    $.get( url, function() {
        window.location.href = "/";
    });
}

function slettBestillingene() {
    $.get( "/slettAlle", function( data ) {
        hentAlle();
    });
}

function validatePhoneNumber(phoneNumber) {
    const re = /^\d{8}$/; // Tillater bare 8 sifre
    return re.test(phoneNumber);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}