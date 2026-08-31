// ====================
// アーティストマスタ
// ====================

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


// ====================
// 画面切り替え
// ====================

function showForm() {
    document.getElementById("home").style.display = "none";
    document.getElementById("form").style.display = "block";

    const detail = document.getElementById("detail");

    if (detail) {
        detail.style.display = "none";
    }
}


function showHome() {
    document.getElementById("form").style.display = "none";
    document.getElementById("home").style.display = "block";

    const detail = document.getElementById("detail");

    if (detail) {
        detail.style.display = "none";
    }

    displayLives();
}


// ====================
// ライブ保存
// ====================

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

    // 一緒に行った人（最大3人）
    const companions = [
        document.getElementById("companion1").value,
        document.getElementById("companion2").value,
        document.getElementById("companion3").value
    ].filter(name => name.trim() !== "");

    const weather = document.getElementById("weather").value;
    const seatPosition = document.getElementById("seatPosition").value;


    // ====================
    // 写真
    // ====================

    const photoInput = document.getElementById("photos");

    const files = Array.from(photoInput.files);

    if (files.length > 10) {
        alert("写真は最大10枚まで登録できます！");
        return;
    }

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


    // ====================
    // ライブデータ
    // ====================

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
        seatPosition: seatPosition,

        ticketPrice: ticketPrice,

        setlist: setlist,

        memo: memo,

        companions: companions,

        weather: weather,

        photos: photos

    };


    // ====================
    // 保存
    // ====================

    let lives = JSON.parse(localStorage.getItem("lives")) || [];

    lives.push(live);

    localStorage.setItem("lives", JSON.stringify(lives));


    alert("ライブを保存しました！");

    showHome();

}


// ====================
// ライブ一覧表示
// ====================

function displayLives() {

    const lives = JSON.parse(localStorage.getItem("lives")) || [];

    document.getElementById("count").textContent = lives.length;

    const liveList = document.getElementById("liveList");

    liveList.innerHTML = "";


    lives.forEach(function(live) {

        const card = document.createElement("div");

        card.className = "live-card";


        // 写真
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


        // 同行者
        let companionsHTML = "";

        if (live.companions && live.companions.length > 0) {

            companionsHTML = `
                <p>👥 ${live.companions.join("・")}</p>
            `;

        }


        card.innerHTML = `

            <h3>${live.artist || ""}</h3>

            <p>${live.tour || ""}</p>

            <p>📅 ${live.date || ""}</p>

            <p>🕐 ${live.startTime || ""}</p>

            <p>📍 ${live.prefecture || ""} ${live.venue || ""}</p>

            <p>👤 ${live.members || ""}</p>

            <p>💺 ${live.seat || ""}</p>

            ${companionsHTML}

            <p>🌤️ ${live.weather || ""}</p>

            <p>💰 ¥${live.ticketPrice || ""}</p>

            <p>${live.memo || ""}</p>

            ${photosHTML}

        `;


        liveList.appendChild(card);

    });

}


// ====================
// ライブ詳細画面
// ====================

function showDetail() {

    document.getElementById("home").style.display = "none";

    document.getElementById("form").style.display = "none";

    const detail = document.getElementById("detail");

    if (detail) {
        detail.style.display = "block";
    }

}


// ====================
// 初期表示
// ====================

displayLives();