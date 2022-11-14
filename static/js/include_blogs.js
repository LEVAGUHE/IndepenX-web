function includeBlogs() {
  let z, i, elmnt, file, xhttp, result;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-blogs");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          result = this.responseText;
          elmnt.innerHTML += result.replace("${blogs}", getBlogsHTML())
          elmnt.removeAttribute("include-blogs");
        }
      }
      xhttp.open("GET", "/tabs/blogs.html", true);
      xhttp.send();
      return;
    }
  }

}

function getBlogsHTML() {
  let blogs = getBlogs()
  let imgHTML = `
    <div class="carousel-item active container-fluid">
      <div class="row w-100%">
        <div class="col">
          <img class="rounded-1 shadow-lg" src="%path" alt="Argon image" style="width:1000px">
        </div>
        <div class="col">
          <a href="%blogUrl">
            <h5 class="font-weight-bolder mt-10 big-title">%blogTitle</h5>
          </a>
          <p class="mb-4 align-buttom" style="font-size: 3rem;">%blogDescription</p>
        </div>
      </div>
    </div>
  `
  let result = ""
  for (let blog of blogs) {
    result += imgHTML.replace("%path", blog.img)
      .replace("%blogDescription", blog.description)
      .replace("%blogTitle", blog.title)
      .replace("%blogUrl", blog.url)
    imgHTML = imgHTML.replace(" active", "")
  }
  return result;
}

function getBlogs() {
  let blogs = [
    {
      "title": "Soy blog",
      "url": "https://www.google.com",
      "img": "https://images.unsplash.com/photo-1668285410063-4e5f2686b55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "show_in_home": true,
      "description": "Aprende a cocinar como un experto"
    },
    {
      "title": "Soy blog2",
      "url": "https://www.google.com",
      "img": "https://img.freepik.com/foto-gratis/acercamiento-objetos-educacion-economia_23-2149113525.jpg?w=1380&t=st=1668398208~exp=1668398808~hmac=8e51339d46aba1e65a491578192cded638a15bf91df2070e9380478d162e8eec",
      "show_in_home": true,
      "description": "Aprende a manejar tus finanzas"
    },
    {
      "title": "Soy blog3",
      "url": "https://www.google.com",
      "img": "https://img.freepik.com/foto-gratis/acercamiento-objetos-educacion-economia_23-2149113525.jpg?w=1380&t=st=1668398208~exp=1668398808~hmac=8e51339d46aba1e65a491578192cded638a15bf91df2070e9380478d162e8eec",
      "show_in_home": false,
      "description": "Aprende a ahorrar como un profesional"
    },
    {
      "title": "Soy blog4",
      "url": "https://www.google.com",
      "img": "https://img.freepik.com/foto-gratis/retrato-joven-tranquilo-feliz-caucasico-ajuste-delgado-mujer-cultivo-cami-top-pantalones-conjunto-sienta-solo-rocoso-playa-tropical-al-atardecer_343596-704.jpg?w=1380&t=st=1668398245~exp=1668398845~hmac=cfe31be803c24283b116042e05b0509fb2e134d3a617bb2458118b4b52661bdf",
      "show_in_home": true,
      "description": "Aprende a vivir tranquilo"
    },
  ]

  let active_blogs = blogs.filter(blog => blog.show_in_home == true)
  return active_blogs
}
