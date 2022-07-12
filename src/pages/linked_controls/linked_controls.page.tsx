import { useRef, useEffect } from 'react'

import { 
  Engine, 
  Scene, 
  MeshBuilder, 
  ArcRotateCamera, 
  Vector3, 
  HemisphericLight, 
  PointLight, 
  Color3, 
  Color4, 
  SpotLight, 
  StandardMaterial, 
  Texture,
  SceneLoader,
  AbstractMesh,
  PhysicsImpostor,
  OimoJSPlugin,
  FreeCamera
} from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui'
import "@babylonjs/loaders/OBJ"
import "@babylonjs/loaders/STL"




const LinkedControlsPage = () => {
    const canvasRef = useRef(null)


    useEffect(()=> {
    
        if( !canvasRef.current ) {
            console.log("canvas not set")
            return
        }
    
        const engine = new Engine(canvasRef.current, true, {  })
    
        const scene = new Scene(engine, {})

        
        scene.fogEnabled = true

        scene.fogColor = Color3.Teal()
        scene.fogDensity = .5
        scene.fogMode = Scene.FOGMODE_LINEAR


        var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        camera.attachControl(true)
    
    
        const light0 = new HemisphericLight(
            "light0", new Vector3(0, 20, 0), scene
        )
        light0.diffuse = new Color3(.8, .8, .8) // sky color
        light0.specular = new Color3(0, 0, .3)   // its highlight on the ground
        light0.groundColor = new Color3(0, 0, 0)  // ground color
    
        
        const light1 = new SpotLight(
            "light1", 
            new Vector3(0, 20, 0), 
            Vector3.Zero(), 
            0.8,  // angle, 
            2, 
            scene
        )
        light1.diffuse = Color3.Red()
        light1.specular = Color3.Red()

        
        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = MeshBuilder.CreateSphere("sphere1", { diameter: 2 });

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

    
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere2 = MeshBuilder.CreateSphere("sphere2", { diameter: 2 });

        // Move the sphere upward 1/2 its height
        sphere2.position.y = 1;
        sphere2.position.x = 4;
    
    
            
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = MeshBuilder.CreateGround("ground1", { width: 20, height: 20 });


        var rect1 = new Rectangle();
        rect1.width = 0.2;
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.color = "Orange";
        rect1.thickness = 4;
        rect1.background = "green";

        advancedTexture.addControl(rect1);
        rect1.linkWithMesh(sphere);   
        rect1.linkOffsetY = -150;
    
        var label = new TextBlock();
        label.text = "Sphere";
        rect1.addControl(label);

    
        var rect2 = new Rectangle();
        rect2.width = 0.2;
        rect2.height = "40px";
        rect2.cornerRadius = 20;
        rect2.color = "Orange";
        rect2.thickness = 4;
        rect2.background = "green";

        advancedTexture.addControl(rect2);
        rect2.linkWithMesh(sphere2);   
        rect2.linkOffsetY = -150;
    
        var label = new TextBlock();
        label.text = "Sphere 2";
        rect2.addControl(label);

        


        let alpha = 0
        scene.registerBeforeRender(()=> {
            // alpha += 0.01
        })
        engine.runRenderLoop(()=> scene.render())
        
    }, [])
  
  
    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default LinkedControlsPage