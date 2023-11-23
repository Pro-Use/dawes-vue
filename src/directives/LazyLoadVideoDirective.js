export default {
  mounted: el => {
    
    function initVid() {
      console.log(el.tagName);
      if (el.tagName === "VIDEO") {
        if(el.preload == 'auto'){
            console.log('already loaded')
            el.play();
        }else{
            console.log('initial load')
            el.poster = el.dataset.poster;
            setTimeout(() => el.classList.add("lazyloaded"), 150);
            setTimeout(() =>  el.play(), 100);
            el.addEventListener("error", () => console.log("error"));
            el.preload = 'auto';  
        }
      }
    }

    function loadPoster() {
        if (el.tagName === "VIDEO") {
            el.addEventListener("load", () => {
                setTimeout(() => el.classList.add("lazyloaded"), 100);
            });
        }
        el.poster = el.dataset.poster;
    }

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            initVid();
            // observer.unobserve(el);
        }else{
            el.pause();
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: 0
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }
    if (window["IntersectionObserver"]) {
        createObserver();
    } else {
        loadPoster();
    }
  }
};