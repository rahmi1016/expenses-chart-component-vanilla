async function fetchData() {
  const url = "data.json";
  const response = await fetch(url);
  //wait until the request has been completed
  const datapoints = await response.json();
  return datapoints;
}

fetchData().then((datapoints) => {
  let labels = datapoints.map(function (index) {
    return index.day;
  });
  let data = datapoints.map(function (index) {
    return index.amount;
  });

  var chart = document.getElementById("chart");

  for (var i = 0; i < data.length; i++) {
    var barrow = document.createElement("tr");

    var precent = "%";
    barrow.style.height = data[i] + 0.5 * data[i] + precent;

    //bar color
    var days = ["sun", "tue", "wed", "thu", "fri", "sat", "mon"];
    var d = new Date();
    let currentDay = days[d.getDay()];
    function background() {
      if (labels[i] === currentDay) {
        return "hsl(186, 34%, 60%)";
      } else {
        return "hsl(10, 79%, 65%)";
      }
    }
    barrow.style.background = background();
    chart.appendChild(barrow);

    var prefix = "$";
    var barlabels = document.createElement("th");
    barlabels.setAttribute("scope", "row");
    barlabels.innerText = labels[i];
    var baramount = document.createElement("td");
    var tdspan = document.createElement("span");
    tdspan.innerText = prefix + data[i];
    baramount.appendChild(tdspan);
    barrow.appendChild(barlabels);
    barrow.appendChild(baramount);
  }
});
