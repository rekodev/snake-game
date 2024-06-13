# Snake Game

![image](https://github.com/rekodev/snake-game-react/assets/112801448/56defbcc-51c9-4fcf-8bf1-fdf69bae4494)

This is my final project for the CS50 course. It is a classic Snake game built with modern web technologies.

You can play it by clicking [this link](https://snake-game-react-snowy.vercel.app/).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Special Thanks](#special-thanks)

## Overview
This Snake game allows players to control a snake on a game board. The game includes functionality to play, pause, and restart the game. If the snake hits itself or the wall, the game ends. The game also keeps track of scores, allowing the player to submit their score. There's also a `scores` page that displays the most recent scores and the top 10 highest scores of all time.

## Features
- **Play/Pause**: Players can start and pause the game.
- **Collision Detection**: The game ends if the snake collides with itself or the wall.
- **Score Submission** The player can submit their score after the game ends.
- **Score Tracking**: Scores are saved and displayed. There are two scoreboards:
  - Most recent scores
  - Top 10 highest scores of all time

## Technologies Used
- **Frontend**: React with Next.js
  - The game board is built using the HTML `canvas` element.
- **Backend**: Hono (JavaScript backend framework)
  - API endpoints for score management.
- **Database**: PostgreSQL
  - Using Drizzle ORM for database interactions.

## Special Thanks
Special thanks to [clear-code-projects](https://github.com/clear-code-projects) for providing the snake assets used in this game.

