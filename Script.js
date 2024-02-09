window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});
window.addEventListener("load", async (event) => {
    console.log("load")
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const chars = key.split('.');
        let jsonCurrent = langData;
        console.log(langData)
        console.log(key)
        console.log(chars)
        for(let i = 0;i<chars.length;i++){
            jsonCurrent = jsonCurrent[chars[i]];
            console.log(jsonCurrent)
        }
        element.textContent = jsonCurrent;
    });
}
function fetchLanguageData(lang) {
    let response;
    if(lang == "fr"){
        response = jQuery.getJSON("./languages/fr.json");
    } else{
        response = jQuery.getJSON("./languages/en.json");
    }
    return response;
}
function changeLanguage() {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    let lang;
    if(userPreferredLanguage == "en"){
        lang = "fr";
    } else{
        lang = "en";
    }
    setLanguagePreference(lang);
    const langData = fetchLanguageData(lang);
    updateContent(langData);
}
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

//for image zoom
function zoomImage(position) {
    const image = document.getElementsByClassName('zoomedImage')[position];
      image.classList.toggle('zoomed');
}
  //pour le sticky header
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}