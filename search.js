function execute(keyword, page) {
    const host = "https://vozer.io";
    page = page || 1;

    const searchUrl = `${host}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`;
    const response = fetch(searchUrl);
    if (!response.ok) return null;

    const doc = response.html();
    if (!doc) return null;

    const items = [];
    const list = doc.select(".list-item");
    if (list.empty()) return null;

    list.forEach(e => {
        const cover = e.select("img").attr("data-src") || e.select("img").attr("src") || "";
        const title = e.select(".title a").text();
        const link = e.select(".title a").attr("href");
        const author = e.select(".author").text() || "Đang cập nhật";
        const status = e.select(".status").text() || "";

        items.push({
            name: title,
            link: link.startsWith("http") ? link : host + link,
            cover: cover.startsWith("http") ? cover : host + cover,
            description: `${author}${status ? " • " + status : ""}`,
            host
        });
    });

    const next = doc.select(".pagination .next a").attr("href");
    const nextPage = next ? (next.startsWith("http") ? next : host + next) : null;

    return Response.success(items, nextPage);
}
