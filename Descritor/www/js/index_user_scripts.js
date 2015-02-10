(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {      

    
        /* button  Login */
    $(document).on("click", ".uib_w_10", function(evt)
    {
            db.setItem("email",document.getElementById("email").value) ;
            $.post("http://apppolitico.com.br/altapp/login.php" , 
                   { email:document.getElementById("email").value ,
                     p:document.getElementById("password").value } ,
                   function (result) {
                    if (result == "0") {
                        $.ui.loadContent("#homepage",true,false,"up");
                        var id_n = Math.floor(Math.random() * (6 - 1 + 1) ) + 1 ;
                        db.setItem("img_id" , id_n ) ;
                        $.getJSON("http://apppolitico.com.br/altapp/image.php?id="+db.getItem("img_id"), function(data) {
                            document.getElementById("place_img").src=data.url ;
                        });
                        var url = "http://apppolitico.com.br/altapp/user.php?email="+db.getItem("email") ;

                        $.getJSON(url , function(data) {
                            var level = parseInt(data.level) ;
                            var xp = parseInt(data.xp) ;
                            $('#lvl_txt').html( "<p>Level :"+data.level+" | "+data.xp+"/"+50*(Math.pow(2,level))+"</p>" );
                            document.getElementById("xp-bar").value = ( xp * 100 ) / (50*(Math.pow(2,level)) ) ;
                        });

                    } else {
                        alert("Incorrect login or password") ;
                    }
                });
    });
    
        /* a  .uib_w_16 */
    $(document).on("click", ".uib_w_16", function(evt)
    {
        db.setItem("desc_img",document.getElementById("desc_img").value) ;
        
        $.getJSON("http://apppolitico.com.br/altapp/desc_img.php?desc="+db.getItem("desc_img")+"&id="+db.getItem("img_id")+"&email="+db.getItem("email"), function(data) {
                document.getElementById("alert_box").className="alert alert-success" ;
                if ( data.error == "0" ) {
                    $("#alert_box").html("Você foi o primeiro a descrever essa imagem ! +50XP !" ) ;
                } else {
                    $("#alert_box").html("Nota :"+data.grade+" + "+data.grade*5+"XP" ) ;    
                }
                var id_n = Math.floor(Math.random() * (6 - 1 + 1) ) + 1 ;
                db.setItem("img_id" , id_n ) ;
                $.getJSON("http://apppolitico.com.br/altapp/image.php?id="+db.getItem("img_id"), function(data) {
                    document.getElementById("place_img").src=data.url ;
                });
                var url = "http://apppolitico.com.br/altapp/user.php?email="+db.getItem("email") ;
            
                $.getJSON(url , function(data) {
                    var level = parseInt(data.level) ;
                    var xp = parseInt(data.xp) ;
                    $('#lvl_txt').html( "<p>Level :"+data.level+" | "+data.xp+"/"+50*(Math.pow(2,level))+"</p>" );
                    document.getElementById("xp-bar").value = ( xp * 100 ) / (50*(Math.pow(2,level)) ) ;
                });
                document.getElementById("desc_img").value = "" ;
        });
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
