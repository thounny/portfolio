const menu_open = gsap.timeline({
  paused: "true",
  reversed: "true",
});
menu_open.to(".menu-container", {
  display: "flex",
});
menu_open.to("#menuBtnDiv", {
  duration: 0.2,
  y: 50,
});
menu_open.fromTo(
  "#menuBtnDiv2",
  {
    duration: 0.2,
    y: -100,
  },
  {
    y: -50,
  },
  "-=.15"
);
menu_open.from(
  ".menu-container-1",
  {
    duration: 0.5,
    y: "100%",
  },
  "-=.5"
);
menu_open.from(
  ".menu-container-1 .menu-container-header li span, .menu-container-1 .menu-container-footer li span",
  {
    stagger: {
      amount: 0.15,
    },
    y: 100,
    duration: 0.5,
  },
  "-=.1"
);
menu_open.from(
  ".menu-container-2",
  {
    duration: 0.5,
    y: "-100%",
  },
  "-=1"
);
menu_open.from(
  ".menu-container-2 .menu-container-footer li span",
  {
    stagger: {
      amount: 0.15,
    },
    y: 100,
    duration: 0.5,
  },
  "-=.5"
);
function menuOpen() {
  menu_open.reversed() ? menu_open.play() : menu_open.reverse();
}

// custom cursor
// const cursor = document.querySelector('.cursor');

// let mouseX = 0;
// let mouseY = 0;

// let cursorX = 0;
// let cursorY = 0;

// let speed = 0.5; // change to increase the ease

// function animate() {
//     let distX = mouseX - cursorX;
//     let distY = mouseY - cursorY;

//     cursorX = cursorX + (distX * speed);
//     cursorY = cursorY + (distY * speed);

//     cursor.style.left = cursorX + 'px';
//     cursor.style.top = cursorY + 'px';

//     requestAnimationFrame(animate);
// }


// animate();

// document.addEventListener('mousemove', (event) => {
//     mouseX = event.pageX;
//     mouseY = event.pageY;
// })

// <!-- Inspired from https://tympanus.net/codrops/ -->

// Track the mouse position
let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  mouse = getMousePosition(event);
});

// Cursor Implementation
class Cursor {
  constructor(element, doLerp = false) {
    this.DOM = { element, doLerp };
    this.DOM.element.style.opacity = 0;

    this.bounds = this.DOM.element.getBoundingClientRect();

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: doLerp ? 0.2 : 1 },
      ty: { previous: 0, current: 0, amt: doLerp ? 0.2 : 1 },
      scale: { previous: 1, current: 1, amt: doLerp ? 0.17 : 1 },
      opacity: { previous: 1, current: 1, amt: doLerp ? 0.17 : 1 }
    };

    this.onMouseMoveEvent = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
        mouse.x - this.bounds.width / 2;
      this.renderedStyles.ty.previous = this.renderedStyles.ty.current =
        mouse.y - this.bounds.height / 2;

      gsap.to(this.DOM.element, {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1
      });

      requestAnimationFrame(() => this.render());

      window.removeEventListener("mousemove", this.onMouseMoveEvent);
    };

    window.addEventListener("mousemove", this.onMouseMoveEvent);
  }

  enter() {
    this.renderedStyles.scale.current = 1.8;
  }

  leave() {
    this.renderedStyles.scale.current = 1;
  }

  render() {
    this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
    this.renderedStyles.ty.current = mouse.y - this.bounds.height / 2;

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      );
    }

    this.DOM.element.style.transform = `translateX(${this.renderedStyles.tx.previous}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`;
    this.DOM.element.style.opacity = this.renderedStyles.opacity.previous;

    requestAnimationFrame(() => this.render());
  }
}

// Initialize cursor
const cursorSphere = new Cursor(document.querySelector(".cursor-sphere"), true);
new Cursor(document.querySelector(".cursor"));

// Mouse cursor hovers
const hoverText = document.querySelector("h1");
hoverText.addEventListener("mouseenter", () => cursorSphere.enter());
hoverText.addEventListener("mouseleave", () => cursorSphere.leave());

// Linear interpolation
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

// Gets the mouse position
function getMousePosition(event) {
  let positionX = 0;
  let positionY = 0;

  if (!event) event = window.event;

  if (event.pageX && event.pageY) {
    positionX = event.pageX;
    positionY = event.pageY;
  } else if (event.clientX && event.clientY) {
    positionX =
      event.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    positionY =
      event.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;
  }

  return { x: positionX, y: positionY };
}
  onload = function() {
  canvas = document.querySelector('#canvasId'),
      context = canvas.getContext('2d');
  if (!!context) {

      // The start position for drawing circle
      C3qpi = 1.5 * Math.PI,
          tc = pct = 0,
          btn = document.querySelector('#animateBtn'),
          faviconLnk = document.querySelector('link[rel*="icon"]');
      context.lineWidth = 3;
      context.strokeStyle = 'green';

      // On page refresh, enable the button 
      if (btn.disabled) btn.removeAttribute('disabled');
      btn.addEventListener('click', function() {
          tc = setInterval(drawcircularLoader, 60);
          this.textContent = 'Animating';
          this.style.backgroundColor = '#99999';
          this.setAttribute('disabled', '');
      });
  }
};

function drawcircularLoader() {
  with(context) {
      clearRect(0, 0, 32, 32);
      beginPath();
      arc(8, 8, 6, C3qpi, (pct * 2 * Math.PI / 100 + C3qpi));
      stroke();
  }

  // Update favicon to PNG image
  faviconLnk.href = canvas.toDataURL('image/png');
  if (pct === 100) {
      clearInterval(tc);
      btn.textContent = 'Animated';
      btn.style.backgroundColor = 'green';
      return;
  }
  pct++;
}

var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector("#my-scrollbar"), {
  speed: 0.5,
});

const tl = gsap.timeline();
tl.from(".sub-header", {
  y: -100,
  duration: 0.5,
  stagger: {
    amount: 0.4,
  },
});
tl.from(".line", {
  duration: 1,
  width: "0%",
  stagger: {
    amount: 2,
  },
});
tl.from(
  ".work-item h1, .work-item p",
  {
    y: 150,
    duration: 0.5,
    stagger: {
      amount: 2.5,
    },
  },
  "-=3"
);
