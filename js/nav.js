window.addEventListener("load", async (ev) => {
  const nav = document.querySelector("#toolbar-menu");
  const links = await (await fetch("/data/nav.json")).json();
  links.forEach(link => {
    const a = document.createElement("a");
    a.setAttribute("href", link.href);
    a.text = link.text;
    const isExternal = !link.href.startsWith("/");
    if (isExternal) {
      a.setAttribute("target", "_blank");
      a.setAttribute("class", "external");
    } else {
      a.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const target = ev.currentTarget.getAttribute("href");
        await setHtmlFromTarget(target);
      });
    }

    const li = document.createElement("li");
    li.appendChild(a)
    nav.appendChild(li);
  });

  window.addEventListener("popstate", async (ev) => {
    const target = document.location.pathname;
    await setHtmlFromTarget(target);
  });

  const setHtmlFromTarget = async (target) => {
    if (target === "/") {
      return; // TODO
    }

    const html = await (await (await fetch(target)).blob()).text();
    const sidebarContent = document.querySelector("#sidebar-content");
    sidebarContent.innerHTML = html;
    
    const sidebarNavMenu = document.querySelector("#sidebar-nav-menu");
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
    await setHtmlFromTarget(cheat);
  }
});