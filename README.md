# FEC
A fashion ecommerce web app built with React allowing users to browse through a wide selection of items through a simple interface.
Includes standard retail features such as style selection, related item browsing, add to bag, checkout and reading, writing and searching of questions and reviews.

## Features Overview
- Browse different styles and check for sales and stock availability
- Expand product gallery for larger view of images
- Navigate to different related items by clicking product cards
- Save current product to outfit list to keep with you as you browse
- Search for keywords for most helpful Q&As
- Analyze products ratings at a glance, with detailed options for fit, comfort, length etc.
- Search through reviews, with sorting options for relevance, date posted and helpfulness
- Add your own reviews, questions and answers with a built-in compressed image upload option
- Upvote or report reviews, questions and answers.
- Entire app is optimized through text compression, lazy loading and minification.
- &gt;70% test coverage

## Usage
gifs go here
![FEC_Demo](https://user-images.githubusercontent.com/66839046/173204109-b94c3a11-55f0-45eb-87d1-6114f0a99753.gif)


## Technologies
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white" />
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />

## Setup
- Clone this repo
- Navigate to root directory and install dependencies:

```
npm install
```

- Generate a Github API key and include it in a <code>.env</code> file in the root directory as follows:

```
TOKEN="your-github-api-token"
```

- Run the app either in development mode:

```
npm run dev
```

- or in production mode with bundle minification:

```
npm start
```

- Navigate to <code>http://localhost:3000/</code> to view the app

## Tests
- Run unit and integration tests using Jest and ReactTestUtils
```
npm test
```
