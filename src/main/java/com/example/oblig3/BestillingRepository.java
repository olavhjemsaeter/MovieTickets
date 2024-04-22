package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class BestillingRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBestilling(Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (numTickets, movie, firstName, lastName, phoneNumber, email) VALUES(?,?,?,?,?,?);";
        db.update(sql, bestilling.getNumTickets(), bestilling.getMovie(), bestilling.getFirstName(), bestilling.getLastName(), bestilling.getPhoneNumber(), bestilling.getEmail());
    }

    public List<Bestilling> hentAlleBestillinger() {
        String sql = "SELECT * FROM Bestilling";
        List<Bestilling> alleBestillinger = db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
        Collections.sort(alleBestillinger);
        return alleBestillinger;
    }

    public Bestilling henteEnBestilling(int id) {
        String sql = "SELECT * FROM Bestilling WHERE id=?";
        List<Bestilling> enBestilling = db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class), id);
        return enBestilling.get(0);
    }

    public void endreBestilling(Bestilling bestilling) {
        String sql = "UPDATE Bestilling SET numTickets=?, movie=?,firstName=?,lastName=?,phoneNumber=?,email=? where id=?";
        db.update(sql, bestilling.getNumTickets(), bestilling.getMovie(), bestilling.getFirstName(), bestilling.getLastName(), bestilling.getPhoneNumber(), bestilling.getEmail(), bestilling.getId());
    }

    public void slettEnBestilling(int id) {
        String sql = "DELETE FROM Bestilling WHERE id=?";
        db.update(sql, id);
    }

    public void slettAlleBestillinger() {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }
}