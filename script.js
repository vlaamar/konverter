document.getElementById("jsonFile").addEventListener("change", function () {
  this.file = this.files[0];
});

function uploadFile() {
  let file = document.getElementById("jsonFile").file;

  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let json = JSON.parse(e.target.result);
      let csv = jsonToCSV(json);
      downloadCSV(csv);
    };
    reader.readAsText(file);
  }
}

function jsonToCSV(json) {
  let keys = Object.keys(json[0]);
  let csv = keys.join(",") + "\n";

  for (let i = 0; i < json.length; i++) {
    let row = [];
    for (let j = 0; j < keys.length; j++) {
      row.push(json[i][keys[j]]);
    }
    csv += row.join(",") + "\n";
  }

  return csv;
}

function downloadCSV(csv) {
  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();
}
