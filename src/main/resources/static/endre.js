$(function(){  // kjøres når dokumentet er ferdig lastet
    henteEnBestilling();
});

function henteEnBestilling(){
    const id = window.location.search.substring(1); // kommer fra kallet i index.js
    const url = "/henteEnBestilling?id="+id;
    $.get( url, function(enBillett) {
        // overfør til input-feltene i skjemaet
        $("#id").val(enBillett.id); // må ha med denne for å vite hvilken id
        $("#movie").val(enBillett.movie);
        $("#numTickets").val(enBillett.numTickets);
        $("#firstName").val(enBillett.firstName);
        $("#lastName").val(enBillett.lastName);
        $("#phoneNumber").val(enBillett.phoneNumber);
        $("#email").val(enBillett.email);
        
        // Legg til validering-klasser
        $("#phoneNumber").addClass('is-valid');
        $("#email").addClass('is-valid');
        $("#numTickets").addClass('is-valid');
    }).fail(function() {
        showAlert("Feil ved henting av bestilling!", "danger");
    });
}

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

    // Validering med bedre feilmeldinger
    if (!bestilling.movie || !bestilling.numTickets || !bestilling.firstName || !bestilling.lastName || !bestilling.phoneNumber || !bestilling.email) {
        showAlert("Alle felt må fylles ut!", "danger");
        return;
    }

    if (!validatePhoneNumber(bestilling.phoneNumber)) {
        showAlert("Telefonnummeret må være 8 siffer!", "danger");
        return;
    }

    if (!validateEmail(bestilling.email)) {
        showAlert("E-postadressen er ikke gyldig!", "danger");
        return;
    }

    if (bestilling.numTickets < 1 || bestilling.numTickets > 10) {
        showAlert("Antall billetter må være mellom 1 og 10!", "danger");
        return;
    }

    // Vis loading state
    const submitBtn = $('button[onclick="endreBestilling()"]');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Lagrer...');
    submitBtn.prop('disabled', true);

    $.post("/endre", bestilling, function(){
        showAlert("Bestilling oppdatert!", "success");
        
        // Redirect etter 1.5 sekunder
        setTimeout(function() {
            window.location.href = "/";
        }, 1500);
    }).fail(function() {
        showAlert("Feil ved oppdatering av bestilling!", "danger");
        
        // Reset button
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
    });
}

function goBack() {
    window.location.href = "/";
}

function showAlert(message, type) {
    const alertClass = type === 'danger' ? 'alert-danger' : 'alert-success';
    const icon = type === 'danger' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
    
    const alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            <i class="${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Fjern eksisterende alerts
    $('.alert').remove();
    
    // Legg til ny alert
    $('.container').first().prepend(alertHtml);
    
    // Auto-hide etter 5 sekunder
    setTimeout(function() {
        $('.alert').fadeOut();
    }, 5000);
}

function validatePhoneNumber(phoneNumber) {
    const re = /^\d{8}$/; // Tillater bare 8 sifre
    return re.test(phoneNumber);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Real-time validering
$(document).ready(function() {
    // Real-time validering for telefonnummer
    $("#phoneNumber").on('input', function() {
        const phone = $(this).val();
        const isValid = validatePhoneNumber(phone);
        
        if (phone.length > 0) {
            if (isValid) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        } else {
            $(this).removeClass('is-valid is-invalid');
        }
    });

    // Real-time validering for e-post
    $("#email").on('input', function() {
        const email = $(this).val();
        const isValid = validateEmail(email);
        
        if (email.length > 0) {
            if (isValid) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        } else {
            $(this).removeClass('is-valid is-invalid');
        }
    });

    // Real-time validering for antall billetter
    $("#numTickets").on('input', function() {
        const tickets = parseInt($(this).val());
        
        if ($(this).val().length > 0) {
            if (tickets >= 1 && tickets <= 10) {
                $(this).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid').addClass('is-invalid');
            }
        } else {
            $(this).removeClass('is-valid is-invalid');
        }
    });
});