(function(){
/**
 * Created by hherb on 1/21/2017.
 */
 
    var commentForm = document.getElementById("comment-form"),
        commentField = commentForm.querySelector("#comment-field"),
        emailForm = document.getElementById("email-form"),
        emailField = emailForm.querySelector("#email"),
        submitButtons = document.querySelectorAll('.submit');

    function validateCommentForm(input){

      var value = input.value.trim();

      if (!validator.isEmpty(value) && validator.lessWordsThan(value, 1000)) {
        input.setCustomValidity("");
      } else {
          input.setCustomValidity("Please enter a valid comment, no longer than 1000 words.");
      }

    }

    function validateEmailForm(input){
      
      var value = input.value;

      if ( validator.isEmpty(value) ) {
        input.setCustomValidity("Looks like you didn't enter anything. Please enter a valid email.");
      } else if ( !validator.isEmailAddress(value) ){
        input.setCustomValidity("Please enter a valid email. An email address consists of two strings combined by an @ symbol.");
      }else {
        input.setCustomValidity("");
      }
    }

    emailField.addEventListener("keyup", function() {
      validateEmailForm(this);
    });

    commentField.addEventListener("keyup", function(){
      validateCommentForm(this);
    });

    commentForm.addEventListener('submit', function(e){
      e.preventDefault();
      console.log(e.target);
      blog.addComment(e);
    });

    emailForm.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log(e.target.querySelector('input').value);
    });


 })();
