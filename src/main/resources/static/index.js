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
    const submitBtn = $('button[onclick="regBestilling()"]');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Registrerer...');
    submitBtn.prop('disabled', true);

    $.ajax({
        url: "/api/lagre",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(bestilling),
        success: function(){
            hentAlle();
            clearForm();
            showAlert("Bestilling registrert!", "success");
            
            // Reset button
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        },
        error: function() {
            showAlert("Feil ved registrering av bestilling!", "danger");
            
            // Reset button
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }
    });
}

function hentAlle(){
    $.get("/api/hentAlle", function ( bestillinger ) {
        formaterData(bestillinger);
        updateStats(bestillinger);
    }).fail(function() {
        // Stille feilhåndtering - bare vis tom liste
        formaterData([]);
        updateStats([]);
    });
}

function formaterData(bestillinger){
    if (bestillinger.length === 0) {
        let ut = `
            <div class="text-center py-5" style="background-color: #667eea; border-radius: 10px; margin: 20px 0;">
                <i class="fas fa-ticket-alt" style="font-size: 3rem; color: white; opacity: 0.8;"></i>
                <h5 class="mt-3" style="color: white;">Ingen bestillinger ennå</h5>
                <p style="color: white;">Bestill din første billett for å komme i gang!</p>
            </div>
        `;
        $("#bestillingene").html(ut);
        return;
    }

    let ut = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th><i class="fas fa-film me-2"></i>Film</th>
                    <th><i class="fas fa-users me-2"></i>Billetter</th>
                    <th><i class="fas fa-user me-2"></i>Navn</th>
                    <th><i class="fas fa-phone me-2"></i>Telefon</th>
                    <th><i class="fas fa-envelope me-2"></i>E-post</th>
                    <th><i class="fas fa-cogs me-2"></i>Handlinger</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for(const bestilling of bestillinger ){
        ut += `
            <tr>
                <td>
                    <span class="badge bg-primary">${bestilling.movie}</span>
                </td>
                <td>
                    <span class="badge bg-info">${bestilling.numTickets}</span>
                </td>
                <td>${bestilling.firstName} ${bestilling.lastName}</td>
                <td>${bestilling.phoneNumber}</td>
                <td>${bestilling.email}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm" onclick="idTilEndring(${bestilling.id})" title="Endre bestilling">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="slettEnBestilling(${bestilling.id})" title="Slett bestilling">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }
    ut += `
            </tbody>
        </table>
    `;
    $("#bestillingene").html(ut);
}

function updateStats(bestillinger) {
    const totalBookings = bestillinger.length;
    const totalTickets = bestillinger.reduce((sum, booking) => sum + parseInt(booking.numTickets), 0);
    
    $("#totalBookings").text(totalBookings);
    $("#totalTickets").text(totalTickets);
    
    // Vis stats hvis det er bestillinger
    if (totalBookings > 0) {
        $("#statsContainer").fadeIn();
    } else {
        $("#statsContainer").fadeOut();
    }
}

function clearForm() {
    $("#ticketForm")[0].reset();
    $("#id").val("");
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

function idTilEndring(id){
    window.location.href = "/endre.html?"+id;
}

function slettEnBestilling(id) {
    if (confirm("Er du sikker på at du vil slette denne bestillingen?")) {
        $.ajax({
            url: "/api/slettEnBestilling?id="+id,
            type: "DELETE",
            success: function() {
                showAlert("Bestilling slettet!", "success");
                hentAlle();
            },
            error: function() {
                showAlert("Feil ved sletting av bestilling!", "danger");
            }
        });
    }
}

function slettBestillingene() {
    if (confirm("Er du sikker på at du vil slette ALLE bestillingene? Denne handlingen kan ikke angres!")) {
        $.ajax({
            url: "/api/slettAlle",
            type: "DELETE",
            success: function( data ) {
                showAlert("Alle bestillinger er slettet!", "success");
                hentAlle();
            },
            error: function() {
                showAlert("Feil ved sletting av alle bestillinger!", "danger");
            }
        });
    }
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

    // Auto-fokus på første felt
    $("#movie").focus();
});