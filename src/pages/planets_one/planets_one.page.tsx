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




interface Planet {
    name: string,
    diameter: number,
    x: number,
}
const PlanetsOnePage = () => {
    const canvasRef = useRef(null)


    const planets: Array<Planet> = [
        {
            diameter: 2,
            x: -30,
            name: 'Mercury'
        },
        {
            diameter: 6,
            x: 0,
            name: 'Venus'
        },
        {
            diameter: 6,
            x: 20,
            name: 'Earth'
        },
        {
            diameter: 3,
            x: 50,
            name: 'Mars'
        },
        {
            diameter: 69, 
            x: 100,
            name: 'Jupiter'
        },
        {
            diameter: 58, 
            x: 200,
            name: 'Saturn'
        },
        {
            diameter: 25, 
            x: 280,
            name: 'Uranus'
        },
        {
            diameter: 24, 
            x: 320,
            name: 'Neptune'
        }
    ]
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


        // const camera = new ArcRotateCamera(
        //     "Camera", 2, 1, 560, Vector3.Zero(), scene
        // )
        const camera = new ArcRotateCamera(
            "Camera", 2, 1, 560, new Vector3(-80, 0, 0), scene
        )

        // camera wont zoom out further after this
        // camera.upperRadiusLimit = 350
        // camera wont zoom in further after this
        // camera.lowerRadiusLimit = 100
        // camera.wheelPrecision = 5

        // camera.upperAlphaLimit = -1.291982048345054;
        // camera.lowerAlphaLimit = -5.991982048345054;
        // camera.upperBetaLimit = 1.339665111804426;
        // camera.lowerBetaLimit = 0.339665111804426;

        // camera.panningSensibility = 10;
        // camera.panningDistanceLimit = 50;


        // camera.useBouncingBehavior = true
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
    


        let UI = AdvancedDynamicTexture.CreateFullscreenUI("UI")

        planets.forEach(({ diameter, x, name })=> {
            let sphere = MeshBuilder.CreateSphere(
            `sphere${diameter}`, { diameter }
            )
            sphere.position = new Vector3( x, 0, 0 )
            sphere.position.x -= 200

            let textRect = createRect()
            
            UI.addControl(textRect)

            textRect.linkWithMesh(sphere)
            textRect.linkOffsetY =  - 20
            
            // label
            let labelE = createLabel(name)
            textRect.addControl(labelE);
        })


        scene.registerBeforeRender(()=> {
            camera.alpha += 0.01
        })
        engine.runRenderLoop(()=> scene.render())
        
    }, [])

    const createRect = (): Rectangle => {
        var rect = new Rectangle()
        rect.width = 0.16
        rect.height = "24px"
        rect.cornerRadius = 10
        rect.color = "Orange"
        rect.thickness = 4
        rect.background = "teal"

        return rect
    }
    const createLabel = (text: string): TextBlock => {
        var label = new TextBlock()
        label.text = text
        label.fontSize = 10
        return label
    }
  
  
    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default PlanetsOnePage