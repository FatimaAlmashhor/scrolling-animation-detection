var scrollElements = document.querySelectorAll("section");
// import * as THREE from 'three';
//   postsPos = [],
//   postsCur = -1,
//   targetOffset = 50;

// posts.forEach(element => {
//   postsPos.push(element.offsetTop);
// });

// window.addEventListener("scroll", function () {
//   var targ = postsPos.binarySearch(window.offsetTop + targetOffset);
//   if (targ != postsCur) {
//     postsCur = targ;
//     console.log(true);
//     // posts.removeClass("cur").eq(targ).addClass("cur");
//   }
// });

// Array.prototype.binarySearch = function (find) {
//   var low = 0, high = this.length - 1,
//     i, comparison;
//   while (low <= high) {
//     i = Math.floor((low + high) / 2);
//     if (this[i] < find) { low = i + 1; continue; };
//     if (this[i] > find) { high = i - 1; continue; };
//     return i;
//   }
//   return this[i] > find ? i - 1 : i;
// };

let throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  console.log('this is the  elementTop ' + elementTop);
  console.log('this is the window height  ' + ((window.innerHeight || document.documentElement.clientHeight) / dividend));
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
    &&
    elementTop > 70
  );
};

const elementOutofView = (el) => {
  const elementBottom = el.getBoundingClientRect().bottom;



  return (
    elementBottom > (window.innerHeight || document.documentElement.clientHeight) - 120
  );
};
const displayScrollElement = (element, callback) => {
  element.classList.add("scrolled");
  callback();
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}
var timer = 0;
var count = 0;
var scroll = 0;

window.addEventListener("scroll", () => {
  // scrollCount.innerHTML = scroll++;
  throttle(() => {
    handleScrollAnimation();
    // throttleCount.innerHTML = count++;
  }, 100);
});