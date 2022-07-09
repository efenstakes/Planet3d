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
  AbstractMesh
} from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui'
import "@babylonjs/loaders/OBJ"
import "@babylonjs/loaders/STL"


const RaisedByWolvesPage = () => {
    const canvasRef = useRef(null)

    useEffect(()=> {
  
      if( !canvasRef.current ) {
        console.log("canvas not set")
        return
      }
  
      const engine = new Engine(canvasRef.current, true, {  })
  
      const scene = new Scene(engine, {})
  
      const camera = new ArcRotateCamera(
        "Camera", 2, 1, 10, Vector3.Zero(), scene
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
      //   "ground", { width: 500, height: 500, subdivisions: 20 }
      // )
      // const groundMat = new StandardMaterial("groundMat", scene)
      // groundMat.diffuseTexture = new Texture("/assets/tile.jpg")
      // ground.material = groundMat
  
      
  
      let mother: AbstractMesh
      SceneLoader.ImportMesh("", "https://playground.babylonjs.com/scenes/", "dummy2.babylon", scene, function (meshes) {          
          // scene.createDefaultCameraOrLight(true, true, true)
          // scene.createDefaultEnvironment()
          
          meshes[0].scaling = new Vector3(3, 3, 3)
          meshes[0].rotation.x = .03
          // meshes[0].rotation.z = 0
          meshes[0].position.y = -2.8
  
          mother = meshes[0]
      })
  
      // const box = MeshBuilder.CreateBox(
      //   "Box", { height: 2, width: 2, depth: 10 }, scene
      // )
  
      // const DIAMETER = 32
      // const SPACE = 40
      // const HEIGHT = 6
  
  
      // const cylindrMat = new StandardMaterial("cylindrMat", scene)
      // cylindrMat.emissiveColor = new Color3(0, 0, .2)
      // cylindrMat.diffuseTexture = new Texture("/assets/tile.jpg")
  
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
      const rectangle = new Rectangle("Rectangle")
      rectangle.background = "darkgreen"
      rectangle.height = "40px"
      rectangle.alpha = .7
      // rectangle.width = "30px"
      rectangle.width = "120px"
      rectangle.cornerRadius = 8
      rectangle.thickness = 1
      rectangle.linkOffsetX = 40
      rectangle.top = 10
      rectangle.zIndex = 100
      rectangle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
  
  
      let label = new TextBlock()
      label.text = "ACTIVE"
      label.color = "white"
      
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
  
  
  
  
      let alpha = 0
      scene.registerBeforeRender(()=> {
        alpha += 0.01
        if( mother ) { 
          mother.rotation.y += 0.02 // Math.cos(alpha)
        }
      })
      engine.runRenderLoop(()=> scene.render())


      // when page resizes, resize engine
      window.addEventListener("resize", ()=> engine.resize())
  
      return ()=> {
        window.removeEventListener("resize", ()=> {})
      }
    }, [])
  
  
    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default RaisedByWolvesPage