(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0, height = 0;
  var NODE_COUNT = 42;
  var MAX_DIST = 130;
  var nodes = [];

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * DPR);
    canvas.height = Math.round(height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function makeNodes() {
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.1 + Math.random() * 1.1
      });
    }
  }

  resize();
  makeNodes();

  var isVisible = true;
  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
  });

  function step() {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // connecting lines
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.22)';
    ctx.lineWidth = 1;
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.globalAlpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // nodes
    ctx.fillStyle = 'rgba(196, 181, 253, 0.9)';
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    step();
    draw();
  }

  animate();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
    }, 150);
  });
})();
