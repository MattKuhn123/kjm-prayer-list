window.addEventListener("load", async () => {
  const main = document.querySelector("main");
  const mainHTML = main.outerHTML;


  const layoutHeadHTML = await (await (await fetch("/layout/layout-head.html")).blob()).text();
  const layoutBodyHTML = await (await (await fetch("/layout/layout-body.html")).blob()).text();

  document.head.outerHTML = layoutHeadHTML;
  document.body.outerHTML = layoutBodyHTML;
  document.querySelector("#sidebar-content").innerHTML = mainHTML;

  document.querySelector("#sidebar-content").querySelectorAll("h1[id], h2[id]").forEach(header => {
    const a = document.createElement("a");
    a.setAttribute("href", "#" + header.id);
    a.text = header.textContent;
    const li = document.createElement("li");
    li.appendChild(a)
    document.querySelector("#sidebar-nav-menu").appendChild(li);
  });

});