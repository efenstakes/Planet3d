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
import "@babylonjs/loaders/STL"
import { getInput, UserInput } from '../../utils/input.utils'
import { buildFactory } from './raised_by_wolves_factory.utils'





const RaisedByWolvesFactoryPage = () => {
    const canvasRef = useRef(null)

    useEffect(()=> {
  
        if( !canvasRef.current ) {
            console.log("canvas not set")
            return
        }
    
        // new RBWFactory(canvasRef.current).build()
        buildFactory(canvasRef.current)
        
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

export default RaisedByWolvesFactoryPage
