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


// ホームへ戻る

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


    // 一緒に行った人
    // 最大3人

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


    const weather =
        document.getElementById("weather").value;

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


    document.getElementById(
        "count"
    ).textContent = lives.length;


    const liveList =
        document.getElementById(
            "liveList"
        );


    liveList.innerHTML = "";


    lives.forEach(
        function (live, index) {

            const card =
                document.createElement("div");


            card.className =
                "live-card";


            card.innerHTML = `

                <h3>
                    ${escapeHtml(
                        live.artist || ""
                    )}
                </h3>

                <p>
                    ${escapeHtml(
                        live.tour || ""
                    )}
                </p>

                <p>
                    📅 ${escapeHtml(
                        live.date || ""
                    )}
                </p>

                <p>
                    🕐 ${escapeHtml(
                        live.startTime || ""
                    )}
                </p>

                <p>
                    📍 ${escapeHtml(
                        live.prefecture || ""
                    )}
                    ${escapeHtml(
                        live.venue || ""
                    )}
                </p>

                <button
                    class="detail-button"
                    onclick="showDetail(${index})"
                >
                    ライブ詳細を見る
                </button>

            `;


            liveList.appendChild(card);

        }
    );

}


// ====================
// ライブ詳細画面
// ====================

function showDetail(index) {

    const lives =
        JSON.parse(
            localStorage.getItem("lives")
        ) || [];


    const live =
        lives[index];


    if (!live) {

        alert(
            "ライブ情報が見つかりません。"
        );

        return;

    }


    document.getElementById(
        "home"
    ).style.display = "none";


    document.getElementById(
        "form"
    ).style.display = "none";


    document.getElementById(
        "detail"
    ).style.display = "block";


    renderDetail(live);

}


// ====================
// 詳細画面を作る
// ====================

function renderDetail(live) {

    const detailContent =
        document.getElementById(
            "detailContent"
        );


    // ====================
    // セトリ
    // ====================

    let setlistHTML = "";


    if (
        live.setlist &&
        live.setlist.trim() !== ""
    ) {

        const lines =
            live.setlist
                .split("\n")
                .map(
                    line => line.trim()
                )
                .filter(
                    line => line !== ""
                );


        let songNumber = 0;


        setlistHTML = lines
            .map(line => {

                const isMC =
                    line.includes("MC");


                const isCostume =
                    line.includes(
                        "衣装チェンジ"
                    );


                if (
                    isMC ||
                    isCostume
                ) {

                    return `

                        <div class="setlist-item special">

                            <span class="setlist-special">
                                ${escapeHtml(line)}
                            </span>

                        </div>

                    `;

                }


                songNumber++;


                // 「1. 曲名」の番号を除去

                const songName =
                    line.replace(
                        /^\d+\.\s*/,
                        ""
                    );


                return `

                    <div class="setlist-item">

                        <span class="setlist-number">
                            ${songNumber}
                        </span>

                        <span class="setlist-song">
                            ${escapeHtml(
                                songName
                            )}
                        </span>

                    </div>

                `;

            })
            .join("");

    } else {

        setlistHTML = `

            <p class="empty-message">
                セトリはまだ登録されていません
            </p>

        `;

    }


    // ====================
    // 同行者
    // ====================

    let companionsHTML = "";


    if (
        live.companions &&
        live.companions.length > 0
    ) {

        companionsHTML = `

            <p>
                👥
                ${live.companions
                    .map(
                        person =>
                            escapeHtml(person)
                    )
                    .join(" ・ ")
                }
            </p>

        `;

    }


    // ====================
    // 写真
    // ====================

    let photosHTML = "";


    if (
        live.photos &&
        live.photos.length > 0
    ) {

        photosHTML = `

            <div class="detail-photos">

                ${live.photos
                    .map(
                        photo => `

                            <img
                                src="${photo}"
                                alt="ライブ写真"
                            >

                        `
                    )
                    .join("")}

            </div>

        `;

    } else {

        photosHTML = `

            <p class="empty-message">
                写真はまだ登録されていません
            </p>

        `;

    }


    // ====================
    // 詳細画面HTML
    // ====================

    detailContent.innerHTML = `

        <h2 class="detail-title">
            ${escapeHtml(
                live.artist || "ライブ"
            )}
        </h2>


        <p class="detail-tour">
            ${escapeHtml(
                live.tour || ""
            )}
        </p>


        <!-- 公演情報 -->

        <section class="detail-section">

            <h3>
                🎫 公演情報
            </h3>

            <div class="detail-card">

                <p>
                    📅
                    ${escapeHtml(
                        live.date || "未登録"
                    )}
                </p>

                <p>
                    🕐
                    ${escapeHtml(
                        live.startTime || "未登録"
                    )}
                </p>

                <p>
                    📍
                    ${escapeHtml(
                        live.prefecture || ""
                    )}
                    ${escapeHtml(
                        live.venue || "未登録"
                    )}
                </p>

                <p>
                    👥 出演メンバー：
                    ${escapeHtml(
                        live.members || "未登録"
                    )}
                </p>

                <p>
                    🏟️ キャパ：
                    ${
                        live.capacity
                            ? escapeHtml(
                                live.capacity
                            ) + "人"
                            : "未登録"
                    }
                </p>

                <p>
                    💺 座席：
                    ${escapeHtml(
                        live.seat || "未登録"
                    )}
                </p>

                <p>
                    💰 チケット代：
                    ${
                        live.ticketPrice
                            ? "¥" +
                              escapeHtml(
                                  live.ticketPrice
                              )
                            : "未登録"
                    }
                </p>

            </div>

        </section>


        <!-- セトリ -->

        <section class="detail-section">

            <h3>
                🎵 セトリ
            </h3>

            <div class="setlist">

                ${setlistHTML}

            </div>

        </section>


        <!-- 思い出 -->

        <section class="detail-section">

            <h3>
                🥹 思い出
            </h3>

            <div class="memory-box">

                <h4>
                    感想
                </h4>

                <p>
                    ${
                        live.memo
                            ? escapeHtml(
                                live.memo
                            ).replace(
                                /\n/g,
                                "<br>"
                            )
                            : "感想はまだ登録されていません"
                    }
                </p>


                ${companionsHTML}


                ${
                    live.weather
                        ? `
                            <p>
                                🌤️
                                ${escapeHtml(
                                    live.weather
                                )}
                            </p>
                        `
                        : ""
                }


                ${
                    live.seatPosition
                        ? `
                            <h4>
                                📍 座席位置メモ
                            </h4>

                            <p>
                                ${escapeHtml(
                                    live.seatPosition
                                ).replace(
                                    /\n/g,
                                    "<br>"
                                )}
                            </p>
                        `
                        : ""
                }

            </div>

        </section>


        <!-- 写真 -->

        <section class="detail-section">

            <h3>
                📸 写真
            </h3>

            ${photosHTML}

        </section>

    `;

}


// ====================
// HTMLエスケープ
// ====================

function escapeHtml(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ====================
// 初期表示
// ====================

displayLives();