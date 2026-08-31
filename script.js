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

async function saveLive() {

    const artist = document.getElementById("artist").value;
    const tour = document.getElementById("tour").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const prefecture = document.getElementById("prefecture").value;
    const venue = document.getElementById("venue").value;
    const capacity = document.getElementById("capacity").value;
    const members = document.getElementById("members").value;
    const seat = document.getElementById("seat").value;
    const ticketPrice = document.getElementById("ticketPrice").value;
    const setlist = document.getElementById("setlist").value;
    const memo = document.getElementById("memo").value;
    const companions = [
    document.getElementById("companion1").value,
    document.getElementById("companion2").value,
    document.getElementById("companion3").value
].filter(name => name.trim() !== "");
    const weather = document.getElementById("weather").value;
    const seatPosition = document.getElementById("seatPosition").value;

    // 写真を取得
    const photoInput = document.getElementById("photos");
    const files = Array.from(photoInput.files);

    // 最大10枚
    if (files.length > 10) {
        alert("写真は最大10枚まで登録できます！");
        return;
    }

    // 写真をBase64に変換
    const photos = await Promise.all(
        files.map(file => {
            return new Promise((resolve, reject) => {

                const reader = new FileReader();

                reader.onload = function () {
                    resolve(reader.result);
                };

                reader.onerror = function () {
                    reject(reader.error);
                };

                reader.readAsDataURL(file);
            });
        })
    );

    // ライブ情報
    const live = {
        artist: artist,
        tour: tour,
        date: date,
        startTime: startTime,
        prefecture: prefecture,
        venue: venue,
        capacity: capacity,
        members: members,
        seat: seat,
        ticketPrice: ticketPrice,
        setlist: setlist,
        memo: memo,
        companions: companions,
        weather: weather,
        seatPosition: seatPosition,
        photos: photos
    };

    // 保存済みライブを取得
    let lives = JSON.parse(localStorage.getItem("lives")) || [];

    // 追加
    lives.push(live);

    // 保存
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

        let photosHTML = "";

        if (live.photos && live.photos.length > 0) {

            photosHTML = `
                <div class="live-photos">
                    ${live.photos.map(photo => `
                        <img src="${photo}" alt="ライブ写真">
                    `).join("")}
                </div>
            `;

        }

        card.innerHTML = `

            <h3>${live.artist || ""}</h3>

            <p>${live.tour || ""}</p>

            <p>📅 ${live.date || ""}</p>

            <p>🕐 ${live.startTime || ""}</p>

            <p>📍 ${live.prefecture || ""} ${live.venue || ""}</p>

            <p>👥 ${live.members || ""}</p>

            <p>💺 ${live.seat || ""}</p>

            <p>💰 ¥${live.ticketPrice || ""}</p>

            <p>🌤️ ${live.weather || ""}</p>

            <p>${live.memo || ""}</p>

            ${photosHTML}

        `;

        liveList.appendChild(card);

    });

}


function showDetail() {
    document.getElementById("home").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("detail").style.display = "block";
}