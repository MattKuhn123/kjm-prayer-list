window.addEventListener("load", async (ev) => {
  const nav = document.querySelector("#toolbar-menu");
  const links = await (await fetch("./data/nav.json")).json();
  links.forEach(link => {
    const a = document.createElement("a");
    a.setAttribute("href", link.href);
    a.text = link.text;
    if (link.external) {
      a.setAttribute("target", "_blank");
      a.setAttribute("class", "external");
    } else {
      a.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const target = ev.currentTarget.getAttribute("href");
        const html = await (await (await fetch(target)).blob()).text();
        const sidebarContent = document.querySelector("#sidebar-content");
        sidebarContent.innerHTML = html;
      });
    }

    const li = document.createElement("li");
    li.appendChild(a)

    nav.appendChild(li);
  });
});