import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        
      
        this.lite = new THREE.AmbientLight(0xffffff)
        this.scene.add( this.lite )
        
        this.point = new THREE.PointLight( 0xff0000, 10, 100 );
        this.point.position.set( 6, 6, 6 );
        this.scene.add( this.point );

    }
}