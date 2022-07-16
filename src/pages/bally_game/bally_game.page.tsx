import { Color3, Engine, FollowCamera, HemisphericLight, MeshBuilder, OimoJSPlugin, PhysicsImpostor, Scene, SpotLight, Vector3 } from '@babylonjs/core'
import { useEffect, useState, useRef } from 'react'
import { GameInput, getBallGameInput, getInput, UserInput } from '../../utils/input.utils'

function BallyGamePage() {
    const canvasRef = useRef(null)
    
    const FOLLOW_ALLOWANCE = new Vector3(0, 0, -2)


    useEffect(()=> {

        if( !canvasRef ) return

        const engine = new Engine(canvasRef.current, true, {  })
        

        const scene = new Scene(engine, {  })
        scene.enablePhysics(
            new Vector3(0, -9.81, 0),
            new OimoJSPlugin()
        )

        scene.fogEnabled = true
        scene.fogColor = Color3.Teal()
        scene.fogDensity = .5
        scene.fogMode = Scene.FOGMODE_LINEAR

        // camera
        const camera = new FollowCamera(
            "camera", new Vector3(0, 3, -10), scene
        )

        // height above the the center of the target
        camera.heightOffset = 3

        // radial distance from target plus height offset
        camera.radius = 10

        // acceleration in moving from current to goal position
        camera.cameraAcceleration = 0.5

        // speed at which acceleration is halted
        camera.maxCameraSpeed = 100

        camera.attachControl(true)

        // camera.inputs.removeByType('FollowCameraPointersInput')
        // camera.inputs.addKeyboard()



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
    


        // ground
        const ground = MeshBuilder.CreateGround(
            "ground", { width: 20, height: 100 }, scene
        )
        ground.position.z = -10
        ground.physicsImpostor = new PhysicsImpostor(
            ground, 
            PhysicsImpostor.BoxImpostor, 
            { mass: 0, restitution: 0 }
        )

        // ball
        const ball = MeshBuilder.CreateSphere(
            "ball", { diameter: 1, segments: 24 }, scene
        )
        ball.position.y = 0.5
        ball.physicsImpostor = new PhysicsImpostor(
            ball, 
            PhysicsImpostor.SphereImpostor, 
            { mass: 10, restitution: 0, friction: 22 }
        )

        // set camera target
        camera.lockedTarget = ball

        

        // A => code => KeyA
        // W => code => KeyW
        // S => code => KeyS
        // D => code => KeyD
        // Right => code => ArrowRight
        // Left => code => ArrowLeft
        // Up => code => ArrowUp
        // Down => code => ArrowDown
        let userInput: GameInput | null = null
        scene.onKeyboardObservable.add(({ event })=> {
            // console.log('info ', event)

            userInput = getBallGameInput(event as KeyboardEvent)
        })

        
        const FORWARD_VECTOR = new Vector3(0, 0, .1)
        const LEFT_VECTOR = new Vector3(.1, 0, 0)
        const RIGHT_VECTOR = new Vector3(-.1, 0, 0)
        scene.registerBeforeRender(()=> {
            if( !userInput ) return
            
            
            console.log("userInput ", userInput)

            switch (userInput) {
                case GameInput.FORWARD:
                    ball.physicsImpostor?.applyForce(
                        FORWARD_VECTOR, 
                        ball.physicsImpostor.getObjectCenter()
                    )
                    break;
            
                case GameInput.LEFT:
                    ball.physicsImpostor?.applyForce(
                        LEFT_VECTOR, 
                        ball.physicsImpostor.getObjectCenter()
                    )
                    break;
            
                case GameInput.RIGHT:
                    ball.physicsImpostor?.applyForce(
                        RIGHT_VECTOR, 
                        ball.physicsImpostor.getObjectCenter()
                    )
                    break;
            
                default:
                    break;
            }

            userInput = null
        })


        // run engine
        engine.runRenderLoop(()=> scene.render())

        // resize
        window.addEventListener("resize", ()=> engine.resize())

        // remove resize event on closure
        return ()=> window.removeEventListener("resize", ()=> {})
    }, [])
    // //set up input map
    // var inputMap = {};
    // scene.actionManager = new BABYLON.ActionManager(scene);
    // scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    //     inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    
    // }));
    // scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    //     inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        
    // }));

    // scene.onBeforeRenderObservable.add(function(){
    //    if(tank){
    //     if(inputMap["w"] || inputMap["ArrowUp"]){
    //       tank.moveWithCollisions(tank.frontVector.multiplyByFloats(tank.speed,tank.speed,tank.speed));
    //     }
    //     if(inputMap["a"] || inputMap["ArrowLeft"]){
    //        tank.rotation.y -= .1;
    //        tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y),0,Math.cos(tank.rotation.y));
    //     }
    //     if(inputMap["s"] || inputMap["ArrowDown"]){
    //        tank.moveWithCollisions(tank.frontVector.multiplyByFloats(-tank.speed,-tank.speed,-tank.speed)); 
    //     }
    //     if(inputMap["d"] || inputMap["ArrowRight"]){
    //        tank.rotation.y += .1;
    //        tank.frontVector = new BABYLON.Vector3(Math.sin(tank.rotation.y),0,Math.cos(tank.rotation.y));
    //      } 
    //    }
    
        
    // })

    return (
        <div>
            <canvas ref={canvasRef} className="render_canvas"></canvas>
        </div>
    )
}

export default BallyGamePage