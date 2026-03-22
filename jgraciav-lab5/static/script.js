// part 3 Step 1: Variables and Console Output

let x = 5;
let y = 7;
let z = x + y;

console.log(z);

let A = "Hello ";
let B = "world!";
let C = A + B;

console.log(C);



// part 2 step 2
function SumNPrint(x1, x2) {
    let result = x1 + x2;
    console.log(result);
}
SumNPrint(x, y);
SumNPrint(A, B);

// part 3 step 3

if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}


// step 4 part 3

let L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
let L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Banana found!");
        }
    }
}

// findTheBanana(L1);
// findTheBanana(L2);

function forEachLoop(arr) {
    arr.forEach(function(item) {
        if (item === "Banana") {
            alert("Banana found!");
        }
    });
}

// forEachLoop(L1);
// forEachLoop(L2);




// part 4 greeting

// function greetingFunc() {

//     let d = new Date();
//     let h = d.getHours();
//     let greeting = document.getElementById("greeting");

//     // order of conditions
//     if (h < 5 || h >= 20) {
//         greeting.innerHTML = "Good night";
//     } else if (h < 12) {
//         greeting.innerHTML = "Good morning";
//     } else if (h < 18) {
//         greeting.innerHTML = "Good afternoon";
//     } else {
//         greeting.innerHTML = "Good evening";
//     }
// }

// THIS version works and prevents console errors
function greetingFunc() {
    const greeting = document.getElementById("greeting");
    if (!greeting) return; // <-- prevents crash on pages without #greeting
  
    const h = new Date().getHours();
  
    if (h < 5 || h >= 20) {
      greeting.innerHTML = "Good night";
    } else if (h < 12) {
      greeting.innerHTML = "Good morning";
    } else if (h < 18) {
      greeting.innerHTML = "Good afternoon";
    } else {
      greeting.innerHTML = "Good evening";
    }
  }

greetingFunc();


// part 5 add year

function addYear() {
    let year = new Date().getFullYear();

    document.getElementById("copyYear").innerHTML =
        "&copy; " + year + " MuseumName. All rights reserved.";
}

// part 6

function showTickets() {
    const table = document.getElementById("ticketTable");
    const btn = document.getElementById("ticketBtn");
  
    if (table) table.style.display = "table";
    if (btn) btn.style.display = "none";
  }



// function showTickets() {
//     const table = document.getElementById("ticketTable");
//     const btn = document.getElementById("ticketBtn");
  
//     if (table) table.style.display = "table";
//     if (btn) btn.style.display = "none";
//   }

// lab 4 part 3
function showComparison() {

  const section = document.getElementById("comparisonSection");
  const btn = document.getElementById("compareBtn");

  if (!section || !btn) return;

  section.style.display = "block";
  btn.style.display = "none";
}

// part 4

$(document).ready(function() {

  $("#readMoreBtn").click(function() {
    $("#longText").show();
    $("#readMoreBtn").hide();
    $("#readLessBtn").show();
  });

  $("#readLessBtn").click(function() {
    $("#longText").hide();
    $("#readLessBtn").hide();
    $("#readMoreBtn").show();
  });

});

// email validation from lab 4 part 5 option A(referenced from gpt)
async function checkEmailAPI() {
  const emailInput = document.getElementById("email");
  const msg = document.getElementById("emailMsg");
  if (!emailInput || !msg) return;

  const email = emailInput.value.trim();
  msg.textContent = "";

  if (email.length === 0) {
    msg.textContent = "Please enter an email first.";
    return;
  }

  try {
    // Basic API-based validation (format + hints)
    const url = "https://api.mailtoverifier.com/api/v1/verify/single?email=" + encodeURIComponent(email);
    const res = await fetch(url);

    if (!res.ok) throw new Error("Bad response");

    const data = await res.json();

    // The API may return fields like: formatCheck, smtpCheck, etc. (varies by provider)
    // We'll keep it basic:
    if (data.formatCheck === true || data.format_check === true) {
      msg.textContent = "Email looks valid.";
    } else {
      msg.textContent = "Please enter a valid email address.";
    }
  } catch (e) {
    msg.textContent = "Sorry — couldn’t verify email right now. Please try again later.";
  }
}

// Hook up button on pages where it exists
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("checkEmailBtn");
  if (btn) btn.addEventListener("click", checkEmailAPI);
});


// email validation from lab 4 part 5 option B(referenced from gpt)

async function lookupZip() {
  const zipInput = document.getElementById("zipInput");
  const result = document.getElementById("zipResult");
  if (!zipInput || !result) return;

  const zip = zipInput.value.trim();
  result.textContent = ""; // clear old

  // Immediate feedback for invalid input like "12"
  if (!/^\d{5}$/.test(zip)) {
    result.textContent = "Please enter a 5-digit ZIP code.";
    return;
  }

  try {
    const res = await fetch("https://api.zippopotam.us/us/" + zip);

    if (!res.ok) {
      result.textContent = "Sorry — I couldn’t find that ZIP code.";
      return;
    }

    const data = await res.json();
    const place = data.places && data.places[0];

    if (!place) {
      result.textContent = "Sorry — I couldn’t find that ZIP code.";
      return;
    }

    result.textContent = `That ZIP code is ${place["place name"]}, ${place["state abbreviation"]}.`;
  } catch (e) {
    result.textContent = "Network error — please try again.";
  }
};


// lab 4 part 5 option C

async function calcTotal() {
  const typeEl = document.getElementById("ticketType");
  const qtyEl = document.getElementById("ticketQty");
  const msg = document.getElementById("totalMsg");
  if (!typeEl || !qtyEl || !msg) return;

  const qty = Number(qtyEl.value);
  const type = typeEl.value;

  if (!Number.isInteger(qty) || qty < 1) {
    msg.textContent = "Please enter a valid quantity (1 or more).";
    return;
  }

  const url = "../static/prices.json"; // correct for /views/tickets.html
  try {
    const res = await fetch(url);

    if (!res.ok) {
      msg.textContent = `Couldn’t load prices (HTTP ${res.status}) from ${url}`;
      return;
    }

    // Debug: read raw text first
    const raw = await res.text();
    console.log("prices.json raw response:", raw);

    // Parse manually so we can see the error clearly
    const prices = JSON.parse(raw);

    const price = prices[type];
    if (typeof price !== "number") {
      msg.textContent = "Price data missing for that ticket type.";
      return;
    }

    const total = price * qty;
    msg.textContent = `Total: $${total.toFixed(2)} (${qty} × $${price.toFixed(2)})`;
  } catch (e) {
    console.log("calcTotal error:", e);
    msg.textContent = "Couldn’t load ticket prices: " + e.message;
  }
}


// lab 5 part 5

function getAdvice() {

  const adviceEl = document.getElementById("adviceText");
  if (!adviceEl) return;

  fetch("https://api.adviceslip.com/advice")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      adviceEl.textContent = data.slip.advice;
    })
    .catch(error => {
      adviceEl.textContent = "Sorry — couldn’t fetch advice right now. Please try again later.";
      console.log("Advice API error:", error);
    });
}






// 5.1

function loadLeafletMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  if (typeof L === "undefined") {
    console.log("Leaflet did not load.");
    return;
  }

  if (mapElement._leaflet_id) return;

  const museumLat = 40.4443;
  const museumLng = -79.9436;

  const map = L.map("map").setView([museumLat, museumLng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  L.marker([museumLat, museumLng])
    .addTo(map)
    .bindPopup("Museum Location")
    .openPopup();
}

document.addEventListener("DOMContentLoaded", function () {
  loadLeafletMap();
});