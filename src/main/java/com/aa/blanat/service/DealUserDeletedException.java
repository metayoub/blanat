package com.aa.blanat.service;

public class DealUserDeletedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DealUserDeletedException() {
        super("user deleted");
    }

}
