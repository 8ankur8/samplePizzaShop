import * as THREE from 'three'
import { DoubleSide } from 'three'
import Experience from '../Experience.js'

export default class PizzaS
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.materials = this.experience.materials


        // Resource
        this.resource = this.resources.items.pizzaSM

        this.parseModel()
        this.setMaterials()
       
    }

    parseModel()
    {
        this.model = this.resource.scene
        //this.model.rotation.y = Math.PI
        this.model.position.y = -3
        //console.log(this.model)

      

        //Moving Objects

        // Non-glow Lights
        

        // Glow Lights
        

        // Screens
       
        //this.arcadeScreen = this.model.children.find(child => child.name === 'arcadeScreen')
        
        //this.vendingMachineScreen = this.model.children.find(child => child.name === 'vendingMachineScreen')

        

        //this.easelFrontGraphic = this.model.children.find(child => child.name === 'easelFrontGraphic')

    }

    setMaterials()
    {
        // Set Materials
        this.model.traverse((_child) =>
        {
            if( _child instanceof THREE.Mesh )
            {
                _child.material = new THREE.MeshBasicMaterial({color:"pink"})
            }
        })
        
        
        this.model.position.y = - 3
        this.model.position.z = - 10
        this.model.position.x = 4

        this.model.rotation.y = Math.PI/2
        this.scene.add(this.model)
           
    }

    
}