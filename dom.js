// fetch("https://restcountries.eu/")
//   .then((data) => {
//     return data.response();
//   })
//   .then((data) => {
//     console.log(data);
//     console.log("hi");
//   });
// console.log("hello");
// async function main() {
//   const url = "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all";
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "1a06dcd420msh55a2cd2e9608ddap1c9cffjsn232b254a8a96",
//       "X-RapidAPI-Host": "ajayakv-rest-countries-v1.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
// main();
// let fetch = require("node-fetch");
async function fetchingCountries() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let data = await response.json();
  //console.log(data[0]);
  return data;

  // let p=document.createElement("p");
  // console.log(data[index].coatOfArms.png);
  // console.log(data[index].name.official);
  // console.log(data[index].population);
  // console.log(data[index].region);
  // if (data[index].capital != undefined) console.log(data[index].capital[0])
}

function creatingCard(data) {
  let container = document.querySelector(".countries");
  if (container.childElementCount === 1) {
    container.removeChild(container.childNodes[0]);
  }
  let row = document.createElement("div");
  row.className =
    "countryData d-flex flex-wrap  ms-md-5 me-md-3 justify-content-center";
  container.appendChild(row);
  for (let index = 0; index < data.length; index++) {
    let eachContainer = document.createElement("div");
    eachContainer.className =
      " col-xl-3 col-lg-6  col-md-12 pe-md-5 ps-md-5 border-0 my-5 eachCard ";
    let outerDiv = document.createElement("div");
    outerDiv.className = "card eachcard ";
    let img = document.createElement("img");
    img.setAttribute("src", data[index].flags.png);
    outerDiv.style.width = "24em";
    let bodyDiv = document.createElement("div");
    bodyDiv.className = "card-body";
    let h5 = document.createElement("h5");
    h5.className = "card-title ms-3 my-3";
    let ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";
    let li1 = document.createElement("li");
    li1.className = "list-group-item border-0 fs-6";
    let li2 = document.createElement("li");
    li2.className = "list-group-item border-0 fs-6";
    let li3 = document.createElement("li");
    li3.className = "list-group-item border-0 fs-6";
    li1.innerHTML = `<strong>Population : </strong> ${data[index].population}`;
    li2.innerHTML = `<strong>Region : </strong> ${data[index].region}`;
    let capital = "NA";
    if (data[index].capital != undefined) capital = data[index].capital[0];
    li3.innerHTML = `<strong>Capital : </strong> ${capital}`;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    h5.appendChild(document.createTextNode(data[index].name.common));
    bodyDiv.appendChild(h5);
    bodyDiv.appendChild(ul);
    outerDiv.appendChild(img);
    outerDiv.appendChild(bodyDiv);
    // console.log(container);
    outerDiv.removeAttribute("style");
    eachContainer.appendChild(outerDiv);
    row.appendChild(eachContainer);
  }
}

function filterByCountry(data, country) {
  let filterCountry = data.filter((obj) => {
    return obj.name.common
      .trim()
      .toLowerCase()
      .includes(country.trim().toLowerCase());
  });
  return filterCountry;
}

async function main() {
  try {
    let data = await fetchingCountries();
    creatingCard(data);
    let dropDown = document.getElementsByClassName("dropdown-item");
    let input = document.getElementsByClassName("form-control");
    // console.log(input);
    input[0].addEventListener("keyup", (data1) => {
      let country = data1.target.value;
      //   console.log(country);
      let filterCountry = filterByCountry(data, country);
      creatingCard(filterCountry);
    });
    //   console.log(dropDown);
    for (let index = 0; index < dropDown.length; index++) {
      dropDown[index].addEventListener("click", () => {
        let region = dropDown[index].innerHTML;
        // console.log(region);
        let regionData = data.filter((obj) => {
          return (
            obj.region.trim().toLowerCase() === region.trim().toLowerCase()
          );
        });
        creatingCard(regionData);
      });
    }
  } catch (e) {
    console.log(e);
  }
  //   if (container.childElementsNode != undefined) {
  //     let row = document.getElementsByClassName("row");
  //     row.remove();
  //   }
}
main();

// fetchingCountries().then(creatingCard);
