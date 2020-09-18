### Moment.js is a library that creates an animated starry sky that renders passively on the target element's background. 
---

#### Setup

This is really all you need to get going.
```Html
  <script src="moment.js"></script>

```javascript
  let sky = new Moment('body', {
    starCount: 150,
    animationSpeed: 3,
    theme: 6
  });
