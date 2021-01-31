# Call of Cthulhu Server & Bot Code

## Bot Commands

| Command                                     | Response          | Description                                    |
| ------------------------------------------- | ----------------- | ---------------------------------------------- |
| /cc game list                               | GameDescription[] |                                                |
| /cc game create                             | Game URL          | Creates a new Game Instance. Issuer is Keeper. |
| /cc game delete                             | ack               | Deletes a game session and all resources       |
| /cc character create {gameId}               | Character URL     | Creates a new character in a game              |
| /cc character delete {characterUrl}         | ack               | Deletes a game character                       |
| /cc play {gameId}                           | ack               | Begins a game session in the current channel   |
| /cc play as {characterId}                   | ack               | Begin play mode as a character                 |
| /cc play as keeper                          | ack               | Begin play mode as keeper                      |
| /cc roll \<skill\>                          | Roll Result       | Roll a skill value                             |
| /cc roll \<skill\> with bonus               | Roll Result       | Roll a skill value with a bonus die            |
| /cc roll \<skill\> with bonus=\<numDice\>   | Roll Result       | Roll a skill value with a bonus die            |
| /cc roll \<skill\> with penalty             | Roll Result       | Roll a skill value with a penalty die          |
| /cc roll \<skill\> with penalty=\<numDice\> | Roll Result       | Roll a skill value with a penalty die          |

## Future Ideas

- Combat Tracker (optional initiative)
- Services usable by web client
