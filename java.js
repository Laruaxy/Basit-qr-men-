const anchors = document.querySelectorAll("a");
const kategoriListesi = document.getElementById("kategori-listesi");
const menuBtn = document.querySelector(".menu-btn");

anchors.forEach((anchor) => {
  anchor.addEventListener("click", scrollToElement);
});

function scrollToElement(targetElement) {
  const duration = 800; // Kaydırma süresi (ms)
  const start = window.pageYOffset;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  // Animasyonlu kaydırma işlemi
  function scrollStep(timestamp) {
    const currentTime =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, start + (targetElement.offsetTop - start) * progress);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  window.requestAnimationFrame(scrollStep);
}

const categoryLinks = document.querySelectorAll(".kategori-listesi li a");

categoryLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      scrollToElement(targetElement);
    }
  });
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector(".scroll-to-top").classList.add("active");
  } else {
    document.querySelector(".scroll-to-top").classList.remove("active");
  }
}
let prevScrollPos = window.screenY || document.documentElement.scrollTop;
const header = document.querySelector(".header");

function toggleHeaderClass() {
  let currentScrollPos =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPos > prevScrollPos) {
    header.classList.remove("active");
  } else {
    header.classList.add("active");
  }

  prevScrollPos = currentScrollPos;
}

window.addEventListener("scroll", toggleHeaderClass);

// Mobilde yön tespiti için ayrıca touchstart olayını dinleyelim
window.addEventListener("touchstart", function (e) {
  prevScrollPos = e.touches[0].clientY;
});

// Sayfa yüklendiğinde de tetiklenmesini sağlayalım
toggleHeaderClass();

document
  .querySelector("#scrollToTopButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    scrollToTop();
  });

function scrollToTop() {
  let currentPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentPosition > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, currentPosition - currentPosition / 10);
  }
}
function redirectToPage(url) {
  window.location.href = url;
}
function showPopup() {
  document.getElementById("popup").style.display = "block";
}

function printAndSendSMS() {
  var tableNumber = document.getElementById("tableNumber").value;
  var message = tableNumber + " numaralı masa çağırılıyor.";

  // Yazdırma işlemini burada gerçekleştir
  // ...

  // SMS gönderme işlemini burada gerçekleştir
  sendSMS(message);
  alert(
    "Değerli Müşterimiz " +
      tableNumber +
      " Numaralı Masaya Hemen Garson Yönlendiriliyor"
  );
  // Pop-up penceresini kapat
  closepopup();
}
function closepopup() {
  document.getElementById("popup").style.display = "none";
}

function sendSMS(message) {
  // SMS gönderme kodunu buraya ekleyin
  // Örnek olarak bir konsol çıktısı oluşturuldu
  console.log("SMS Gönderildi: " + message);
}
window.addEventListener("load", function () {
  var menuItems = document.getElementsByClassName("h1");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].style.animationDelay = i * 0.2 + "s";
  }
});
window.addEventListener("DOMContentLoaded", function () {
  // Menülerin seçicisini alın
  var menus = document.querySelectorAll(".menu1, .menu2, .menu3, .menu4");

  // Fonksiyonu tanımlayın
  function activateMenu(menu) {
    // Menünün pozisyonunu ve yüksekliğini alın
    var rect = menu.getBoundingClientRect();
    var top = rect.top;
    var height = rect.height;

    // Ekrandaki menüyse fiyatı göster
    if (top >= 0 && top <= window.innerHeight - height) {
      menu.classList.add("show-price");
    } else {
      menu.classList.remove("show-price");
    }
  }

  // Her menü için işlemleri yapın
  menus.forEach(function (menu) {
    // İlk olarak menülerin durumunu kontrol edin
    activateMenu(menu);
  });

  // Window scroll olayına dinleyici ekle
  window.addEventListener("scroll", function () {
    // Her menü için işlemleri yapın
    menus.forEach(function (menu) {
      // Menüyü aktive edin
      activateMenu(menu);
    });
  });
});

const menu = document.getElementById("kategori-listesi");
let scrollAmount = 0;
let startX = 0;
const scrollStep = 100;

menu.addEventListener("wheel", (event) => {
  event.preventDefault();
  const delta = Math.sign(event.deltaY);
  scrollAmount += delta * scrollStep;

  if (scrollAmount < 0) {
    scrollAmount = 0;
  } else if (scrollAmount >= menu.scrollWidth - menu.clientWidth) {
    scrollAmount = menu.scrollWidth - menu.clientWidth;
  }

  menu.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
});

menu.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
});

menu.addEventListener("touchmove", (event) => {
  event.preventDefault();
  const touchX = event.touches[0].clientX;
  const touchDeltaX = startX - touchX;
  startX = touchX;
  scrollAmount += touchDeltaX;

  if (scrollAmount < 0) {
    scrollAmount = 0;
  } else if (scrollAmount >= menu.scrollWidth - menu.clientWidth) {
    scrollAmount = menu.scrollWidth - menu.clientWidth;
  }

  // Anlık kaydırmak için "smooth" davranışını kaldırın
  menu.scrollTo({
    left: scrollAmount,
  });
});
