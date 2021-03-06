document.addEventListener("DOMContentLoaded", () => {
    
    // Activate sidebar nav
    const elems = document.querySelectorAll(".card-action");
    M.cardAction.init(elems);
    loadCard();
   
    function loadCard() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
        
                // Muat daftar tautan menu
                document.querySelectorAll(".card-action").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
                });
        
                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".card-action a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                        var cardAction = document.querySelector(".card-action");
                        M.cardAction.getInstance(cardAction).close();
            
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "#stories1", true);
        xhttp.send();
    }
});

// Load page content
var page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);
  
function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var content = document.querySelector("#body-content");

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "styles/pages/" + page + ".html", true);
    xhttp.send();
}