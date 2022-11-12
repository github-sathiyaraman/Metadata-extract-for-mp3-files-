/////////////////////////////// //
// Copyright@SATHIYARAMAN SaRa //
///////////////////////////// //


// create array for store the datas and use data to save file
var dt = new Array();

var songUpload = document.querySelector('#songUpload');

document.addEventListener("change", (event) => {
  console.log(songUpload.files.length);
  for (var z = 0; z < songUpload.files.length; z++) {
    var file = event.target.files[z];
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        try {
          // Array buffer to base64
          const data = tag.tags.picture.data;
          const format = tag.tags.picture.format;
          let base64String = "";
          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }
          // display the all audio files in html 
          const ul = document.getElementById("ul");
          let lines = ` <aside>
        <div id="cover" style="background-image: `+ 'url(data:' + format + ';base64,' + window.btoa(base64String) + ')' + `;"></div>
        <p id="title">`+ tag.tags.title + `</p>
        <p id="artist">`+ tag.tags.artist + `</p>
        <p id="album">`+ tag.tags.album + `</p>
        <p id="genre">`+ tag.tags.genre + `</p>
      </aside>`;
          ul.insertAdjacentHTML("beforeend", lines);


// .slice(0,20) slice 20characters only in view 
// create data file

let print = `
{
name: '`+ tag.tags.title + `',
path: '` + songUpload.value.split(/(\\|\/)/g).pop() + `',
movie: '` + tag.tags.album + `',
cover: '`+ 'data:' + format + ';base64,' + window.btoa(base64String) + `' 
}`;
          dt.push(print);

        }

        catch (error) {
          console.log(error);
        }
// file save 
        uriContent = "data:application/octet-stream," + encodeURIComponent(dt);
        document.getElementById("dlink").innerHTML = "<a href=" + uriContent + " download=\"datas.txt\">Here is the download link</a>";

      }
    })
  }

  console.log(dt);

  alert("Success :)");

})


