# Reevent

## Structures

```
╔══════════════════════╗           ╔═══════════╗ 
║      Components      ║-----------║   App.js  ║
╚══════════════════════╝           ╚═══════════╝       
           |                             |
           |                  ╔════════╗   ╔════════╗                             
           |                  ║ Navbar ║   ║ Router ║                             
           |                  ╚════════╝   ╚════════╝                             
           |                             |           
╔══════════════════════╗ ╔══════════════════════════╗ ╔═══════════════════════╗  
║    Event Component   ║ ║ Authentication Component ║ ║     User Component    ║  
╚══════════════════════╝ ╚══════════════════════════╝ ╚═══════════════════════╝
           |                          |                           |
╔══════════════════════╗ ╔══════════════════════════╗ ╔═══════════════════════╗  
║    Event Actions     ║ ║  Authentication Actions  ║ ║     User Actions      ║  
╚══════════════════════╝ ╚══════════════════════════╝ ╚═══════════════════════╝
           |\                         /\                         /|        
╔════════════════════════════════╗                       ╔═══════════════════╗ 
║   States Maintaned by Redux    ║                       ║   Firebase API    ║
╚════════════════════════════════╝                       ╚═══════════════════╝     
                                                                  |
                                                                  |
-------------------------------------------------------------------------------
                                                                  |
                                                                  |
                                                                  |  
                                                                  | 
                                                             ╔═══════════╗
                                                             ║  Firebase ║
                                                             ╚═══════════╝
                                                                
                
               
                    
```



# Frontend

Frontend is based on React, mainly divided for three components:

|1| Event 

|2| Authentication

|3| User

All three are in src/features.

The components routing is achieved by React-Router and the global states are maintained by React-Redux.

The asynchronous actions is mainly achived by src/featuresasync.

How a request is sent from frontend to backend:
 
- Components call actions.
- Actions send HTTP requests to the server.
- The server sends back the response.
- Actions process the responses and update states.
- Components update with updated states.


# Backend

Backend is implemted by firebase.
