


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