function content1(arg) {
   alert(arg);
    var inputDiv1 = document.getElementById('cnt1');  
    var inputDiv2 = document.getElementById('cnt2');  
    var inputDiv3 = document.getElementById('cnt3');
    var inputDiv4 = document.getElementById('cnt4');
    
        inputDiv1.style.display = "block";
        inputDiv2.style.display = "none";
        inputDiv3.style.display = "none";
        inputDiv4.style.display = "none";

        //flask server execution through php 
        $.ajax({
                url: "mod1.php",
                method: "POST",
                data: { id: arg },
                success: function(response) {
                   alert(response);
                },
                error: function(xhr, status, error) {
                    // Handle AJAX error if needed
                    console.error("AJAX Error:", error);
                }
            });

}
function content2(arg) {
    var inputDiv1 = document.getElementById('cnt1');  
    var inputDiv2 = document.getElementById('cnt2');  
    var inputDiv3 = document.getElementById('cnt3');
    var inputDiv4 = document.getElementById('cnt4');
    
        inputDiv2.style.display = "block";
        inputDiv1.style.display = "none";
        inputDiv3.style.display = "none";
        inputDiv4.style.display = "none";

          //flask server execution through php 
        $.ajax({
                url: "mod1.php",
                method: "POST",
                data: { id: arg },
                success: function(response) {
                   // alert(response);
                },
                error: function(xhr, status, error) {
                    // Handle AJAX error if needed
                    console.error("AJAX Error:", error);
                }
            });
}
function content3(arg) {
    var inputDiv1 = document.getElementById('cnt1');  
    var inputDiv2 = document.getElementById('cnt2');  
    var inputDiv3 = document.getElementById('cnt3');
    var inputDiv4 = document.getElementById('cnt4');
    
        inputDiv3.style.display = "block";
        inputDiv2.style.display = "none";
        inputDiv1.style.display = "none";
        inputDiv4.style.display = "none";

          //flask server execution through php 
        $.ajax({
                url: "mod1.php",
                method: "POST",
                data: { id: arg },
                success: function(response) {
                   // alert(response);
                },
                error: function(xhr, status, error) {
                    // Handle AJAX error if needed
                    console.error("AJAX Error:", error);
                }
            });
}
function content4(arg) {
    var inputDiv1 = document.getElementById('cnt1');  
    var inputDiv2 = document.getElementById('cnt2');  
    var inputDiv3 = document.getElementById('cnt3');
    var inputDiv4 = document.getElementById('cnt4');
    
        inputDiv4.style.display = "block";
        inputDiv2.style.display = "none";
        inputDiv3.style.display = "none";
        inputDiv1.style.display = "none";

          //flask server execution through php 
        $.ajax({
                url: "mod1.php",
                method: "POST",
                data: { id: arg },
                success: function(response) {
                   // alert(response);
                },
                error: function(xhr, status, error) {
                    // Handle AJAX error if needed
                    console.error("AJAX Error:", error);
                }
            });
}