<a id="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<h1 align="center">Todo List</h1>
<p align="center">Deployment: <a href="https://todolist-ljdr.onrender.com/">https://todolist-ljdr.onrender.com/</a></p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div id="about-the-project"></div>

[![Product Name Screen Shot][product-screenshot]](https://example.com)


This project focuses on building a Todo-list application using ReactJS and NodeJS. The initial version (version 1) utilizes ```json-server``` for the backend. The aim of this project is to help users manage their to-do lists, providing all basic functionalities such as "Create," "Read," "Update," and "Delete."

**Update of version 2**: 
- At version 2 of the application, I add RESTful API is build with NodeJS and ExpressJS at the back-end of this project. The Databases of Todo-list is placed on cloud service [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). 
- Back-end github link: https://github.com/hoanghai912/todolist-backend. If you want to run the back-end at your computerm, please edit variable ```baseUrl``` in file ```services/todo.js``` suitable with the host of back-end.
- I have deployed the project to cloud service [Render.com](Render.com). The link of the web application is placed on top of the README.md. High recommended you to visit the webiste to see the result of the application.
- Issue: The application still doesn't have best performance because the delay of the server both [Render.com](Render.com) and [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). So it will take more time to start and work correctly.

### Built With
<div id="build-with"></div>

* [![React][React.js]][React-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Node.js][Node.js]][Nodejs-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
<div id="getting-started"></div>

### Prerequisites

Install yarn or npm to run this project

### Installation

## Getting Started

### Clone this project
```
git clone https://github.com/hoanghai912/todolist.git
```

### Install
```
yarn installl
```

### Run the server
```
yarn run server
```

### Run the Application
```
yarn run dev
```

<!-- CONTACT -->
## Contact
<div id="contact"></div>

Hai Hoang - hoangtienhai911@gmail.com

Project Link: [https://github.com/hoanghai912/todolist](https://github.com/hoanghai912/todolist)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/haihoang911/
[product-screenshot]: images/screen1.PNG


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/


[Tailwind]: https://img.shields.io/badge/Tailwind-20232A?style=for-the-badge&logo=tailwindcss&logoColor=a5f3fc
[Tailwind-url]: https://tailwindcss.com/

[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js
[Nodejs-url]: https://nodejs.org/en