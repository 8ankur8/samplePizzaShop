import * as THREE from 'three'
import { DoubleSide } from 'three'
import Experience from '../Experience.js'

export default class PizzaMan
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
        this.resource = this.resources.items.pizzaManModel

        this.parseModel()
        this.setMaterials()
    }

    parseModel()
    {
        this.model = this.resource.scene
        //this.model.rotation.y = Math.PI
        //this.model.position.y = -3
        //console.log(this.model)

        this.arcadeDisplay = this.model.children.find(child => child.name === 'arcadeDisplay')

        //Moving Objects

        // Non-glow Lights
        

        // Glow Lights
        

        // Screens
       
        //this.arcadeScreen = this.model.children.find(child => child.name === 'arcadeScreen')
        
        //this.vendingMachineScreen = this.model.children.find(child => child.name === 'vendingMachineScreen')


    }

    setMaterials()
    {
        // Set Materials
        this.model.traverse((_child) =>
        {
           if(_child instanceof THREE.Mesh )
           {
               _child.receiveShadow = true
               _child.castShadow = true
               //_child.material = new THREE.MeshNormalMaterial()
           }
         })

        this.model.position.y = - 3
        this.scene.add(this.model)
           
    }

}