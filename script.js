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

function hideAllScreens() {

    const home = document.getElementById("home");
    const form = document.getElementById("form");
    const detail = document.getElementById("detail");
    const stats = document.getElementById("stats");

    if (home) home.style.display = "none";
    if (form) form.style.display = "none";
    if (detail) detail.style.display = "none";
    if (stats) stats.style.display = "none";

}


// ====================
// 登録画面
// ====================

function showForm() {

    hideAllScreens();

    document.getElementById("form").style.display = "block";

}


// ====================
// ホーム画面
// ====================

function showHome() {

    hideAllScreens();

    document.getElementById("home").style.display = "block";

    displayLives();

    updateHome();

}


// ====================
// 統計画面
// ====================

function showStats() {

    hideAllScreens();

    document.getElementById("stats").style.display = "block";

    updateStats();

}


// ====================
// 日付をDateに変換
// ====================

function createDate(dateString) {

    if (!dateString) {
        return null;
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return null;
    }

    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}


// ====================
// 今日の日付
// ====================

function getToday() {

    const today = new Date();

    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

}


// ====================
// 日付の差を計算
// ====================

function getDaysDifference(date1, date2) {

    const oneDay = 1000 * 60 * 60 * 24;

    return Math.round(
        (date1 - date2) / oneDay
    );

}


// ====================
// 日付表示
// ====================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    return `${parts[0]}/${parts[1]}/${parts[2]}`;

}


// ====================
// ホーム画面更新
// ====================

function updateHome() {

    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    const today =
        getToday();


    // ====================
    // NEXT LIVE
    // ====================

    const futureLives =
        lives
            .filter(function (live) {

                const date =
                    createDate(live.date);

                return date && date >= today;

            })
            .sort(function (a, b) {

                return createDate(a.date)
                    - createDate(b.date);

            });


    const nextCard =
        document.querySelector(
            ".next-live-card"
        );


    if (nextCard) {

        if (futureLives.length === 0) {

            nextCard.innerHTML = `

                <p class="days">
                    次のライブ予定はありません
                </p>

                <h2>
                    💛 NEXT LIVE
                </h2>

                <p class="tour-name">
                    ライブを記録するとここに表示されます
                </p>

            `;

        } else {

            const nextLive =
                futureLives[0];


            const nextDate =
                createDate(nextLive.date);


            const days =
                getDaysDifference(
                    nextDate,
                    today
                );


            const artistData =
                artists.find(
                    artist =>
                        artist.name ===
                        nextLive.artist
                );


            const color =
                artistData
                    ? artistData.color
                    : "#f4c400";


            nextCard.innerHTML = `

                <p class="days">
                    あと
                    <span style="color:${color}">
                        ${days}
                    </span>
                    日
                </p>

                <h2>
                    ${nextLive.artist || ""}
                </h2>

                <p class="tour-name">
                    ${nextLive.tour || ""}
                </p>

                <p class="live-info">

                    📅 ${formatDate(nextLive.date)}<br>

                    🕕 ${nextLive.startTime || ""}<br>

                    📍 ${nextLive.prefecture || ""}
                    ${nextLive.venue || ""}

                </p>

                <button
                    class="detail-button"
                    onclick="showDetailByIndex(${lives.indexOf(nextLive)})">

                    ライブ詳細を見る

                </button>

            `;

        }

    }


    // ====================
    // LAST LIVE
    // ====================

    const pastLives =
        lives
            .filter(function (live) {

                const date =
                    createDate(live.date);

                return date && date < today;

            })
            .sort(function (a, b) {

                return createDate(b.date)
                    - createDate(a.date);

            });


    const lastSection =
        document.querySelectorAll(
            ".home-section"
        )[1];


    if (lastSection) {

        const card =
            lastSection.querySelector(
                ".simple-card"
            );


        if (card) {

            if (pastLives.length === 0) {

                card.innerHTML = `

                    <p>
                        まだライブの記録がありません
                    </p>

                `;

            } else {

                const lastLive =
                    pastLives[0];


                const lastDate =
                    createDate(lastLive.date);


                const days =
                    getDaysDifference(
                        today,
                        lastDate
                    );


                card.innerHTML = `

                    <p class="days">

                        前のライブから
                        <strong>
                            ${days}
                        </strong>
                        日

                    </p>

                    <p>
                        ${lastLive.artist || ""}
                        ／
                        ${lastLive.tour || ""}
                    </p>

                    <p>
                        📅 ${formatDate(lastLive.date)}
                    </p>

                    <button
                        class="detail-button"
                        onclick="showDetailByIndex(${lives.indexOf(lastLive)})">

                        ライブ詳細を見る

                    </button>

                `;

            }

        }

    }


    // ====================
    // ON THIS DAY
    // ====================

    const onThisDaySection =
        document.querySelectorAll(
            ".home-section"
        )[2];


    if (onThisDaySection) {

        const card =
            onThisDaySection.querySelector(
                ".simple-card"
            );


        if (card) {

            const lastYear =
                today.getFullYear() - 1;


            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");


            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");


            const targetDate =
                `${lastYear}-${month}-${day}`;


            const memories =
                lives.filter(
                    live =>
                        live.date === targetDate
                );


            if (memories.length === 0) {

                card.innerHTML = `

                    <h2>
                        🥹 1年前の今日は…
                    </h2>

                    <p>
                        この日のライブ記録はありません
                    </p>

                `;

            } else {

                const memory =
                    memories[0];


                card.innerHTML = `

                    <h2>
                        🥹 1年前の今日は…
                    </h2>

                    <p>
                        ${memory.artist || ""}
                        ／
                        ${memory.tour || ""}
                    </p>

                    <p>
                        📅 ${formatDate(memory.date)}
                    </p>

                    <button
                        class="detail-button"
                        onclick="showDetailByIndex(${lives.indexOf(memory)})">

                        ライブ詳細を見る

                    </button>

                `;

            }

        }

    }

}


// ====================
// ライブ保存
// ====================

async function saveLive() {

    const artist =
        document.getElementById("artist").value;

    const tour =
        document.getElementById("tour").value;

    const date =
        document.getElementById("date").value;

    const startTime =
        document.getElementById("startTime").value;

    const prefecture =
        document.getElementById("prefecture").value;

    const venue =
        document.getElementById("venue").value;

    const capacity =
        document.getElementById("capacity").value;

    const members =
        document.getElementById("members").value;

    const seat =
        document.getElementById("seat").value;

    const ticketPrice =
        document.getElementById("ticketPrice").value;

    const setlist =
        document.getElementById("setlist").value;

    const memo =
        document.getElementById("memo").value;


    // ====================
    // 一緒に行った人
    // ====================

    const companions = [

        document
            .getElementById("companion1")
            .value,

        document
            .getElementById("companion2")
            .value,

        document
            .getElementById("companion3")
            .value

    ].filter(
        name => name.trim() !== ""
    );


    // ====================
    // 天気
    // ====================

    const weather =
        document.getElementById("weather").value;


    // ====================
    // 座席位置メモ
    // ====================

    const seatPosition =
        document.getElementById("seatPosition").value;


    // ====================
    // 写真
    // ====================

    const photoInput =
        document.getElementById("photos");

    const files =
        Array.from(photoInput.files);


    if (files.length > 10) {

        alert(
            "写真は最大10枚まで登録できます！"
        );

        return;

    }


    const photos =
        await Promise.all(

            files.map(file => {

                return new Promise(
                    (resolve, reject) => {

                        const reader =
                            new FileReader();

                        reader.onload =
                            function () {

                                resolve(
                                    reader.result
                                );

                            };

                        reader.onerror =
                            function () {

                                reject(
                                    reader.error
                                );

                            };

                        reader.readAsDataURL(file);

                    }
                );

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

    let lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    lives.push(live);


    localStorage.setItem(
        "lives",
        JSON.stringify(lives)
    );


    alert(
        "ライブを保存しました！"
    );


    showHome();

}


// ====================
// ライブ一覧表示
// ====================

function displayLives() {

    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    const count =
        document.getElementById("count");


    if (count) {

        count.textContent =
            lives.length;

    }


    const liveList =
        document.getElementById("liveList");


    if (!liveList) {
        return;
    }


    liveList.innerHTML = "";


    lives
        .slice()
        .reverse()
        .forEach(function (live, reversedIndex) {

            const originalIndex =
                lives.length - 1 - reversedIndex;


            const card =
                document.createElement("div");

            card.className =
                "live-card";


            card.innerHTML = `

                <h3>
                    ${live.artist || ""}
                </h3>

                <p>
                    ${live.tour || ""}
                </p>

                <p>
                    📅 ${formatDate(live.date)}
                </p>

                <p>
                    🕐 ${live.startTime || ""}
                </p>

                <p>
                    📍 ${live.prefecture || ""}
                    ${live.venue || ""}
                </p>

                ${
                    live.members
                    ? `<p>👥 ${live.members}</p>`
                    : ""
                }

                ${
                    live.seat
                    ? `<p>💺 ${live.seat}</p>`
                    : ""
                }

                ${
                    live.weather
                    ? `<p>🌤️ ${live.weather}</p>`
                    : ""
                }

                ${
                    live.ticketPrice
                    ? `<p>💰 ¥${live.ticketPrice}</p>`
                    : ""
                }

                ${
                    live.companions &&
                    live.companions.length > 0
                    ? `<p>👥 ${live.companions.join("・")}</p>`
                    : ""
                }

                ${
                    live.memo
                    ? `<p>${live.memo}</p>`
                    : ""
                }

                <button
                    class="detail-button"
                    onclick="showDetailByIndex(${originalIndex})">

                    ライブ詳細を見る

                </button>

            `;


            liveList.appendChild(card);

        });

}


// ====================
// 指定したライブの詳細
// ====================

function showDetailByIndex(index) {

    hideAllScreens();

    document.getElementById("detail").style.display = "block";


    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    const live =
        lives[index];


    const detailContent =
        document.getElementById("detailContent");


    if (!detailContent || !live) {
        return;
    }


    detailContent.innerHTML = `

        <h1 class="detail-title">
            ${live.artist || ""}
        </h1>

        <p class="detail-tour">
            ${live.tour || ""}
        </p>


        <h2>
            🎫 公演情報
        </h2>


        <p>
            📅 ${formatDate(live.date)}
        </p>

        <p>
            🕐 ${live.startTime || ""}
        </p>

        <p>
            📍 ${live.prefecture || ""}
            ${live.venue || ""}
        </p>


        ${
            live.members
            ? `<p>👥 出演メンバー：${live.members}</p>`
            : ""
        }


        ${
            live.capacity
            ? `<p>🏟️ キャパ：${live.capacity}人</p>`
            : ""
        }


        ${
            live.seat
            ? `<p>💺 座席：${live.seat}</p>`
            : ""
        }


        ${
            live.ticketPrice
            ? `<p>💰 チケット代：¥${live.ticketPrice}</p>`
            : ""
        }


        <h2>
            🎵 セトリ
        </h2>


        <div class="detail-card">

            ${
                live.setlist
                ? live.setlist
                    .split("\n")
                    .map(
                        line =>
                            `<p>${line}</p>`
                    )
                    .join("")
                : "まだセトリが登録されていません"
            }

        </div>


        <h2>
            🥹 思い出
        </h2>


        <div class="detail-card">


            ${
                live.memo
                ? `
                    <h3>感想</h3>

                    <p>
                        ${live.memo}
                    </p>
                  `
                : ""
            }


            ${
                live.companions &&
                live.companions.length > 0
                ? `
                    <p>
                        👥 ${live.companions.join("・")}
                    </p>
                  `
                : ""
            }


            ${
                live.weather
                ? `
                    <p>
                        🌤️ ${live.weather}
                    </p>
                  `
                : ""
            }


            ${
                live.seatPosition
                ? `
                    <h3>
                        📍 座席位置メモ
                    </h3>

                    <p>
                        ${live.seatPosition}
                    </p>
                  `
                : ""
            }


            ${
                live.photos &&
                live.photos.length > 0
                ? `

                    <h3>
                        📷 写真
                    </h3>

                    <div class="photo-grid">

                        ${
                            live.photos
                                .map(
                                    photo =>
                                        `<img
                                            src="${photo}"
                                            alt="ライブ写真"
                                        >`
                                )
                                .join("")
                        }

                    </div>

                  `
                : ""
            }

        </div>

    `;

}


// ====================
// 旧 showDetail() 互換
// ====================

function showDetail() {

    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    if (lives.length === 0) {

        hideAllScreens();

        document.getElementById("detail").style.display =
            "block";

        document.getElementById("detailContent").innerHTML = `

            <h2>
                ライブ詳細
            </h2>

            <p>
                まだライブの記録がありません。
            </p>

        `;

        return;

    }


    showDetailByIndex(
        lives.length - 1
    );

}


// ====================
// 統計更新
// ====================

function updateStats() {

    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    // ====================
    // 総参戦公演数
    // ====================

    const statsTotal =
        document.getElementById("statsTotal");


    if (statsTotal) {

        statsTotal.textContent =
            lives.length;

    }


    // ====================
    // アーティスト別
    // ====================

    const artistStats =
        document.getElementById("artistStats");


    if (artistStats) {

        if (lives.length === 0) {

            artistStats.innerHTML =
                "まだライブの記録がありません";

        } else {

            const artistCount = {};


            lives.forEach(function (live) {

                const name =
                    live.artist || "その他";


                if (!artistCount[name]) {

                    artistCount[name] = 0;

                }


                artistCount[name]++;

            });


            const sortedArtists =
                Object.entries(artistCount)
                    .sort(
                        (a, b) => b[1] - a[1]
                    );


            artistStats.innerHTML =
                sortedArtists
                    .map(function ([name, count]) {

                        return `

                            <div class="stat-row">

                                <span>
                                    ${name}
                                </span>

                                <strong>
                                    ${count}公演
                                </strong>

                            </div>

                        `;

                    })
                    .join("");

        }

    }


    // ====================
    // 年別
    // ====================

    const yearStats =
        document.getElementById("yearStats");


    if (yearStats) {

        if (lives.length === 0) {

            yearStats.innerHTML =
                "まだライブの記録がありません";

        } else {

            const yearCount = {};


            lives.forEach(function (live) {

                if (!live.date) {
                    return;
                }


                const year =
                    live.date.substring(0, 4);


                if (!yearCount[year]) {

                    yearCount[year] = 0;

                }


                yearCount[year]++;

            });


            const sortedYears =
                Object.entries(yearCount)
                    .sort(
                        (a, b) =>
                            Number(b[0]) -
                            Number(a[0])
                    );


            yearStats.innerHTML =
                sortedYears
                    .map(function ([year, count]) {

                        return `

                            <div class="stat-row">

                                <span>
                                    ${year}
                                </span>

                                <strong>
                                    ${count}公演
                                </strong>

                            </div>

                        `;

                    })
                    .join("");

        }

    }

}


// ====================
// 初期表示
// ====================

displayLives();

updateHome();