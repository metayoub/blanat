package com.aa.blanat.web.rest.errors;

public class DealUserDeletedException extends BadRequestAlertException {
    
    private static final long serialVersionUID = 1L;

    public DealUserDeletedException() {
        super( ErrorConstants.DEAL_USER_DELETED, "DealUser", "user deleted");
        //super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "user is deleted!" ,"DealUser", "user deleted");
    }

}