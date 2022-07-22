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
  AbstractMesh,
  Mesh
} from "@babylonjs/core"
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui'
import "@babylonjs/loaders/OBJ"
import "@babylonjs/loaders/glTF"
import "@babylonjs/loaders/STL"
import { getInput, UserInput } from '../../utils/input.utils'



export const buildFactory = async (canvas: HTMLCanvasElement)=> {
    const engine = new Engine(canvas, true, {  })
    
    const scene = new Scene(engine, {})

    //   const camera = new ArcRotateCamera(
    //     "Camera", 2, 1, 10, Vector3.Zero(), scene
    //   )
    // const camera = new ArcRotateCamera(
    //     "Camera", 2, 1, 32, new Vector3( 0, 2.5, 0 ), scene
    // )
    const camera = new ArcRotateCamera(
        "Camera", 2, 1, 32, new Vector3( 0, 0, 0 ), scene
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

    

  

    // let motherRes = await SceneLoader.ImportMeshAsync(
    //     "", "https://playground.babylonjs.com/scenes/", "dummy2.babylon", scene
    // )
    let htRes = await SceneLoader.ImportMeshAsync(
        "", "http://localhost:3000/assets/", "Heart.obj", scene
    )
    // const mother = motherRes.meshes[0]
    // mother.scaling = new Vector3(2, 2, 2)
    // mother.position.y = .5
    // mother.position.x -= .5




    // const DIAMETER = 32
    // const SPACE = 40
    // const HEIGHT = 6


    // const cylindrMat = new StandardMaterial("cylindrMat", scene)
    // cylindrMat.emissiveColor = new Color3(0, 0, .2)
    // cylindrMat.diffuseTexture = new Texture("/assets/tile.jpg")

    
    const pads = Array<Mesh>()
    // new Array(5).fill(0).map((_, index: number)=> {
    //   const cylindr = MeshBuilder.CreateCylinder(
    //     `Cylinder${index}`, { diameter: 8, height: .5, tessellation: 8 }
    //   )
    //   cylindr.position.x -= index * DIAMETER/3
    //   cylindr.position.y += HEIGHT / 4

    //   cylindr.material = cylindrMat

    //   const padModel: AbstractMesh | null = mother.clone("mother "+ index, cylindr)
    //   if( padModel ) padModel.isVisible = true

    //   pads.push(cylindr)
    // })
    // mother.isVisible = false
    // pads.forEach((m)=> m.position.x += pads.length * 4.2 )
    
    
    // space ship
    // Intergalactic_Spaceship-(Wavefront)
    // try {
    //     const spaceShipRes = await SceneLoader.ImportMeshAsync(
    //         "", "http://localhost:3000/assets/", "Heart.obj", scene
    //     )
    //     const spaceShip = spaceShipRes.meshes[0]
    //     spaceShip.scaling = new Vector3(2, 2, 2)
    //     // spaceShip.position.y = .5
    //     // spaceShip.position.x -= .5
    // } catch (error) {
    //     console.error("could not load ship ", error)
    // }

    // SceneLoader.ImportMesh("", "http://localhost:3000/assets/", "Heart.obj", scene, function (meshes) {          
    //     // scene.createDefaultCameraOrLight(true, true, true)
    //     // scene.createDefaultEnvironment()
        
    //     // meshes[0].scaling = new Vector3(2, 2, 2)
    //     //   meshes[0].scaling = new Vector3(3, 3, 3)
    //     //   meshes[0].rotation.x = .03
    //     // meshes[0].rotation.z = 0
    //     //   meshes[0].position.y = -2.8
    //     // meshes[0].position.y = 1
    // }, null, (_, msg, exc)=> {
    //     console.log("could not load model ", msg, " exc ", exc)
    // })



    // ui
    // const gui = AdvancedDynamicTexture.CreateFullscreenUI("UI")

    // // 

    // let label = new TextBlock()
    // label.text = "ACTIVE"
    // label.fontSize = "16px"
    // label.color = "white"

    // const rectangle = new Rectangle("Rectangle")
    // rectangle.background = "darkgreen"
    // rectangle.height = "32px"
    // rectangle.alpha = .7
    // // rectangle.width = "30px"
    // rectangle.width = "160px"
    // rectangle.cornerRadius = 8
    // rectangle.thickness = 1
    // rectangle.linkOffsetX = 40
    // rectangle.top = 10
    // rectangle.zIndex = 100
    // rectangle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP

    
    // rectangle.addControl(label)

    // // if( mother ) {
    // //   label.linkWithMesh(mother)
    // // }
    // gui.addControl(rectangle)

    // const rectangle2 = new Rectangle("Rectangle")
    // rectangle2.background = "transparent"
    // rectangle2.height = "32px"
    // rectangle2.alpha = .7
    // // rectangle.width = "30px"
    // rectangle2.width = "200px"
    // rectangle2.cornerRadius = 8
    // rectangle2.thickness = .4
    // rectangle2.linkOffsetX = 40
    // rectangle2.top = -10
    // rectangle2.zIndex = 200
    // rectangle2.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM


    // let label2 = new TextBlock()
    // label2.text = "Raised By Wolves"
    // label2.color = "white"
    // label2.fontSize = "16px"
    // label2.fontWeight = "normal"
    
    // rectangle2.addControl(label2)

    // gui.addControl(rectangle2)



    let alpha = 0
    scene.registerBeforeRender(()=> {
        // if( userInput ) console.log("userInput is ", userInput)
                    
        alpha += 0.01
        // cylindr.rotation.y += 0.02

        pads.forEach((pad)=> {
            pad.rotation.y += 0.02
        })
        // if( mother ) { 
        //     mother.rotation.y += 0.02 // Math.cos(alpha)
        // }
    })
    engine.runRenderLoop(()=> scene.render())


    // when page resizes, resize engine
    window.addEventListener("resize", ()=> engine.resize())

}