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

    const home =
        document.getElementById("home");

    const form =
        document.getElementById("form");

    const detail =
        document.getElementById("detail");

    const stats =
        document.getElementById("stats");


    if (home) {
        home.style.display = "none";
    }

    if (form) {
        form.style.display = "none";
    }

    if (detail) {
        detail.style.display = "none";
    }

    if (stats) {
        stats.style.display = "none";
    }

}


// ====================
// 登録画面
// ====================

function showForm() {

    hideAllScreens();

    document.getElementById("form").style.display =
        "block";

}


// ====================
// ホーム画面
// ====================

function showHome() {

    hideAllScreens();

    document.getElementById("home").style.display =
        "block";

    displayLives();

}


// ====================
// 統計画面
// ====================

function showStats() {

    hideAllScreens();

    document.getElementById("stats").style.display =
        "block";

    updateStats();

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
    // 最大3人
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

    ].filter(function (name) {

        return name.trim() !== "";

    });


    // ====================
    // 天気
    // ====================

    const weather =
        document.getElementById("weather").value;


    // ====================
    // 座席位置
    // ====================

    const seatPosition =
        document
            .getElementById("seatPosition")
            .value;


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

            files.map(function (file) {

                return new Promise(
                    function (resolve, reject) {

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


    // ====================
    // 総公演数
    // ====================

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


    // ====================
    // 新しいライブを上に表示
    // ====================

    lives
        .slice()
        .reverse()
        .forEach(function (live) {


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
                    📅 ${live.date || ""}
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

            `;


            liveList.appendChild(card);

        });

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
                    function (a, b) {

                        return b[1] - a[1];

                    }
                );


        if (sortedArtists.length === 0) {

            artistStats.innerHTML =
                "まだライブの記録がありません";

        } else {

            artistStats.innerHTML =
                sortedArtists
                    .map(function (item) {

                        const name =
                            item[0];

                        const count =
                            item[1];


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
                    function (a, b) {

                        return Number(b[0]) -
                               Number(a[0]);

                    }
                );


        if (sortedYears.length === 0) {

            yearStats.innerHTML =
                "まだライブの記録がありません";

        } else {

            yearStats.innerHTML =
                sortedYears
                    .map(function (item) {

                        const year =
                            item[0];

                        const count =
                            item[1];


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


    // ====================
    // 都道府県別
    // ====================

    const prefectureStats =
        document.getElementById(
            "prefectureStats"
        );


    if (prefectureStats) {

        const prefectureCount = {};


        lives.forEach(function (live) {

            const prefecture =
                live.prefecture;


            if (!prefecture) {
                return;
            }


            if (!prefectureCount[prefecture]) {

                prefectureCount[prefecture] = 0;

            }


            prefectureCount[prefecture]++;

        });


        const sortedPrefectures =
            Object.entries(prefectureCount)
                .sort(
                    function (a, b) {

                        return b[1] - a[1];

                    }
                );


        if (sortedPrefectures.length === 0) {

            prefectureStats.innerHTML =
                "まだ都道府県の記録がありません";

        } else {

            prefectureStats.innerHTML =
                sortedPrefectures
                    .map(function (item) {

                        const name =
                            item[0];

                        const count =
                            item[1];


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
    // 会場別
    // ====================

    const venueStats =
        document.getElementById(
            "venueStats"
        );


    if (venueStats) {

        const venueCount = {};


        lives.forEach(function (live) {

            const venue =
                live.venue;


            if (!venue) {
                return;
            }


            if (!venueCount[venue]) {

                venueCount[venue] = 0;

            }


            venueCount[venue]++;

        });


        const sortedVenues =
            Object.entries(venueCount)
                .sort(
                    function (a, b) {

                        return b[1] - a[1];

                    }
                );


        if (sortedVenues.length === 0) {

            venueStats.innerHTML =
                "まだ会場の記録がありません";

        } else {

            venueStats.innerHTML =
                sortedVenues
                    .map(function (item) {

                        const name =
                            item[0];

                        const count =
                            item[1];


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

}


// ====================
// ライブ詳細画面
// ====================

function showDetail() {

    hideAllScreens();


    document.getElementById("detail")
        .style.display = "block";


    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    const detailContent =
        document.getElementById(
            "detailContent"
        );


    if (!detailContent) {
        return;
    }


    if (lives.length === 0) {

        detailContent.innerHTML = `

            <h2>
                ライブ詳細
            </h2>

            <p>
                まだライブの記録がありません。
            </p>

        `;

        return;

    }


    // 最新のライブ

    const live =
        lives[lives.length - 1];


    detailContent.innerHTML = `

        <h1>
            ${live.artist || ""}
        </h1>

        <p>
            ${live.tour || ""}
        </p>


        <h2>
            🎫 公演情報
        </h2>


        <p>
            📅 ${live.date || ""}
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
                        function (line) {

                            return `<p>${line}</p>`;

                        }
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
                        👥
                        ${live.companions.join("・")}
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

        </div>

    `;

}


// ====================
// 初期表示
// ====================

displayLives();