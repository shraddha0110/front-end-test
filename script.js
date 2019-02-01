document.addEventListener("DOMContentLoaded", function() {
  fetch(
    "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=b70cc739c3f5aa69c88286cd25f27977&gallery_id=72157692049980335&per_page=10&format=json&nojsoncallback=1&auth_token=72157704854141481-7239ed932d317414&api_sig=819b38f9c0a9d51878f1b5ea5529c58b"
  )
    .then(response => response.json())
    .then(data => {
      let totalPics = data.photos.total;
      let currentPage = 1;
      let perPage = data.photos.perpage;
      let totalPages = Math.ceil(totalPics / perPage);

      const prev = document.querySelector("#prev");
      const next = document.querySelector("#next");

      prev.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          changePage(currentPage);
        }
      });

      next.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          changePage(currentPage);
        }
      });

      changePage(1);

      function changePage(currentPage) {
        let output = (document.getElementById("flickr").innerHTML = "");
        let pageNumber = document.getElementById("page");

        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages) currentPage = totalPages;

        for ( let i = (currentPage - 1) * perPage; i < currentPage * perPage; i++) {
          output += `
            <img src="https://farm${data.photos.photo[i].farm}.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}.jpg" alt="${data.photos.photo[i].title}">
            `;
        }

        document.getElementById("flickr").innerHTML += output;
        pageNumber.innerHTML = "Page: " + currentPage;

        if (currentPage == 1) {
          prev.style.visibility = "hidden";
        } else {
          prev.style.visibility = "visible";
        }

        if (currentPage == totalPages) {
          next.style.visibility = "hidden";
        } else {
          next.style.visibility = "visible";
        }
      }
    })
    .catch(err => console.error(err));
});

const current = document.querySelector("#current");
const imgs = document.querySelector(".images");
const modal = document.getElementById("imgModal");
const closeBtn = document.getElementsByClassName("closeBtn")[0];

imgs.addEventListener("click", e => {
  if (e.target.src) {
    e.preventDefault();
    current.src = e.target.src;
    modal.style.display = "block";
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
