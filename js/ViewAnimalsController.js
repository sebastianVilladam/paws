'use strict'

const Http = new XMLHttpRequest();
const url='https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production/animals';

Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => 
{
    if (Http.readyState == 4 && Http.status == 200) 
    {
        var response = JSON.parse(Http.responseText);
        
        for (var key in response) 
        {
            //Bootstrap card structure for the animal info
            var newText = "<div class='col-md-4'>" +  
                            "<div class='card'>"+
                                "<image src='" + response[key].animal_picture + "' class='card-img-top'></image>" +
                                "<div class='card-body>" +
                                    "<h5 class='card-title'>" + response[key].animal_name + "</h5><br>" +                        
                                    "<p class='card-text'>Kind: " + response[key].animal_kind + "<br>" +
                                    "Entry date: " + response[key].entry_date + "<br>" +
                                    "Age: " + response[key].animal_age + "</p>" + 
                                    "<form action='animalProfile.html'>" +
                                        "<input type='hidden' name='id' value='" + response[key].animal_id + "'/>" +
                                        "<input class='btn btn-primary' type='submit' value='find more'/>" +
                                    "</form>" +                                    
                                "</div>" +
                            "</div>" +
                        "</div>";

            document.getElementById("animals_list").innerHTML += newText;  
        }
    }
}
