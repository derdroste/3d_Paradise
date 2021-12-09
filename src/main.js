import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new Mesh( geometry, material );
scene.add( cube );

const loader = new FBXLoader();
loader.load( 'models/engine.fbx', function ( object ) {

    object.traverse( function ( child ) {

        if ( child.isMesh ) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    } );

    scene.add( object );

} );

camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();