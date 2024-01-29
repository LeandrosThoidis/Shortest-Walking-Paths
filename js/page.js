document.getElementById("image2").src =
  "/public/img/route/" + value + "/step/1.jpeg";
document.getElementById("btn4").href = "/pages/route_preview.html?" + value;

function right() {
  step = Number(step) + 1;
  result = data[search].instruction[step - 1];
  result1 = data[search].info[step - 1];

  if (step > data[search].page_limit) {
    var same = data[search].page_limit;
    document.getElementById("image2").src =
      "/public/img/route/" + value + "/step/" + same + ".jpeg";
    step = same;
    result1 = data[search].info[step - 1];
  } else {
    document.getElementById("image2").src =
      "/public/img/route/" + value + "/step/" + step + ".jpeg";
    document.getElementById("p1").innerHTML = result;
  }
}

function left() {
  step = Number(step) - 1;
  result = data[search].instruction[step - 1];
  result1 = data[search].info[step - 1];

  if (step < 1) {
    document.getElementById("image2").src =
      "/public/img/route/" + value + "/step/1.jpeg";
    step = 1;
    result1 = data[search].info[step - 1];
  } else {
    document.getElementById("image2").src =
      "/public/img/route/" + value + "/step/" + step + ".jpeg";
    document.getElementById("p1").innerHTML = result;
  }
}

function info() {
  if (result1 == null) {
    Swal.fire({
      html: "<p style=text-align:center;font-size:1.34rem;color:#595959;margin:0px>Traffic busy zone please pay attention</p>",
      icon: "warning",
      background: "white",
      iconColor: "red",
      showCancelButton: false,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      html: result1,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }
}
