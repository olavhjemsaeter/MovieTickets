package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BestillingController {
    
    @Autowired
    private BestillingRepository rep;

    @PostMapping("/lagre")
    public void lagreBestilling(Bestilling innBestilling){
        rep.lagreBestilling(innBestilling);
    }

    @PostMapping("/endre")
    public void endre(Bestilling bestilling){rep.endreBestilling(bestilling);}

    @GetMapping("/hentAlle")
    public List<Bestilling> hentAlle(){
        return rep.hentAlleBestillinger();
    }

    @GetMapping("/henteEnBestilling")
    public Bestilling henteEnBestilling(int id){
        Bestilling enBestilling = rep.henteEnBestilling(id);
        return enBestilling;
    }

    @GetMapping("/slettEnBestilling")
    public void slettEnBestilling(int id){
        rep.slettEnBestilling(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){rep.slettAlleBestillinger();}
}

        