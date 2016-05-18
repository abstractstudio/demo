/** demo.js */

/** A simple sprite. */
function Simplesprite() {
    
    /** Call the sprite constructor. */
    sprite.Sprite.call(this);
    
    /** Redefine the sprite render method. */
    this.render = function(context) {
        
        
        
    }
    
}

/** The demonstration engine subclass. */
function Demo(canvas) {

    /* Call the engine constructor. */
    Engine.call(this);
    
    /* Override the setup method. */
    this.setup = function() {
    
        /* Create a new sprite. */
        this.entities.sprite = new sprite.Sprite();
        
    }
    
    /* Render the engine. */
    this.render = function(delta) {
        
    }
    
}