window.addEventListener("load", (ev) => {
  localStorage.setItem("cheat", document.location.pathname);
  window.location = document.location.origin;
});