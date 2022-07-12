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
  OimoJSPlugin
} from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui'
import "@babylonjs/loaders/OBJ"
import "@babylonjs/loaders/STL"




const BallPage = () => {
    const canvasRef = useRef(null)

    useEffect(()=> {
    
        if( !canvasRef.current ) {
            console.log("canvas not set")
            return
        }
    
        const engine = new Engine(canvasRef.current, true, {  })
    
        const scene = new Scene(engine, {})
        scene.enablePhysics(
            new Vector3(0, -9.81, 0),
            new OimoJSPlugin()
        )
    
        const camera = new ArcRotateCamera(
            "Camera", 2, 1, 180, Vector3.Zero(), scene
        )

        // camera wont zoom out further after this
        camera.upperRadiusLimit = 350
        // camera wont zoom in further after this
        camera.lowerRadiusLimit = 100
        camera.wheelPrecision = 5

        camera.upperAlphaLimit = -1.291982048345054;
        camera.lowerAlphaLimit = -5.991982048345054;
        camera.upperBetaLimit = 1.339665111804426;
        camera.lowerBetaLimit = 0.339665111804426;

        camera.panningSensibility = 10;
        camera.panningDistanceLimit = 50;


        camera.useBouncingBehavior = true
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
    
        
        // ground
        const ground = MeshBuilder.CreateGround(
            "ground", { width: 500, height: 500, subdivisions: 20 }
        )
        const groundMat = new StandardMaterial("groundMat", scene)
        groundMat.diffuseTexture = new Texture("/assets/tile.jpg")
        ground.material = groundMat
        ground.physicsImpostor = new PhysicsImpostor(
            ground, PhysicsImpostor.BoxImpostor, 
            {
                mass: 0, restitution: .9, friction: 2
            }
        )
    
        
    
        // const box = MeshBuilder.CreateBox(
        //   "Box", { height: 2, width: 2, depth: 10 }, scene
        // )
    
        const DIAMETER = 6
        const SPACE = 40
        const HEIGHT = 2
    
    
        let sphereMat = new StandardMaterial("cylindrMat", scene)
        sphereMat.emissiveColor = new Color3(0, 0, .2)
        // sphereMat.diffuseTexture = new Texture("/assets/tile.jpg")
  

        new Array(150).fill(0).map((_, index: number)=> {
            const sphere = MeshBuilder.CreateSphere(
            `sphere${index}`, { diameter: DIAMETER }
            )
            // sphere.position.x -= index * SPACE
            sphere.position.y = Math.random() * 120
            sphere.position.x = Math.random() * 20
            sphere.position.z = Math.random() * 20

            sphereMat.diffuseColor = Color3.Random()
            sphere.material = sphereMat
            
    
            const sphereImpostr = new PhysicsImpostor(
                sphere, PhysicsImpostor.SphereImpostor, 
                {
                    mass: 60, restitution: .2, friction: 2
                }
            )
            sphere.physicsImpostor = sphereImpostr
        })


    

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

export default BallPage