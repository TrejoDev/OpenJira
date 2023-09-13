import { UIState} from ".";

type UIActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar'  }
| { type: 'UI - Is Adding Entry', payload: boolean}
| { type: 'UI - Is Dragging', payload: boolean}


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true,
            }

        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false,
            }
        case 'UI - Is Adding Entry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }
        case "UI - Is Dragging":
            return {
                ...state,
                isDragging: action.payload
            }
           
        default:
            return state;
    }
    
}