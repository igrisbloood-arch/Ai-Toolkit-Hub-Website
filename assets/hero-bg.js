(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  var NODE_COUNT = 42;
  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(NODE_COUNT * 3);
  var velocities = [];

  for (var i = 0; i < NODE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    velocities.push({
      x: (Math.random() - 0.5) * 0.035,
      y: (Math.random() - 0.5) * 0.035,
      z: (Math.random() - 0.5) * 0.02
    });
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xc4b5fd,
    size: 1.8,
    transparent: true,
    opacity: 0.9
  });
  var pointCloud = new THREE.Points(geometry, pointsMaterial);
  scene.add(pointCloud);

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.22
  });
  var lineGeometry = new THREE.BufferGeometry();
  var lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  var MAX_DIST = 22;

  function updateLines() {
    var linePositions = [];
    var posAttr = geometry.attributes.position;
    for (var a = 0; a < NODE_COUNT; a++) {
      for (var b = a + 1; b < NODE_COUNT; b++) {
        var dx = posAttr.getX(a) - posAttr.getX(b);
        var dy = posAttr.getY(a) - posAttr.getY(b);
        var dz = posAttr.getZ(a) - posAttr.getZ(b);
        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MAX_DIST) {
          linePositions.push(posAttr.getX(a), posAttr.getY(a), posAttr.getZ(a));
          linePositions.push(posAttr.getX(b), posAttr.getY(b), posAttr.getZ(b));
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  }

  var isVisible = true;
  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
  });

  var frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    var posAttr = geometry.attributes.position;
    for (var i = 0; i < NODE_COUNT; i++) {
      posAttr.setX(i, posAttr.getX(i) + velocities[i].x);
      posAttr.setY(i, posAttr.getY(i) + velocities[i].y);
      posAttr.setZ(i, posAttr.getZ(i) + velocities[i].z);
      if (Math.abs(posAttr.getX(i)) > 55) velocities[i].x *= -1;
      if (Math.abs(posAttr.getY(i)) > 32) velocities[i].y *= -1;
      if (Math.abs(posAttr.getZ(i)) > 22) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    frame++;
    if (frame % 3 === 0) updateLines();

    pointCloud.rotation.y += 0.0006;
    lineSegments.rotation.y += 0.0006;

    renderer.render(scene, camera);
  }

  updateLines();
  animate();

  window.addEventListener('resize', function () {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
})();
