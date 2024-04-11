<!-- PROJECT LOGO -->
<a name="readme-top"></a>
<br />
<div align="center">
    <img src="assets/chamber-bot.jpeg" alt="Logo" width="80" height="80">

  <h3 align="center">Discord Trivia Bot</h3>

</div>



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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
A basic discord bot for trivia questions. Simple, straightforward, and with a few Easter Eggs for friends.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
<div align="center">
    <a href="https://react.dev/" target="_blank"><img src="assets/1631110818-logo-react-js.png" alt="Logo" width="120" height="80"></a>
    <a href="https://nodejs.org/en" target="_blank"><img src="assets/1_bc9pmTiyKR0WNPka2w3e0Q.png" alt="Logo" width="80" height="80"></a>
</div>
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## How To Make Code Updates
1. Make changes to code locally.
2. Open WinSCP and connect to Hostinger VPS Connection
3. Navigate to /usr/local/lsws/trivia-bot
4. Upload new code to appropriate folders
5. NPM Install to make sure node is up-to-date
6. Open Terminal, use SSH pass in 1Password to log into root user
7. Navigate to trivia-bot folder in terminal
8. Use PM2 to check, stop or start processes:
    - pm2 list - checks running processes
    - pm2 stop - stop running processes
    - pm2 start index.js - run index.js
Process should be running in background and you should be able to close session

## OpenLiteSpeed Admin Access 
1. On Hostinger, Navigate to VPS tab
2. Click Manage button
3. Take IP from top of VPS information table and navigate to https://IP:7080
4. Admin Credentials in 1Password as CyberPanel Login

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thanks to the <a href="https://github.com/Koratsama">best co-contributor in the world</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
