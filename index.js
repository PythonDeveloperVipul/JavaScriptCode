
// ----------Form Onload Code------------

var selectedRow=null;
var formData=[{'id':'1','name':'vipul','email':'vipul@gmail.com','gender':'Male','hobbies':'Sports','country':'India', 'state':'Gujarat', 'city':'Surat'},
{'id':'2','name':'vishal','email':'vishal@gmail.com','gender':'Male','hobbies':'Sports','country':'India', 'state':'Gujarat', 'city':'Surat'}
];
insertNewRecord(formData);



// ----------Data Dispaly Code------------

function readFormData(){
    let id;
    let formDataIns={};
    let idValue=document.myForm.id.value;
    if(idValue==""){
        id=Number(formData[formData.length-1].id);
        id=id+1;
    }else{
        id=idValue;
    }
    let name=document.myForm.name.value;
    let email=document.myForm.email.value;
    const radioButtons = document.querySelectorAll('input[name="gender"]');
    let selectedGender;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedGender = radioButton.value;
            break;
        }
    }
    let gender=selectedGender;
    var checkboxes = document.getElementsByName('hobbies');
    var checkboxesValue=[];
    for (var checkbox of checkboxes)
    {
        if (checkbox.checked) {
            checkboxesValue.push(checkbox.value)
        }
    }
    let hobbies=checkboxesValue.join(",")

    var countrylist = document.myForm.country;  
    let country= countrylist.options[countrylist.selectedIndex].text;

    var statelist = document.myForm.state;  
    let state= statelist.options[statelist.selectedIndex].text;

    var citylist = document.myForm.city;  
    let city= citylist.options[citylist.selectedIndex].text;
    formDataIns={'id':id,'name':name,'email':email,'gender':gender,'hobbies':hobbies,'country':country,'state':state,'city':city}
    return formDataIns;
}

// ----------Insert New Record Code------------
function insertNewRecord(data){
        for(let i=0;i<=data.length-1;i++){
            var table=document.getElementById('mylist').getElementsByTagName('tbody')[0];
            var newRow=table.insertRow(table.length)
            cellId=newRow.insertCell(0);
            cellId.innerHTML=data[i].id;
            cellName=newRow.insertCell(1);
            cellName.innerHTML=data[i].name;
            cellEmail=newRow.insertCell(2);
            cellEmail.innerHTML=data[i].email;
            cellGender=newRow.insertCell(3);
            cellGender.innerHTML=data[i].gender;
            cellHobbies=newRow.insertCell(4);
            cellHobbies.innerHTML=data[i].hobbies;
            cellCountry=newRow.insertCell(5);
            cellCountry.innerHTML=data[i].country;
            cellState=newRow.insertCell(6);
            cellState.innerHTML=data[i].state;
            cellCity=newRow.insertCell(7);
            cellCity.innerHTML=data[i].city;
            cellBtnEdit=newRow.insertCell(8);
            cellBtnEdit.innerHTML=`<a class="btn btn-success" onClick="onEdit(this)">Edit</a>`;
            cellBtnClear=newRow.insertCell(9);
            cellBtnClear.innerHTML=` <a class="btn btn-danger" onClick="onDelete(this)">Remove</a>`;
        } 
    
}

// ----------ResetForm Code------------

function resetForm(){
    document.myForm.id.value="";
    document.myForm.name.value="";
    document.myForm.email.value="";
    document.getElementsByName('gender')[0].checked=false;
    document.getElementsByName('gender')[1].checked=false;
    document.getElementsByName('hobbies')[0].checked=false;
    document.getElementsByName('hobbies')[1].checked=false;
    document.getElementsByName('hobbies')[2].checked=false;
    document.myForm.country.value="";
    document.myForm.state.value="";
    document.myForm.city.value="";

    document.getElementById('btnSubmit').value='Save';
    selectedRow=null;

}

    
// ----------Edit Code------------

function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    let hobbiesValue=selectedRow.cells[4].innerHTML
    let spliteHobbies=hobbiesValue.split(",")
    document.myForm.id.value=selectedRow.cells[0].innerHTML;
    document.myForm.name.value=selectedRow.cells[1].innerHTML;
    document.myForm.email.value=selectedRow.cells[2].innerHTML;

    let gender=document.getElementsByName('gender');
    if(selectedRow.cells[3].innerHTML=="Male"){
        gender[0].checked=true;
    }
    else{
        gender[1].checked=true;
    }

    let hobbies=document.getElementsByName('hobbies');
    spliteHobbies.forEach((currElem)=>{
        if (currElem=='Reading'){
            hobbies[0].checked=true;
        }
        else if(currElem=='Traveling'){
            hobbies[1].checked=true; 
        }
        else if(currElem=='Sports'){
            hobbies[2].checked=true; 
        }
    });
   let country=selectedRow.cells[5].innerHTML;
   let state=selectedRow.cells[6].innerHTML;
    document.myForm.country.value=country;
    getStateData(country)
    document.myForm.state.value=state;
    getCityData(country,state)
    document.myForm.city.value=selectedRow.cells[7].innerHTML;
    document.getElementById('btnSubmit').value='Update';
}

// ----------DropDown Code------------

var stateObject = {
    "India": { 
    "Delhi": ["new Delhi", "Firozabad","Shergarh"],
    "Kerala": ["Thiruvananthapuram", "Kozhikode","Kochi"],
    "Gujarat": ["Ahmedabad", "Surat","Vadodara"],
    },
    "Australia": {
    "South Australia": ["Dunstan", "Mitchell"],
    "Victoria": ["Altona", "Euroa"]
    }, 
    "Canada": {
    "Alberta": ["Acadia", "Bighorn"],
    "Columbia": ["Washington", "Barranquilla"]
    },
    }
var countyList, stateList, cityList;
(function () {
        countyList = document.myForm.country,
        stateList = document.myForm.state,
        cityList = document.myForm.city;
    for (var country in stateObject) {
        countyList.options[countyList.options.length] = new Option(country, country);
    }
    countyList.onchange = function () {
        getStateData(this.value);
    }
    countyList.onchange();
    stateList.onchange = function () {
        getCityData(countyList.value, this.value);
    };
})();

function getStateData(country) {
    stateList.length = 1;
    cityList.length = 1;
    if (this.selectedIndex < 1) return;
    for (var state in stateObject[country]) {
        stateList.options[stateList.options.length] = new Option(state, state);
    }
}

function getCityData(country, state) {
    cityList.length = 1;
    if (this.selectedIndex < 1) return;
    var city = stateObject[country][state];
    for (var i = 0; i < city.length; i++) {
        cityList.options[cityList.options.length] = new Option(city[i], city[i]);
    }
}
    

// ----------Update Record------------
function updateRecord(formDataUpd){
    let id,name,email,gender,hobbies,country,state,city;
    id=formDataUpd.id;
    name=formDataUpd.name;
    email=formDataUpd.email;
    gender=formDataUpd.gender;
    hobbies=formDataUpd.hobbies;
    country=formDataUpd.country;
    state=formDataUpd.state;
    city=formDataUpd.city;

    for(let i=0;i<formData.length;i++){
        if(formData[i].id==id){
            // formData=[{'id':id,'name':name,'email':email,'gender':gender,'hobbies':hobbies,'country':country,'state':state,'city':city}];
            formData[i].id=id;
            formData[i].name=name;
            formData[i].email=email;
            formData[i].gender=gender;
            formData[i].hobbies=hobbies;
            formData[i].country=country;
            formData[i].state=state;
            formData[i].city=city;

            selectedRow.cells[0].innerHTML=id;
            selectedRow.cells[1].innerHTML=name;
            selectedRow.cells[2].innerHTML=email;
            selectedRow.cells[3].innerHTML=gender;
            selectedRow.cells[4].innerHTML=hobbies;
            selectedRow.cells[5].innerHTML=country;
            selectedRow.cells[6].innerHTML=state;
            selectedRow.cells[7].innerHTML=city;
        }
    } 
}

// ----------Delete Record------------

function onDelete(td){
    if(confirm('Are you sure to delete this record ?')){
        row=td.parentElement.parentElement;
        for(let i=0;i<formData.length;i++){
            if(row.cells[0].innerHTML==formData[i].id)
            {
                formData.splice(i,1);
            }
        }
        document.getElementById('mylist').deleteRow(row.rowIndex);
        resetForm();
    }
}

// ----------Name Validation Code------------

function nameValidate(){
    let isValid=true;
    let name=document.myForm.name;
    let nameValidation=document.myForm.name.previousElementSibling.previousElementSibling;
    if(name.value==""){
        isValid=false;
        nameValidation.innerHTML="This field is required."; 
    }
    else
    {
        nameValidation.innerHTML="";
        isValid=true;
    }
   return isValid;
}
//-----------------Email Validation----------------------
function emailValidate(){
    let isValid=true;
    let email=document.myForm.email;
    let emailValidation=document.myForm.email.previousElementSibling.previousElementSibling;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.value == "" ) {
       isValid=false;
       emailValidation.innerHTML="This field is required.";
    }
    else if (!filter.test(email.value)) {
       isValid=false
       emailValidation.innerHTML="Please provide a valid email address."; 
   }
    else
    {
        emailValidation.innerHTML="";
        isValid=true
    }
    return isValid;
}
//-----------------Gender And Hobbies Validation--------------

function genderValidate(){
    let isValid=true;
    var getSelectedValue = document.querySelector(`input[name="gender"]:checked`); 
    let gender = document.myForm.gender[0].parentElement.previousElementSibling.previousElementSibling;
    if(getSelectedValue == null) { 
        isValid=false;
        gender.innerHTML='This field is required.'
    } 
    else { 
        gender.innerHTML="";
        isValid=true;             
    } 
    return isValid;
}

function hobbiesValidate(){
    let isValid=true;
    var getSelectedValue = document.querySelector(`input[name="hobbies"]:checked`); 
     let hobbies = document.myForm.hobbies[0].parentElement.previousElementSibling.previousElementSibling
    if(getSelectedValue == null) { 
        isValid=false;
        hobbies.innerHTML='This field is required.';
    } 
    else { 
        hobbies.innerHTML="";
        isValid=true; 
            
    } 
    return isValid;
}

// ------------------------Country Validation------------------
function countryValidate(){
    let isValid=true;
    let country=document.myForm.country;
    let countryValidation=document.myForm.country.previousElementSibling.previousElementSibling;
    if(country.value==""){
        isValid=false;
        countryValidation.innerHTML="This field is required."; 
        stateValidate();
        cityValidate();
    }
    else
    {
        countryValidation.innerHTML="";
        isValid=true;
    }
   return isValid;
}

// ------------------------State Validation------------------
function stateValidate(){
    let isValid=true;
    let state=document.myForm.state;
    let stateValidation=document.myForm.state.previousElementSibling.previousElementSibling;
    if(state.value==""){
        isValid=false;
        stateValidation.innerHTML="This field is required."; 
        cityValidate();
    }
    else
    {
        stateValidation.innerHTML="";
        isValid=true;
        cityValidate();
    }
   return isValid;
}

function cityValidate(){
    let isValid=true;
    let city=document.myForm.city;
    let cityValidation=document.myForm.city.previousElementSibling.previousElementSibling;
    if(city.value==""){
        isValid=false;
        cityValidation.innerHTML="This field is required."; 
    }
    else
    {
        cityValidation.innerHTML="";
        isValid=true;
    }
   return isValid;
}

//---------------------onChange Validation Code----------------------

let nameOnChangeValidate=document.myForm.name;
let emailOnChangeValidate=document.myForm.email;
let genderOnChangeValidate=document.myForm.gender;
let hobbiesOnChangeValidate=document.myForm.hobbies;
let countryOnChangeValidate=document.myForm.country;
let stateOnChangeValidate=document.myForm.state;
let cityOnChangeValidate=document.myForm.city;

nameOnChangeValidate.onblur=nameValidate;
emailOnChangeValidate.onblur=emailValidate;
genderOnChangeValidate.onclick=genderValidate;
hobbiesOnChangeValidate.onclick=hobbiesValidate;
countryOnChangeValidate.onblur=countryValidate;
stateOnChangeValidate.onblur=stateValidate;
cityOnChangeValidate.onblur=cityValidate;

// -------------------Validation Fuctions Call For Submit------------------
function validations(){
            nameValidate();  
            emailValidate();
            genderValidate();
            hobbiesValidate();
            countryValidate();
            stateValidate();
            cityValidate();
            if(nameValidate()==true && emailValidate()==true && genderValidate()==true && hobbiesValidate()==true && countryValidate()==true &&  stateValidate()==true &&  cityValidate()==true)
            {
                return true;
            }
        return false;
}

document.getElementById('btnSubmit').addEventListener('click',function(event){
    event.preventDefault();
    //  if(validate('name','nameError') && validate('email','emailError') && radioButtonValidate('gender','genderError') && radioButtonValidate('hobbies','hobbiesError') && validate('country','countryError') && validate('state','stateError') && validate('city','cityError')){   
        let formDataInsUpd=readFormData();
        if(validations()){
        if(selectedRow==null){
            insertNewRecord([formDataInsUpd]);
            formData.push(formDataInsUpd)
        }
        else if(selectedRow){
            updateRecord(formDataInsUpd);
            console.log(formData)
            document.getElementById('btnSubmit').value='Save';
        }
        resetForm();
       }
        // }
});

//--------------Sorting in Array---------------
let selectSort=document.getElementsByName('sort')[0];
    selectSort.onchange=function(){
        table = document.getElementById("mylist");
        tr = table.getElementsByTagName("tr");
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for(j=0;j<td.length;td++){
                tr[i].style.display = "none";
            } 
        }
    if(selectSort.value=='asc'){
        insertNewRecord(aSort(formData))
    }
    else if(selectSort.value=='desc'){
        insertNewRecord(dSort(formData))
    }
    else
    {
        insertNewRecord(formData)
    }
}

function aSort(Data){
    var byName = Data.slice(0);
    byName.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return byName;
}

function dSort(Data){
    var byName = Data.slice(0);
    byName.sort(function(a,b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x > y ? -1 : x < y ? 1 : 0;
    });
    return byName;
}


//---------------Searching Code-------------------
function search_Record(){
    let searchData=[];
    let input = document.getElementsByName('search')[0];
    let filter=input.value.toLowerCase();
    table = document.getElementById("mylist");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for(j=0;j<td.length;td++){
            tr[i].style.display = "none";
        } 
    }
    formData.forEach((currElem)=>{
        for(let element in currElem){
          if(currElem[element].toString().toLowerCase()==filter){
                searchData.push(currElem);
          }
        }
    })
    if(searchData==""){
        insertNewRecord(formData)
    }
    else{
        insertNewRecord(searchData)
    }
}






