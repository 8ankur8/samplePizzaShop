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
            this.pizzaShop = this.experience.world.pizzaShop
            
            this.raycaster = new THREE.Raycaster()
            this.cursorDown = new THREE.Vector2()
            this.cursor = new THREE.Vector2()

            this.hitBoxMaterial = new THREE.MeshNormalMaterial({wireframe: true})
           
            //pizza wallet arcade
            this.arcadeHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.0, 2.5, 1.0 ),
                this.hitBoxMaterial
            )
            this.arcadeHitBox.position.set(1.7,-1.9,-4.3)
            this.arcadeHitBox.visible = false

            this.backHitBoxGeometry = new THREE.PlaneGeometry( 0.1, 0.1)

            this.roadmapBack = new THREE.Mesh(
                this.backHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.roadmapBack.position.set(2.04,-1.26,-4.185)
            this.roadmapBack.rotation.set(-0.2,0,0)

            this.bottonHitbox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.06, 0.06, 0.06 ),
                this.hitBoxMaterial
            )
            this.bottonHitbox.position.set(1.54,-1.71,-3.84)
            this.bottonHitbox.visible = true

            this.scene.add(this.arcadeMachineHitBox,this.arcadeHitBox,this.roadmapBack,this.bottonHitbox)

            //checkpoints

            this.checkpoints = new THREE.Group()
            this.scene.add(this.checkpoints)

            this.checkpoint1HitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.2, 0.2, 0.2 ),
                this.hitBoxMaterial
            )
            this.checkpoint1HitBox.position.set(-0.0,-1.4,-2.5)
            this.checkpoint1HitBox.visible = true

            this.checkpoint2HitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.2, 0.2, 0.2 ),
                this.hitBoxMaterial
            )
            this.checkpoint2HitBox.position.set(4.25,-1.4,2.0)
            this.checkpoint2HitBox.visible = true

            this.checkpoint3HitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.2, 0.2, 0.2 ),
                this.hitBoxMaterial
            )
            this.checkpoint3HitBox.position.set(-3.0,-1.5,2.5)
            this.checkpoint3HitBox.visible = true

            this.checkpoints.add(this.checkpoint1HitBox,this.checkpoint2HitBox,this.checkpoint3HitBox)

            //teamframe

            this.teamframe = new THREE.Group()
            this.scene.add(this.teamframe)


            this.frameHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.0, 0.7, 0.05),
                new THREE.MeshBasicMaterial({color:"gray"})
            )
            this.frameHitBox.position.set(2.0,-1.3,4.74)
            this.frameHitBox.visible = true

            this.person1HitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.1, 0.1,0.05),
                new THREE.MeshBasicMaterial({color:"red"})
            )
            this.person1HitBox.position.set(2.2,-1.3,4.73)
            this.person1HitBox.visible = true

            this.person1DHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.16, 0.1,0.05),
                new THREE.MeshBasicMaterial({color:"blue"})
            )
            this.person1DHitBox.position.set(2.0,-1.2,4.73)
            this.person1DHitBox.visible = false

            
            this.teamframe.add(this.frameHitBox ,this.person1HitBox,this.person1DHitBox)

            // Objects to test

            this.objectsToTest = [
                this.pizzaShop.arcadeDisplay,
                this.roadmapBack,
                this.bottonHitbox,
                this.person1HitBox
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

            this.machinesToTest = [ this.arcadeHitBox ,
                this.checkpoint1HitBox,
                this.checkpoint2HitBox,
                this.checkpoint3HitBox,
                this.frameHitBox,
            ]

            this.touchedPoints = []

            window.addEventListener('pointerdown', (event) =>
            {
                this.touchedPoints.push(event.pointerId)

                this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.9)
                this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.1)

                this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.9)
                this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.1)

            })

             window.addEventListener('mousemove', (event) =>
            {
               this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
                 this.hover(this.cursor)
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

    hover(cursor)
    {
        this.raycaster.setFromCamera(cursor, this.camera.instance)
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
        if(this.intersectsObjects.length)
        {
            this.person1DHitBox.visible = true
        }
        else
        {
            this.person1DHitBox.visible = false
        }
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
                    this.controller.screenControls.arcadeDisplay()
                    break
                case this.roadmapBack:
                    this.controller.screenControls.roadmapBack()
                    break 
                case this.bottonHitbox:
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
                
                case this.checkpoint1HitBox:
                    console.log("clickedpoint1")
                    //this.controller.menuControls.checkpoint1HitBox()
                     break
                     
                case this.checkpoint2HitBox:
                    console.log("clickedpoint2")
                    this.controller.menuControls.checkpoint2()
                    break 

                    
                case this.checkpoint3HitBox:
                    console.log("clickedpoint3")
                    //this.controller.menuControls.roadmaps()
                    break   

                case this.frameHitBox:
                    console.log("team")
                    this.controller.menuControls.teamframe()
                    break   
                 
            }
        }
    }
}