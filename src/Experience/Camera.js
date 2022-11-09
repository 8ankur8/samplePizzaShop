import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import gsap from 'gsap'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.time = this.experience.time
        this.config = this.experience.config

        if(this.config.vertical === true)
        {
        this.aboutMeDistance = 2.6
        this.projectsDistance = 4.6
        }
        else
        {
        this.aboutMeDistance = 2.2
        this.projectsDistance = 4.2
        }

        this.setInstance()
        this.setControls()
        this.setCamAngles()
        this.setTransitions()
        
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.4, 50)
        this.instance.position.x = 30//15.9
        this.instance.position.y = 5//6.8
        this.instance.position.z = 0//-11.4
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = true
        this.controls.rotateSpeed = 1.2
        this.controls.zoomSpeed = 0.8
        this.controls.target.z = -1
        this.controls.enableRotate = true
        this.controls.enableZoom = true
    }

    setCamAngles()
    {
        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.default = () =>
        {
        
            this.controls.minDistance = 0
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.roadmaps = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.checkpoint1 = () =>
        {
            this.controls.minDistance = 0
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.checkpoint2 = () =>
        {
            this.controls.minDistance = 0
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.checkpoint3 = () =>
        {
            this.controls.minDistance = 0
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.teamframe = () =>
        {
            this.controls.minDistance = 0
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }
    
    }

    setTransitions()
    {
        this.transitions = {}

        this.transitions.default = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
             x: 6,
             y: -1,
             z: -2.0})
            
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 5.9,
            y: -1,
            z: -2.0})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enableZoom = true
            this.controls.enabled = true
            
        }

        this.transitions.roadmaps = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: 1.7,
            y: -1.5,
            z: -3.2})
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 1.7,
            y: -1.5,
            z: -4})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enabled = true
            
        }

        this.transitions.teamframe = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: 2.0,
            y: -1.3,
            z: 4})
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 2.0,
            y: -1.3,
            z: 4.1})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enabled = true
            
        }

        this.transitions.checkpoint2 = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
             x: 4.25,
             y: -1,
             z: 2.0})
            
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 4.25,
            y: -1,
            z: 2.1})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enableZoom = true
            this.controls.enabled = true
            
        }
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}

// test