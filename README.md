### Moment.js is a library that creates an animated starry sky that passively renders on the Target 

---

#### Setup

Just add this to your Html.

``` Html
  <script src="moment.js"></script>
```

and initialize it in Javascript.


```javascript
  let sky = new Moment('body', {
    starCount: 150,
    animationSpeed: 3,
    theme: 6
  });
```

#### Settings
```javascript
  {
    starCount: 50,      // Number of Stars rendered
    minStarSize: 1,     // Minimun star size
    maxStarSize: 3,     // Maximum star size 
    color: "#fff",      // default star color
    animationSpeed: 5,  // defualt animation speed
    motion: true,       // animate Motion.js if true
    css: "MomentStyle", // defuault CSS file
    theme: 0            // Motion.js Sky color theme
  }
 ```
#### Themes

  ```
   0 name:'default' 
      start:"#6B0F3A"
      end:"#FF4E00"
   1 name: 'Mars Conquest'
      start:"#EC9F05"
      end:"#FF4E00"
   2 name: "Pollock's inspiration"
      start:"#B91372"
      end:"#6B0F1A"
   3 name: 'West Coast'
      start:"#AFF1DA"
      end:"#F9EA8F"
   4 name: 'Mars ambassador'
      start:"#FE5F75"
      end:"#FC9842"
   5 name: 'Wet Desert'
      start:"#F9ABA4"
      end:"#EFECEC"
   6 name: 'Entry Scene' 
      start:"#864BA2"
      end:"#BF3A30

  
