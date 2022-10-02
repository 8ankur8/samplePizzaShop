import { TextureEffect } from 'postprocessing'
import * as THREE from 'three'
import { GridHelper, Group } from 'three'
import Experience from './Experience.js'

export default class RayCaster
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.performance = this.experience.performance 
        this.preLoader = this.experience.preLoader
        this.controller = this.experience.controller
        this.config = this.experience.config
        this.sounds = this.experience.sounds

        // Wait for resources
        this.preLoader.on('start', () =>
        {
            // Setup
            this.config.touch = this.experience.config.touch
            this.ramenShop = this.experience.world.ramenShop
            this.pizzaShop = this.experience.world.pizzaShop
            
            this.raycaster = new THREE.Raycaster()
            this.cursorDown = new THREE.Vector2()
            this.cursor = new THREE.Vector2()

            this.hitBoxMaterial = new THREE.MeshNormalMaterial({wireframe: true})
           
            this.arcadeMachineHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.0, 2.5, 1.0 ),
                this.hitBoxMaterial
            )
            this.arcadeMachineHitBox.position.set(-1.7,-1.9,4.3)
            this.arcadeMachineHitBox.visible = false

            //pizza wallet arcade

            this.arcadeHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.0, 2.5, 1.0 ),
                this.hitBoxMaterial
            )
            this.arcadeHitBox.position.set(1.7,-1.9,-4.3)
            this.arcadeHitBox.visible = false


            this.scene.add(this.arcadeMachineHitBox,this.arcadeHitBox)

            // Objects to test

            this.objectsToTest = [
                
                this.pizzaShop.arcadeDisplay,
  
            ]

            // // touch objects
            // if(this.config.touch == true)
            // {
            //     this.objectsToTest.push(
            //         this.projectsHitBox,
            //         this.jZhouHitBox,
            //         this.articlesHitBox,
            //         this.aboutMeHitBox,
            //         this.creditsHitBox)
            // }
            // else 
            // {
            //     this.objectsToTest.push(
            //         this.ramenShop.projectsRed,this.ramenShop.projectsWhite,
            //         this.ramenShop.jZhouBlack, this.ramenShop.jZhouPink,
            //         this.ramenShop.articlesWhite,this.ramenShop.articlesRed,
            //         this.ramenShop.aboutMeBlack,this.ramenShop.aboutMeBlue,
            //         this.ramenShop.creditsBlack,this.ramenShop.creditsOrange,
            //     )
            // }

            // add the machines

            this.machinesToTest = [ this.arcadeHitBox ]

            this.touchedPoints = []

            window.addEventListener('pointerdown', (event) =>
            {
                this.touchedPoints.push(event.pointerId)

                this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.9)
                this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.1)

                this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.9)
                this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.1)

            })

            // Click listener
            window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

                this.absX = Math.abs(this.cursor.x)
                this.absY = Math.abs(this.cursor.y)

                if(this.touchedPoints.length === 1 && 
                this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
                this.absY > this.cursorYMin && this.absY < this.cursorYMax) 

                {
                this.click(this.cursor)

                this.touchedPoints = []
                }
                else
                {this.touchedPoints = []}
            })
        })
    }

    click(cursor)
    {
        this.raycaster.setFromCamera(cursor, this.camera.instance)
        
        //Object click listener
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
        if(this.intersectsObjects.length)
        {
            this.selectedModel = this.intersectsObjects[ 0 ].object

            switch(this.selectedModel)
            {
                  
                //screens
              
                case this.pizzaShop.arcadeDisplay:
                    console.log("clicked")
                    this.controller.screenControls.arcadeDisplay()
                    break    

            }

        } 
        
        //Object click listener
        this.intersectsMachines= this.raycaster.intersectObjects(this.machinesToTest)
        if(this.intersectsMachines.length)
        {
            this.selectedMachine = this.intersectsMachines[ 0 ].object

            switch(this.selectedMachine)
            {           
                case this.arcadeHitBox:
                    console.log("clicked")
                    this.controller.menuControls.roadmaps()
                    break    

            }
        }
    }
}
