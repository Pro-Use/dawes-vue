export default {
  beforeMount: el => {
    
    function loadImage() {
    //   console.log('loadimage');
      if (el.tagName === "IMG") {
        // console.log(el.tagName);
        el.addEventListener("load", () => {
            setTimeout(() => el.classList.remove("lazyload"), 100);
          setTimeout(() => el.classList.add("lazyloaded"), 100);
        });
        el.addEventListener("error", () => console.log("error"));
        el.srcset = el.dataset.srcset;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            // console.log('intersect!');
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0.01"
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }
    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      loadImage();
    }
  }
};