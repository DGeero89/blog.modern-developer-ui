/**
 * Created by hherb on 1/21/2017.
 */
var commentForm = document.getElementById("comment-form");

var emailForm = document.getElementbyId("email");

function validateCommentForm(input){
    if (validator.isEmpty(commentForm.value) === false && (validator.lessWordsThan(commentForm.value, 1000)) === true) {
        commentForm.setCustomValidity("");
    }
    else {
        commentForm.setCustomValidity("Please enter a valid comment, no longer than 1000 words.");
    }
}

function validateEmailForm(input){
    if (validator.isEmailAddress(emailForm.value) === true && (validator.isEmpty(emailForm.value)) === false){
        validateEmailForm.setCustomValidity("");
    }
    else {
        validateEmailForm.setCustomValidity("Please enter a valid email address.");
        console.log("not working");
    }
}

emailForm.addEventListener("change", validateEmailForm(this));

commentForm.addEventListener("change", validateCommentForm(this));