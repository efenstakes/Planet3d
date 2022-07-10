import { useRef, useEffect, useState } from 'react'

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
  AbstractMesh
} from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui'
import "@babylonjs/loaders/OBJ"
import "@babylonjs/loaders/STL"
import { getInput, UserInput } from '../../utils/input.utils'


const RaisedByWolvesPage = () => {
    const canvasRef = useRef(null)
    const [loadingStatus, setLoadingStatus] = useState<string>("ACTIVATING")
    const titleLabelRef = useRef<TextBlock | null>(null)
    const titleRectRef = useRef<Rectangle | null>(null)


    useEffect(()=> {
  
        if( !canvasRef.current ) {
            console.log("canvas not set")
            return
        }
    
        const engine = new Engine(canvasRef.current, true, {  })
    
        const scene = new Scene(engine, {})
  
        //   const camera = new ArcRotateCamera(
        //     "Camera", 2, 1, 10, Vector3.Zero(), scene
        //   )
        const camera = new ArcRotateCamera(
            "Camera", 2, 1, 7, new Vector3( 0, 2.5, 0 ), scene
        )
  
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
        // const ground = MeshBuilder.CreateGround(
        //     "ground", { width: 500, height: 500, subdivisions: 20 }
        // )
        // ground.position.y = -3
        // const groundMat = new StandardMaterial("groundMat", scene)
        // groundMat.diffuseTexture = new Texture("/assets/tile.jpg")
        // ground.material = groundMat
  
      
  
        let mother: AbstractMesh
        SceneLoader.ImportMesh("", "https://playground.babylonjs.com/scenes/", "dummy2.babylon", scene, function (meshes) {          
            // scene.createDefaultCameraOrLight(true, true, true)
            // scene.createDefaultEnvironment()
            
            meshes[0].scaling = new Vector3(2, 2, 2)
            //   meshes[0].scaling = new Vector3(3, 3, 3)
            //   meshes[0].rotation.x = .03
            // meshes[0].rotation.z = 0
            //   meshes[0].position.y = -2.8
            meshes[0].position.y = 1
    
            mother = meshes[0]

            setLoadingStatus(()=> "ACTIVE")
        })
  
        // const box = MeshBuilder.CreateBox(
        //   "Box", { height: 2, width: 2, depth: 10 }, scene
        // )
    
        const DIAMETER = 32
        const SPACE = 40
        const HEIGHT = 6
  
  
        const cylindrMat = new StandardMaterial("cylindrMat", scene)
        cylindrMat.emissiveColor = new Color3(0, 0, .2)
        cylindrMat.diffuseTexture = new Texture("/assets/tile.jpg")
        const cylindr = MeshBuilder.CreateCylinder(
            `Cylinder`, { diameter: 8, height: .5, tessellation: 8 }
        )
        // cylindr.position.x -= s
        // cylindr.position.y += HEIGHT / 4

        cylindr.material = cylindrMat

        // new Array(5).fill(0).map((_, index: number)=> {
        //   const cylindr = MeshBuilder.CreateCylinder(
        //     `Cylinder${index}`, { diameter: DIAMETER, height: HEIGHT, tessellation: 8 }
        //   )
        //   cylindr.position.x -= index * SPACE
        //   cylindr.position.y += HEIGHT / 4
    
        //   cylindr.material = cylindrMat
        // })
        // new Array(5).fill(0).map((_, index: number)=> {
        //   const cylindr = MeshBuilder.CreateCylinder(
        //     `Cylinder${index}`, { diameter: DIAMETER, height: HEIGHT, tessellation: 8 }
        //   )
        //   cylindr.position.x += index * SPACE
        //   cylindr.position.y += HEIGHT / 4
    
        //   cylindr.material = cylindrMat
        // })
  
  
        // ui
        const gui = AdvancedDynamicTexture.CreateFullscreenUI("UI")
    
        // 
  
        let label = new TextBlock()
        titleLabelRef.current = label
        label.text = loadingStatus.toUpperCase()
        label.fontSize = "16px"
        label.color = "white"

        const rectangle = new Rectangle("Rectangle")
        rectangle.background = "darkgreen"
        rectangle.height = "32px"
        rectangle.alpha = .7
        // rectangle.width = "30px"
        rectangle.width = "160px"
        rectangle.cornerRadius = 8
        rectangle.thickness = 1
        rectangle.linkOffsetX = 40
        rectangle.top = 10
        rectangle.zIndex = 100
        rectangle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
  
        titleRectRef.current = rectangle
        
        rectangle.addControl(label)
    
        // if( mother ) {
        //   label.linkWithMesh(mother)
        // }
        gui.addControl(rectangle)
  
        const rectangle2 = new Rectangle("Rectangle")
        rectangle2.background = "transparent"
        rectangle2.height = "32px"
        rectangle2.alpha = .7
        // rectangle.width = "30px"
        rectangle2.width = "200px"
        rectangle2.cornerRadius = 8
        rectangle2.thickness = .4
        rectangle2.linkOffsetX = 40
        rectangle2.top = -10
        rectangle2.zIndex = 200
        rectangle2.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
  
  
        let label2 = new TextBlock()
        label2.text = "Raised By Wolves"
        label2.color = "white"
        label2.fontSize = "16px"
        label2.fontWeight = "normal"
        
        rectangle2.addControl(label2)
    
        gui.addControl(rectangle2)
  
  
  
        // A => code => KeyA
        // W => code => KeyW
        // S => code => KeyS
        // D => code => KeyD
        // Right => code => ArrowRight
        // Left => code => ArrowLeft
        // Up => code => ArrowUp
        // Down => code => ArrowDown
        let userInput: UserInput | null = null
        scene.onKeyboardObservable.add(({ event })=> {
            // console.log('info ', event)

            userInput = getInput(event as KeyboardEvent)
        })
  
        let alpha = 0
        scene.registerBeforeRender(()=> {
            // if( userInput ) console.log("userInput is ", userInput)
            
            
            alpha += 0.01
            cylindr.rotation.y += 0.02
            if( mother ) { 
                mother.rotation.y += 0.02 // Math.cos(alpha)
            }

            if( userInput === UserInput.Up ) {
                mother.position.y += 0.2
            }
            
            // reset input
            if( userInput ) userInput = null
        })
        engine.runRenderLoop(()=> scene.render())


        // when page resizes, resize engine
        window.addEventListener("resize", ()=> engine.resize())
    
        return ()=> {
            window.removeEventListener("resize", ()=> {})
        }
    }, [])
  
    useEffect(() => {
        if( !titleLabelRef || ! titleLabelRef.current ) return
        titleLabelRef.current.text = loadingStatus

        if( !titleRectRef || ! titleRectRef.current ) return
        titleRectRef.current.background = loadingStatus == "ACTIVATING" ? "black" : "darkgreen"
    }, [ loadingStatus ])
  
    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default RaisedByWolvesPage