


export enum GameInput { JUMP, FORWARD, REVERSE, RIGHT, LEFT }

export enum UserInput { Up, Right, Down, Left }


export const getInput = (event: KeyboardEvent): UserInput | null => {
    let userInput: UserInput | null

    switch (event.key) {
        case 'ArrowRight':
            userInput = UserInput.Right
            break;
    
        case 'ArrowLeft':
            userInput = UserInput.Left
            break;
    
        case 'ArrowUp':
            userInput = UserInput.Up
            break;
        case 'KeyW':
            userInput = UserInput.Up
            break;
      
        case 'ArrowDown':
            userInput = UserInput.Down
            break;
                    
        default:
            userInput = null
            break;
    }

    return userInput;
}


export const getBallGameInput = (event: KeyboardEvent): GameInput | null => {
    let userInput: GameInput | null

    switch (event.code) {
        case 'KEYA':
            userInput = GameInput.RIGHT
            break;
        // case 'ArrowRight':
        //     userInput = GameInput.RIGHT
        //     break;
    
        case 'KEYD':
            userInput = GameInput.LEFT
            break;
        // case 'ArrowLeft':
        //     userInput = GameInput.LEFT
        //     break;
    
        // case 'ArrowUp':
        //     userInput = GameInput.FORWARD
        //     break;
        case 'KeyW':
            userInput = GameInput.FORWARD
            break;

                    
        default:
            userInput = null
            break;
    }

    return userInput;
}