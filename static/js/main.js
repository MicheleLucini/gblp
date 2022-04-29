var $btnMenu;
var $motto;
var isMenuOpen = false;

(function () {
  $btnMenu = document.getElementById("btnMenu");
  $btnMenu.addEventListener("click", toggleMenu);

  $motto = document.getElementById("motto");
  document.addEventListener("scroll", onDocumentScoll, false);
})();

function toggleMenu() {
  $btnMenu.classList.toggle("open");
  $btnMenu.classList.toggle("close");
  isMenuOpen = !isMenuOpen;
}

/* SCROLL */

let lastKnownScrollPosition = 0;
let ticking = false;

function onDocumentScoll(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      // doSomething(lastKnownScrollPosition);
      onMottoVisibilityChange();
      ticking = false;
    });

    ticking = true;
  }
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onVisibilityChange(el, callback) {
  var old_visible;
  return function () {
    var visible = isElementInViewport(el);
    if (visible != old_visible) {
      old_visible = visible;
      if (typeof callback == "function") {
        callback(visible);
      }
    }
  };
}

/* Motto */

var onMottoVisibilityChange = onVisibilityChange($motto, function (visible) {
  if (visible) {
    $motto.classList.add("appear");
  }
});
