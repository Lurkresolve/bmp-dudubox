// watermark.js
const u = (e, l) => {
    const d = "1";
    document.getElementById(d) !== null && document.body.removeChild(document.getElementById(d));
    const i = document.createElement("canvas");
    i.width = 210,
    i.height = 210;
    const o = i.getContext("2d");
    o.rotate(-20 * Math.PI / 180),
    o.font = "18px Vedana",
    o.fillStyle = "rgba(200, 200, 200, 1)",
    l !== null && l.length > 0 && (o.fillStyle = l),
    o.textBaseline = "middle";
    let a = e.split("#")
        , m = ""
        , c = [];
    for (let n = 0; n < a.length; n++)
        c.push(m),
        m = "",
        m += a[n];
    c.push(m);
    for (let n = 0; n < c.length; n++)
        o.fillText(c[n], i.width / 10, 26 * (n + 1));
    const t = document.createElement("div");
    return t.id = d,
    t.style.pointerEvents = "none",
    t.style.top = "0px",
    t.style.left = "0px",
    t.style.position = "fixed",
    t.style.zIndex = "10000000",
    t.style.width = `${document.documentElement.clientWidth}px`,
    t.style.height = `${document.documentElement.clientHeight}px`,
    t.style.background = `url(${i.toDataURL("image/png")}) left top repeat`,
    document.body.appendChild(t),
    d
}
const s = {
    set: e => {
        let l = u(e, null);
        document.getElementById(l) === null && (l = u(e, null))
    },
    setColor: (e, l) => {
        let d = u(e, l);
        document.getElementById(d) === null && (d = u(e, l))
    },
    del: () => {
        let e = "1";
        document.getElementById(e) !== null && document.body.removeChild(document.getElementById(e))
    }
}
const water = s;
