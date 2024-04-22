package com.example.oblig3;

public class Bestilling implements Comparable<Bestilling> {

    private int id;

    private String movie;

    private int numTickets;
    
    private String firstName;
    
    private String lastName;
    
    private int phoneNumber;
    
    private String email;

    public Bestilling(){

    }

    public Bestilling(int id, String movie, int numTickets, String firstName,
                      String lastName, int phoneNumber, String email){
        this.id = id;
        this.movie = movie;
        this.numTickets = numTickets;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}
    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {this.movie = movie;}

    public int getNumTickets() {
        return numTickets;
    }

    public void setNumTickets(int numTickets) {
        this.numTickets = numTickets;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Override
    public int compareTo(Bestilling bestilling){
        return this.getLastName().compareToIgnoreCase(bestilling.getLastName());
    }
}