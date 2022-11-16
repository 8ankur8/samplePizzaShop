import Experience from './Experience.js'
import gsap from 'gsap'

export default class Controller
{
    constructor()
    {

        // Setup
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.sounds = this.experience.sounds
        this.preLoader = this.experience.preLoader
        this.config = this.experience.config
        this.animations = this.experience.animations

        this.setLogic()
        this.setMenuControls()
        
        this.setArcadeDisplayControls()
        //this.setBackControl()
        this.setCamControls()
        this.setkeyboard()

        this.resources.on('ready', () =>
        {
            this.ramenShop = this.experience.world.ramenShop
            this.pizzaShop = this.experience.world.pizzaShop
            this.materials = this.experience.materials
        })

    }

    
    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'menu'

        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }


    // Main menu controls

    setMenuControls()
    {
        this.menuControls = {}
        
        // this.menuControls.articles = async (obj, color) =>
        // {
        //     if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
        //     {
        //         this.sounds.playClick()
        //         //this.menuControls.buttonIndicator(obj, color)
        //         await this.sleep(250)
        //         window.open('https://medium.com/@jesse-zhou', '_blank')
        //     }
        // }
        
        // this.menuControls.credits = async (obj, color) =>
        // {
        //     if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
        //     {
        //         this.sounds.playClick()
        //         this.logic.mode = 'creditsStart'
        //         this.camControls.toCredits()
        //     }
        // }

        this.menuControls.roadmaps = async (obj) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.sounds.playClick()
                this.logic.mode = 'roadmaps'
                this.camControls.toRoadmaps()
            }
        }

        this.menuControls.teamframe = async (obj) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.sounds.playClick()
                this.logic.mode = 'team'
                this.camControls.toteamframe()
            }
        }

        this.menuControls.checkpoint2 = async (obj) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.sounds.playClick()
                this.logic.mode ='menu'
                this.camControls.tocheckpoint2()
            }
        }

    }

    // new
    setArcadeDisplayControls()
    {
        this.screenControls = {}
        this.screenControls.arcadeDisplay = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'roadmaps')
            {
                this.sounds.playArcade()
                this.logic.mode = 'roadmap1'
                console.log(this.logic.mode)
                this.screenTransition(
                    this.materials.arcadeDisplayMaterial,
                    this.resources.items.arcadeTexture1,
                    0.2
                )
            }
            else if(this.logic.buttonsLocked === false && this.logic.mode === 'roadmap1' )
            {
                this.sounds.playArcade()
                this.logic.mode = 'roadmap2'
                console.log(this.logic.mode)
                this.screenTransition(
                    this.materials.arcadeDisplayMaterial,
                    this.resources.items.arcadeTexture2,
                    0.2
                )
            }
            else if(this.logic.buttonsLocked === false && this.logic.mode === 'roadmap2' )
            {
                this.sounds.playArcade()
                this.logic.mode = 'roadmap3'
                console.log(this.logic.mode)
                this.screenTransition(
                    this.materials.arcadeDisplayMaterial,
                    this.resources.items.arcadeTexture3,
                    0.2
                )
            }
            else if(this.logic.buttonsLocked === false && this.logic.mode === 'roadmap3' )
            {
                this.sounds.playArcade()
                this.logic.mode = 'roadmaps'
                this.screenTransition(
                    this.materials.arcadeDisplayMaterial,
                    this.resources.items.arcadeTexture4,
                    0.2
                )
            }
        }

        this.screenControls.roadmapBack = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode !== 'menu')
            {
                this.sounds.playArcade()
                this.logic.mode = 'menu'
                this.camControls.toDefault()
                this.screenTransition(
                    this.materials.arcadeDisplayMaterial,
                    this.resources.items.arcadeDefaultTexture,
                    0.2
                )
            }

        }

    }

    // camera transitions and angles

    setCamControls()
    {
        this.camControls = {}
        
        this.camControls.toDefault = async () =>
        {
            this.sounds.playWhoosh()
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.default(1.5)
            await this.sleep(1500)
            this.camera.camAngle.default()
        }
        
        this.camControls.toCredits = async () =>
        {
            this.sounds.playWhoosh()
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.credits(1.5)
            await this.sleep(1500)
            this.camera.camAngle.credits()
        }
        this.camControls.toRoadmaps = async () =>
        {
            this.sounds.playWhoosh()

            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.roadmaps(1.5)
            await this.sleep(1500)
            this.camera.camAngle.roadmaps()
        }

        this.camControls.tocheckpoint2 = async () =>
        {
            this.sounds.playWhoosh()

            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.checkpoint2(1.5)
            await this.sleep(1500)
            this.camera.camAngle.checkpoint2()
        }

        this.camControls.toteamframe = async () =>
        {
            this.sounds.playWhoosh()

            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.teamframe(1.5)
            await this.sleep(1500)
            this.camera.camAngle.teamframe()
        }
        
    }

    setkeyboard(){
        this.keyboard = {}

        this.keyboard.keyDown = async (event) =>
        {
            if(event.keyCode === 27 && this.logic.mode !== 'menu')
            {
                this.screenControls.roadmapBack()   
            }
        }
        
        window.addEventListener('keydown', this.keyboard.keyDown)
        window.addEventListener('keyup', this.keyboard.keyUp)
    }

    screenTransition(material,newTexture, duration,)
    {
        material.uniforms.texture2.value = newTexture
        gsap.to(material.uniforms.progress, {value:1,
            duration: duration,
            ease: "power1.inOut",
            onComplete: () => {
                material.uniforms.texture1.value = newTexture
                material.uniforms.progress.value = 0
            }
        })
    }

    bigScreenTransition(material,newTexture, duration, toDefault)
    {
        material.uniforms.uTexture2IsDefault.value = toDefault ? 1 : 0

        material.uniforms.uTexture2.value = newTexture
        gsap.to(material.uniforms.uProgress, {value:1,
            duration: duration,
            ease: "power1.inOut",
            onComplete: () => {
                material.uniforms.uTexture1IsDefault.value = toDefault ? 1 : 0 
                material.uniforms.uTexture1.value = newTexture
                material.uniforms.uProgress.value = 0
                
            }
        })
    }

    
    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}