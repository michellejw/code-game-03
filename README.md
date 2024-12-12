# Code challenge scavenger hunt.

This is the second iteration of the code challenge scavenger hunt. I'm starting from scratch.

It's a scavenger hunt for kids (~7-10 years old). The site is basically a puzzle game where the user solves a very easy code puzzle (perhaps we could use Pyodide?) and if they get it right, they get directions to a spot in the house. At that spot, there will be hidden a code that can then unlock the next code puzzle. this goes on for maybe 5 or 6 puzzles. The final puzzle will direct them to the spot where they can find a little prize.

The game really requires a parent's participaation because the first thing upon starting the game is for the parent to choose a puzzle set from a list of possible puzzle sets. Then they need to provide a clue locations throughout the house/space corresponding to the total number of questions in the puzzle set. The parent should be prompted to choose locations along with the clue text to unlock the next puzzle. The parent should also be prompted to choose a location for the final puzzle.

Once the game is set up, the parent should be able to start the game. The main part of the game, where the kids play, will be a single page. There should be:

- a title
- the question/puzzle title (e.g. "Puzzle 1")
- pyodide terminal where they can answer the question
- a button to submit the answer

When they get the right answer, they should get a clue telling them where to find the code (on a piece of paper) that will unlock the next puzzle. When they get the right answer for the last puzzle, they should get a message that they won the game, with instructions on where to find a small prize.

There should be a really simple nav bar that takes them back to the initial setup (the part for the parent).

This version of the game will not have user logins.

From the dev perspective, the puzzle sets should be straightforward enough that I can write them easily myself and add new sets whenever I want to. Perhaps each puzzle question set could be a its own file including both questions and answers and a hint. They should then be easily imported into the game (maybe even automatically, recognizing that the file exists in a particular directory).

The site will be built with Next.js and Tailwind CSS. The site will be hosted on Vercel.

h1 headers should be in the font "Londrina Shadow", and other headers should be in the font "Londrina Solid". Body text should be in the font "Inconsolata". 

the main page should have two clickable cards, one for the parent setup and one for the game. The users should be guided so that they know that step 1 requires a parent to setup the clues, and step 2 is where the game is played. The sequence would be: parent clicks on the setup card, then they fill out the form, and when they're done it goes back to the main page. At that point, the the kid can click on the "play game" card and the game will start. The play game card should be grayed out or unavailable somehow until the parent has completed their part. 

The site should be responsive and look good on mobile devices.

The site should be accessible and easy to use.

The site should be fast and smooth.

The site should be beautiful and fun.
