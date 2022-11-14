function includeInmuebles() {
  let z, i, elmnt, file, xhttp, result;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-inmuebles");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          result = this.responseText;
          elmnt.innerHTML += result.replace("${inmuebles}", getInmuebles())
          elmnt.removeAttribute("include-inmuebles");
        }
      }
      xhttp.open("GET", "/tabs/properties.html", true);
      xhttp.send();
      return;
    }
  }

}

function getInmuebles() {
  let directory = '/static/img/inmuebles/';
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', directory, false);
  xmlHttp.send();
  let ret = xmlHttp.responseText;
  let parser = new DOMParser();
  let htmlDoc = parser.parseFromString(ret, 'text/html');
  let classes = "icon icon icon-jpg icon-image"
  let images = htmlDoc.getElementsByClassName(classes)
  let imgHTML = `
    <div class="carousel-item active">
      <img src="path" class="d-block w-100" alt="inmueble">
    </div>
  `
  let result = ""
  for(let image of images){
    result += imgHTML.replace("path", image.getAttribute("href"))
    imgHTML = imgHTML.replace(" active", "")
  }
  return result;
}
