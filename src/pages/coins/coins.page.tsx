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




const CoinsPage = () => {
    const canvasRef = useRef(null)

    useEffect(()=> {
    
        if( !canvasRef.current ) {
            console.log("canvas not set")
            return
        }
    
        const engine = new Engine(canvasRef.current, true, {  })
    
        const scene = new Scene(engine, {})
        scene.fogEnabled = true
        scene.fogColor = Color3.Black()
        scene.fogDensity = 1
        scene.fogMode = Scene.FOGMODE_LINEAR

        scene.enablePhysics(
            new Vector3(0, -9.81, 0),
            new OimoJSPlugin()
        )
    
        const camera = new ArcRotateCamera(
            "Camera", 2, 1, 240, new Vector3( 60, 0, 0 ), scene
        )

        // camera wont zoom out further after this
        // camera.upperRadiusLimit = 350
        // // camera wont zoom in further after this
        // camera.lowerRadiusLimit = 100
        // camera.wheelPrecision = 5

        // camera.upperAlphaLimit = -1.291982048345054;
        // camera.lowerAlphaLimit = -5.991982048345054;
        // camera.upperBetaLimit = 1.339665111804426;
        // camera.lowerBetaLimit = 0.339665111804426;

        // camera.panningSensibility = 10;
        // camera.panningDistanceLimit = 50;


        camera.useBouncingBehavior = true
        camera.attachControl(true)
    
    
        const light0 = new HemisphericLight(
            "light0", new Vector3(0, 20, 0), scene
        )
        // light0.diffuse = new Color3(0, 0, .1) // sky color
        // light0.specular = new Color3(0, 0, .1)   // its highlight on the ground
        // light0.groundColor = new Color3(0, 0, 0)  // ground color
        // light0.diffuse = new Color3(.8, .8, .8) // sky color
        // light0.specular = new Color3(0, 0, .3)   // its highlight on the ground
        // light0.groundColor = new Color3(0, 0, 0)  // ground color
    
        
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
        // const ground = MeshBuilder.CreateGround(
        //     "ground", { width: 300, height: 300, subdivisions: 20 }
        // )
        // const groundMat = new StandardMaterial("groundMat", scene)
        // groundMat.bumpTexture = new Texture("/assets/bg-coins.jpg")
        // ground.material = groundMat
        // ground.physicsImpostor = new PhysicsImpostor(
        //     ground, PhysicsImpostor.BoxImpostor, 
        //     {
        //         mass: 0, restitution: .9, friction: 2
        //     }
        // )
        const ground = MeshBuilder.CreateCylinder(
            "ground", { diameter: 300, height: 12, tessellation: 64 }
        )
        ground.position.x += 60
        const groundMat = new StandardMaterial("groundMat", scene)
        groundMat.bumpTexture = new Texture("/assets/bg-coins.jpg")
        ground.material = groundMat
        ground.physicsImpostor = new PhysicsImpostor(
            ground, PhysicsImpostor.CylinderImpostor, 
            {
                mass: 0, restitution: .9, friction: 2
            }
        )
    
        
    
        // const box = MeshBuilder.CreateBox(
        //   "Box", { height: 2, width: 2, depth: 10 }, scene
        // )
    
        const DIAMETER = 8
        const SPACE = 40
        const HEIGHT = 2
    
    
        let sphereMat = new StandardMaterial("cylindrMat", scene)
        sphereMat.emissiveColor = new Color3(0, 0, .2)
        // sphereMat.diffuseTexture = new Texture("/assets/tile.jpg")
  
        const OFFSET = 80
        new Array(160).fill(0).map((_, index: number)=> {
            const sphere = MeshBuilder.CreateCylinder(
                `sphere${index}`, { diameter: DIAMETER, height: 1 }
            )

            // sphere.position.x -= index * SPACE
            sphere.position.y = Math.random() * 120
            sphere.position.x = (index / 2 === 0) ? -Math.random() * OFFSET : Math.random() * OFFSET
            sphere.position.z = (index / 2 === 0) ? -Math.random() * OFFSET : Math.random() * OFFSET

            sphereMat.diffuseColor = Color3.Yellow()
            sphere.material = sphereMat
                
            const sphereImpostr = new PhysicsImpostor(
                sphere, PhysicsImpostor.SphereImpostor, 
                {
                    mass: 0, restitution: .1,
                }
            )
            // mass: 9, restitution: .1,
            // mass: 3, restitution: .1,
            sphere.physicsImpostor = sphereImpostr
        })


    

        scene.registerBeforeRender(()=> {
            // camera.alpha += 0.01
        })
        engine.runRenderLoop(()=> scene.render())
        
    }, [])
  
  
    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default CoinsPage