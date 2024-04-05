<script>
document.addEventListener('DOMContentLoaded', function() {
    if (typeof THREE === 'undefined') {
        console.error('THREE is not defined. Ensure that Three.js library is loaded properly.');
    } else {
        var canvas = document.getElementById('myCanvas');
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); 
        renderer.setClearColor(0x000000); // default bg
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        var sphere_geometry = new THREE.SphereBufferGeometry(1, 128, 128);
        var material = new THREE.MeshNormalMaterial();
        var sphere = new THREE.Mesh(sphere_geometry, material);
        scene.add(sphere);
var scale = 1;
    sphere.scale.set(scale, scale, scale);
        function updateSize() {
            var width = window.innerWidth * 1.1;
            var height = window.innerHeight * 1;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
   
        var update = function() {
            var time = performance.now() * 0.0005;
            var k = 2;
            var positions = sphere.geometry.attributes.position;
            for (var i = 0; i < positions.count; i++) {
                var p = new THREE.Vector3().fromBufferAttribute(positions, i);
                p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
                positions.setXYZ(i, p.x, p.y, p.z);
            }
            positions.needsUpdate = true;
            sphere.geometry.computeVertexNormals();
        }
     
        function animate() {
            update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        window.addEventListener('resize', updateSize, false);
        updateSize(); // Initial size update
        requestAnimationFrame(animate);
    }
});
</script>