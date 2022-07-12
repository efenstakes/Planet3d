import { Color3, Engine, FollowCamera, HemisphericLight, Scene, SpotLight, Vector3 } from '@babylonjs/core'
import { useEffect, useState, useRef } from 'react'

function BallyGamePage() {
    const canvasRef = useRef(null)
    


    useEffect(()=> {

        if( !canvasRef ) return

        const engine = new Engine(canvasRef.current, true, {  })

        const scene = new Scene(engine, {  })

        scene.fogEnabled = true
        scene.fogColor = Color3.Teal()
        scene.fogDensity = .5
        scene.fogMode = Scene.FOGMODE_LINEAR

        // camera
        const camera = new FollowCamera(
            "camera", new Vector3(0, 15, -5), scene
        )
        
        camera.attachControl(true)



        // lights
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
    


        engine.runRenderLoop(()=> scene.render())

        window.addEventListener("resize", ()=> engine.resize())

        return ()=> window.removeEventListener("resize", ()=> {})
    }, [])


    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default BallyGamePage