alert("新しいscript.jsが読み込まれています！");

function showForm() {
    document.getElementById("home").style.display = "none";
    document.getElementById("form").style.display = "block";
}

function showHome() {
    document.getElementById("form").style.display = "none";
    document.getElementById("home").style.display = "block";
}

function saveLive() {

    const artist = document.getElementById("artist").value;
    const tour = document.getElementById("tour").value;
    const date = document.getElementById("date").value;
    const venue = document.getElementById("venue").value;
    const ticketPrice = document.getElementById("ticketPrice").value;
    const memo = document.getElementById("memo").value;

    const live = {
        artist: artist,
        tour: tour,
        date: date,
        venue: venue,
        ticketPrice: ticketPrice,
        memo: memo
    };

    let lives = JSON.parse(localStorage.getItem("lives")) || [];

    lives.push(live);

    localStorage.setItem("lives", JSON.stringify(lives));

    alert("ライブを保存しました！");

    showHome();

    displayLives();
}

function displayLives() {

    const lives = JSON.parse(localStorage.getItem("lives")) || [];

    document.getElementById("count").textContent = lives.length;

    const liveList = document.getElementById("liveList");

    liveList.innerHTML = "";

    lives.forEach(function(live) {

        const card = document.createElement("div");

        card.className = "live-card";

        card.innerHTML = `
            <h3>${live.artist}</h3>
            <p>${live.tour}</p>
            <p>📅 ${live.date}</p>
            <p>📍 ${live.venue}</p>
            <p>💰 ¥${live.ticketPrice}</p>
            <p>${live.memo}</p>
        `;

        liveList.appendChild(card);
    });
}

displayLives();