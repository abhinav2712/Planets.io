import * as THREE from 'three';
import './moon.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
//scene
const scene = new THREE.Scene();

//create scene
const geometry = new THREE.SphereGeometry( 3,64,64);
const material = new THREE.MeshStandardMaterial( { 
    color: "#451804",
    roughness:0.5,
   } );

const mesh= new THREE.Mesh( geometry, material ); //combinihg geometry and material
scene.add(mesh) // adding mesh to scene

//sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

//light
const pointLight = new THREE.PointLight(0xffffff,1,100);
pointLight.position.set(0,10,10); //position of light
scene.add(pointLight);
pointLight.intensity=1.2;

//camera
const camera= new THREE.PerspectiveCamera(50, sizes.width/sizes.height,0.1,100); //fov, aspect ratio, near, far
camera.position.z=20 //moving camera back

scene.add(camera);





//renderer
const canvas = document.querySelector('.webgl');  //canvas element
const renderer = new THREE.WebGLRenderer({canvas});  //canvas is the canvas element
renderer.setPixelRatio(2);
//rendering
renderer.setSize(sizes.width,sizes.height);
renderer.render(scene, camera,sizes);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan=false;
controls.enableZoom=false;
controls.autoRotate=true;
controls.autoRotateSpeed=3;

//resize
window.addEventListener('resize', () => {
//update
sizes.width=window.innerWidth;
sizes.height=window.innerHeight;
//update camera
camera.updateProjectionMatrix()
camera.aspect=sizes.width/sizes.height;
renderer.setSize(sizes.width,sizes.height);
})





const loop= () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop()

//timeline
const tl=gsap.timeline({defaults:{duration:0.4}})
tl.fromTo(mesh.scale,{x:0.1,y:0.1,z:0.1},{x:1,y:1,z:1})
tl.fromTo('nav',{y:'-100%'},{y:'0%'})
tl.fromTo('.title',{opacity:0},{opacity:1})
tl.fromTo('.subtitle',{opacity:0},{opacity:1})

//mouse 
let mouseDown=false;
window.addEventListener('mousedown', () => {
    mouseDown=true;
})
window.addEventListener('mouseup', () => {
    mouseDown=false;
})

let rgb=[12,23,55];




// window.addEventListener('mousemove', (e) => {
//     if(mouseDown){
//        rgb=[
//         Math.round((e.pageX/sizes.width)*255),Math.round((e.pageY/sizes.heigth)*255),
//     150,
// ]

//  //animate
//  let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
 
//  gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
//     }
// })