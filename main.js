const host = "https://vozer.io";

function home() {
    return [
        { title: "Truyện Mới", input: host + "/danh-sach/truyen-moi", script: "gen.js" },
        { title: "Truyện Full", input: host + "/danh-sach/truyen-full", script: "gen.js" }
    ];
}

function detail(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return {
            name: doc.select("h1.title").text(),
            author: doc.select(".info > div:nth-child(1) a").text(),
            description: doc.select(".desc-text").html(),
            detail: doc.select(".info").html(),
            host: host
        };
    }
}

function content(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return doc.select(".chapter-c").html();
    }
}
