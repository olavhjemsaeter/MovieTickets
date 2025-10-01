package com.example.oblig3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BestillingController {
    
    private static final Logger logger = LoggerFactory.getLogger(BestillingController.class);
    
    @Autowired
    private BestillingRepository rep;

    @PostMapping("/lagre")
    public ResponseEntity<String> lagreBestilling(@RequestBody Bestilling innBestilling){
        try {
            logger.info("Lagrer bestilling: {}", innBestilling);
            rep.lagreBestilling(innBestilling);
            return ResponseEntity.ok("Bestilling lagret");
        } catch (Exception e) {
            logger.error("Feil ved lagring av bestilling", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved lagring");
        }
    }

    @PostMapping("/endre")
    public ResponseEntity<String> endre(@RequestBody Bestilling bestilling){
        try {
            logger.info("Endrer bestilling: {}", bestilling);
            rep.endreBestilling(bestilling);
            return ResponseEntity.ok("Bestilling endret");
        } catch (Exception e) {
            logger.error("Feil ved endring av bestilling", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved endring");
        }
    }

    @GetMapping("/hentAlle")
    public ResponseEntity<List<Bestilling>> hentAlle(){
        try {
            logger.info("Henter alle bestillinger");
            List<Bestilling> bestillinger = rep.hentAlleBestillinger();
            return ResponseEntity.ok(bestillinger);
        } catch (Exception e) {
            logger.error("Feil ved henting av bestillinger", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/henteEnBestilling")
    public ResponseEntity<Bestilling> henteEnBestilling(@RequestParam int id){
        try {
            logger.info("Henter bestilling med id: {}", id);
            Bestilling enBestilling = rep.henteEnBestilling(id);
            return ResponseEntity.ok(enBestilling);
        } catch (Exception e) {
            logger.error("Feil ved henting av bestilling med id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/slettEnBestilling")
    public ResponseEntity<String> slettEnBestilling(@RequestParam int id){
        try {
            logger.info("Sletter bestilling med id: {}", id);
            rep.slettEnBestilling(id);
            return ResponseEntity.ok("Bestilling slettet");
        } catch (Exception e) {
            logger.error("Feil ved sletting av bestilling med id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved sletting");
        }
    }

    @DeleteMapping("/slettAlle")
    public ResponseEntity<String> slettAlle(){
        try {
            logger.info("Sletter alle bestillinger");
            rep.slettAlleBestillinger();
            return ResponseEntity.ok("Alle bestillinger slettet");
        } catch (Exception e) {
            logger.error("Feil ved sletting av alle bestillinger", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Feil ved sletting");
        }
    }
}

        