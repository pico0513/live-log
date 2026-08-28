// アーティストマスタ
const artists = [
    {
        id: 1,
        name: "浦島坂田船",
        displayName: "浦島坂田船",
        color: "#4CAF50",
        group: "浦島坂田船"
    },
    {
        id: 2,
        name: "うらたぬき",
        displayName: "うらたぬき",
        color: "#55C85A",
        group: "浦島坂田船"
    },
    {
        id: 3,
        name: "志麻",
        displayName: "志麻",
        color: "#A66DD4",
        group: "浦島坂田船"
    },
    {
        id: 4,
        name: "となりの坂田。",
        displayName: "となりの坂田。",
        color: "#E53935",
        group: "浦島坂田船"
    },
    {
        id: 5,
        name: "センラ",
        displayName: "センラ",
        color: "#F4C542",
        group: "浦島坂田船"
    }
];

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