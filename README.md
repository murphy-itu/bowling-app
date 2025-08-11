# African Bowling
A game in which players must throw a piece of wood at 15 pins and try to knock down as many as possible. For each player, the game is divided into 5 frames.

Each frame consists of 3 throws. After each frame, the pins are reset.

If all pins are knocked down with the first throw of a frame, it is called a
strike. If all pins are knocked down after the 2nd or 3rd throw, it is called a spare.


***

## Objectives and features
The aim of the game is to calculate the player's score using the following features:

- Add a new throw with the number of pins knocked down
- View real-time point histories for each frame


## Development
#### Technologies Used
- **Language:** TypeScript
- **Frontend:** React, Vite, Tailwind
- **Backend:** Node.js, Express
- **Node version:** v22.18.0 (LTS)

#### Project structure
>📂**frontend /**
>>📂**src /**
>>>📂- **api /** (axiosInstance)
>>>
>>>📂- **components /** (All components such as Header, FrameTable, etc.)
>>>
>>>📂- **interfaces /** (game.ts, which contains the typeScript interfaces for the game)
>>>
>>>
>>>**App.tsx** (All components are grouped here to form the page)
>>
>>**.env**
>
>
>📂**backend /**
>>📂**src /**
>>>📂- **controllers /** (All controllers)
>>>
>>>📂- **models /** (All models in OOP - class)
>>>
>>>📂- **routes /** (All route endpoints)
>>
>>index.ts


#### To run projet for backend and frontend
```sh
    cd backend/ or cd frontend/
    npm install
    npm run dev
```

**Backend port:** 3000 (specified in *index.ts*)

**Frontend .env for the API base URL:**
```env
    VITE_API_BASE_URL=http://localhost:3000
```

#### Project endpoint API backend
http://localhost:3000/game

- **Add new Point Lancer**:  /addPoint
- **Restart game**:  /restart

The logic for functions such as addNewPoint is in **Game.model.ts**

## Web interface
> The game is only available for a laptop web interface, which is not yet responsive for tablets or mobile devices.

## Author 
TSIROFOZAFY Tsihoarana Rolph Nicolatimurphy  
murphytsirofozafy@gmail.com

## Licence
Copyright © 2025  
This project is for a technical test purpose only.
