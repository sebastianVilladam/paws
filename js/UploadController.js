'use strict'

/**
 * sets the current date on the date field of the form
 */
function setDate()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    document.getElementsByClassName("form-date").value = date;
}

function submitInfo()
{
    //at first validates the form content
    if(!validation())
        return false;

    //builds the params required for the submit as the URL and data
    var url = "https://eyavqewaud.execute-api.ap-northeast-1.amazonaws.com/production";
    var str = "animal_name=" + document.getElementById("formInput").value + 
              "&animal_kind=" + document.getElementById("formInput2").value +
              "&entry_date=" + document.getElementById("formInput4").value +
              "&animal_age=" + document.getElementById("formInput3").value;

    var ret = postSubmit(url, str) ;

    if (ret.match(/^XHR error/)) 
    {
        console.log(ret);
        return;
    }
    else
        console.log(ret);
}

function postSubmit(url, str)
{
    var req;

    if (window.XMLHttpRequest) 
        req = new XMLHttpRequest();
    else if (window.ActiveXObject) 
        req = new ActiveXObject("Microsoft.XMLHTTP");
        
    if (req != undefined) 
    {
        req.overrideMimeType("application/json"); 
        try 
        {            
            req.open("POST", url, false);                 
            req.send(str); 
        }
        catch(err) 
        {
            alert("couldnt complete request. Is JS enabled for that domain?\\n\\n" + err.message);
            return false;
        }

        if (req.readyState == 4) 
        {             
            if (req.status == 200)  
                return req.responseText ; 
            else
                return "XHR error: " + req.status +" "+req.statusText; 
        }
    }

    alert("req for getAsync is undefined");
}

function validation() 
{
    var name = document.getElementById("formInput").value;
    var kind = document.getElementById("formInput2").value;
    var age = document.getElementById("formInput3").value;

    var errorMsj = [];
    var errName = true; 
    var errKind = true;
    var errAge = true;

    //checks if names is set and if it is only alfabetic
    if(name == "") 
    {
        errorMsj.push("Please, set a name");
    } 
    else 
    {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) 
        {
            errorMsj.push("please, enter a valid name");
        } 
        else 
        {
            errName = false;
        }
    }

    //checks if kind is set and if it is only alfabetic
    if(kind == "") 
    {
        errorMsj.push("Please, set an animal kind");
    } 
    else 
    {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(kind) === false) 
        {
            errorMsj.push("please, enter a valid animal kind");
        } 
        else 
        {
            errKind = false;
        }
    }

    //checks if age is set and if it is only numeric
    if(age == "") 
    {
        errorMsj.push("please, enter an age");
    } 
    else 
    {
        var regex = /^[1-9]+$/;
        if(regex.test(age) === false) 
        {
            errorMsj.push("please, enter a valid age");
        } 
        else
        {
            errAge = false;
        }
    }

    if(errName == true || errKind == true || errAge == true)
    {
        showErrorMesagess(errorMsj);
        return false;
    }
    else
        return true;
}

function showErrorMesagess(errorMsj)
{
    console.log(errorMsj);
    var message = "";
    for (var key in errorMsj) 
    {
         message += errorMsj[key] + ", ";     
    }

    alert(message);
}