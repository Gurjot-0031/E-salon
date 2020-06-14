package com.jot.Esalon.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "BOOKING")
public class Booking {
    @Id
    @Column(name = "BOOKING_ID")
    @GeneratedValue
    private int bookingId;
    private Date startDateTime;
    private Date endDateTime;
    @Column
    private int uidInBooking;

    @ManyToOne(optional = false)
    @JoinColumn(name="uidInBooking",referencedColumnName = "uid", insertable = false, updatable = false)
    private Users users;

    public Booking() {
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Date getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(Date endDateTime) {
        this.endDateTime = endDateTime;
    }

    public int getUidInBooking() {
        return uidInBooking;
    }

    public void setUidInBooking(int uidInBooking) {
        this.uidInBooking = uidInBooking;
    }
}
