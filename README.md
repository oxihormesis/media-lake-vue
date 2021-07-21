# Film Lake :movie_camera: :ocean:

## A dashingly designed application for searching and discovering everything related to film!

[![Netlify Status](https://api.netlify.com/api/v1/badges/7dffeabf-6de0-40f9-bb6a-55044018dc41/deploy-status)](https://app.netlify.com/sites/filmlake/deploys)

Live demo: [https://filmlake.netlify.app](https://filmlake.netlify.app)

#### Features:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:gem: Find the newest, hottest shows on the trending page

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:film_projector: Search for people, movies and tv shows

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:green_heart: Build a watchlist

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:star: Rate tv and movies

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:tv: Discover your next flick! Browse millions of media records

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:open_file_folder:  Filter by genre, year and type.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:dizzy: Sort results by revenue, ratings, popularity, and release date

#### Powered by one of the largest film databases in the world [https://tmdb.com](https://tmdb.com)

---

## Setup the project on your machine
1. Clone this repo

2. Navigate to the project's directory and run:
```
npm install
```
-------------------


## Run It Locally
#### 1. Start the development server
In project directory, run:
    ```
    npm run serve
    ```

#### 2. Navigate to `localhost:8080` in your browser to see the project running locally!

#### 3. (optional) Expose local server to web for TMDB Authentication
If you want to perform any actions that require TMDB auth such as liking, rating, or reviewing movies, you must expose your development server to the internet using ngrok(or your favorite tunneling method, ngrok is great and free)

i. Download ngrok here [https://ngrok.com/download](https://ngrok.com/download)

ii. Follow ngrok's installation instructions. Then in the directory where you unzipped ngrok:
`ngrok http 8080 -host-header=rewrite`

iii. Finally, copy the `.env` file and name it `.env.development`. Update it's `VUE_APP_BASE_URL` environment variable with your ngrok domain

iv. Test out some auth-required features- contribute to TMDB by rating a movie!

---------------------------

## Deploy for Production

### 1. Compile and Minify project
In the project directory run:
```
npm run build
```
### 2. Change `VUE_APP_BASE_URL` in .env file to your domain


--- 

## Author

Kevin Graham - <kevingrahamtech@gmail.com>

---

## License and copyright
This project is licensed under the MIT license and is free to use by any and all