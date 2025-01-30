window.addEventListener("load", async (ev) => {
  window.addEventListener("popstate", async (ev) => {
    const target = document.location.pathname;
    await setSideBar(target);
  });

  const setSideBar = async (target) => {
    if (target === "/" || target === "" ) {
      // According to testing, this shouldn't happen.
      // But, still, if target is blank, it makes sense to go to default.
      target = links.find(x => x.default).href;
    }

    const html = await (await (await fetch(target)).blob()).text();
    const sidebarContent = document.querySelector("#sidebar-content");
    sidebarContent.innerHTML = html;
    
    const sidebarNavMenu = document.querySelector("#sidebar-nav-menu");
    sidebarNavMenu.innerHTML = "";
    sidebarContent.querySelectorAll("h1[id], h2[id]").forEach(header => {
      const text = header.textContent;
      const a = document.createElement("a");
      a.setAttribute("href", "#"+header.id);
      a.text = text;
      const li = document.createElement("li");
      li.appendChild(a)
      sidebarNavMenu.appendChild(li);
    });

    history.pushState({ nav: target }, "nav", target);
  }

  const cheat = localStorage.getItem("cheat");
  if (cheat) {
    localStorage.removeItem("cheat");
    await setSideBar(cheat);
  } else {
    // const defaultPage = links.find(x => x.default).href;
    // await setSideBar(defaultPage);
  }
});