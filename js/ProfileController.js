'use strict'

/**
 * gets data send from url
 */
function processData()
{
    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);

    setAnimalData(id);
}

/*
*set the data from request on every info field
*/
function setAnimalData(animalId)
{    
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
                //checks if the ID corresponds the selected animal
                if(response[key].animal_id == animalId)
                {
                    document.getElementById("animal-img").innerHTML = "<image src='" + response[key].animal_picture + "'></image>";
                    document.getElementById("animal-name").innerHTML = response[key].animal_name;
                    document.getElementById("animal-kind").innerHTML = response[key].animal_kind;
                    document.getElementById("animal-age").innerHTML = response[key].animal_age;
                    document.getElementById("entry-date").innerHTML = response[key].entry_date;
                }
            }         
        }
    }
}