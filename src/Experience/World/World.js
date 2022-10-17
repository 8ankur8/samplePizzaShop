import Experience from '../Experience.js'
import Environment from './Environment.js'
import PizzaMan from './PizzaMan.js'
import PizzaShop from './PizzaShop.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            //this.ramenShop = new RamenShop()
            this.pizzaShop = new PizzaShop()
            this.pizzaMan = new PizzaMan()
            //this.hologram = new Hologram()
            //this.reflections = new Reflections()
        })
    }

    update()
    {
        if(this.hologram) {this.hologram.update()}
    }
}