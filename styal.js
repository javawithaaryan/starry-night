* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: consolas;
}

body {
    perspective: 1px;
    transform-style: preserve-3d;
    overflow-y: scroll;
    overflow-x: hidden;

}

.hero {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(12, 3, 51, 0.3), rgba(12, 3, 51, 0.3));
    position: relative;
    padding: 0 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: inherit;
}

.hero .content::before {
    background: 50% 50% / cover;
}

nav {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 50%;
}

nav ul li {
    list-style: none;
    display: inline-block;
    margin-left: 40px;
}

nav ul li a {
    text-decoration: none;
    color: #f6f6f6;
    font-size: 20px;
    transition: all .6s ease;
}

nav a:hover {
    color: rgb(255, 238, 0);
    transform: translateY(10px);
}

.content {
    align-items: center;
    transform-style: inherit;
}

.content h1 {
    font-size: 100px;
    color: #f6f6f6;
    font-weight: 600;
    transition: 0.5s;
    transform-style: inherit;
}

.content h1:hover {
    -webkit-text-stroke: 2px #f6f6f6;
    color: transparent;
}

.content button {
    flex: 1;
    cursor: pointer;
    user-select: none;
    color: #f6f6f6;
    font-size: 20px;
    background: transparent;
    border: 2px solid #f6f6f6;
    padding: 12px 40px;
    border-radius: 50px;
    margin-top: 20px;
    margin-left: 30%;
    background-image: url(imagess/wave1.png);
    background-repeat: repeat-x;
    background-position: 0 - 100%;
    transition: 10s ease;
}

.content button:hover {
    background-position: 500% 100%;
}

button:nth-child(1){
    filter: hue-rotate(20deg);
}

.back-video {
    width: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
    transform-style: inherit;
}

.container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 2rem;
    background-color: transparent;
    border-radius: 2%;
    transform-style: inherit;
}

.container_right {
    display: flex;
    transition: transform 0.5s ease;
}

.slide {
    position: relative;
    flex: 0 0 50%;
    /* Each slide takes full width */
    padding: 0 15px;
    /* Adjust spacing between slides */
}

.container_right .slide img {
    width: 380px;
    height: 500px;
    margin-left: 10%;
    transform: translateX(1rem);
    border-radius: 1rem;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    display: block;
}

.container_left {
    position: relative;
    margin-top: -30%;
    padding-inline: 1rem;
    text-align: center;
    transform-style: inherit;
}

.container_left h1 {
    margin-left: 38%;
    margin-bottom: 2rem;
    font-size: 3.5rem;
    font-weight: 900;
    line-height: 4.5rem;
    color: rgb(10, 10, 83);
    animation-delay: 0.5s;
}

.container_left p {
    width: 100%;
    max-width: 620px;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 32px;
    color: #111;
    margin-left: 45%;
    margin-bottom: 2%;
    animation-delay: 1s;
    text-align: center;
}

.container_left a {
    width: 100%;
    max-width: 620px;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 32px;
    margin-left: 35%;
    animation-delay: 1s;
    text-align: center;
}

.art {
    position: relative;
    width: 100%;
    height: 100vh;
    margin-top: 10%;
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    transform-style: inherit;
    background-color: rgb(0, 0, 32);
}

.art_left {
    position: relative;
    margin-top: 10%;
    padding-inline: 1rem;
}

.art_left h1 {
    margin-left: 10%;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 900;
    line-height: 4.5rem;
    color: #f6f6f6;
    animation-delay: 0.5s;
    text-align: center;
}

.art_left p {
    width: 100%;
    max-width: 620px;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 32px;
    color: #e0e0e0;
    margin-left: 10%;
    margin-bottom: 2%;
    animation-delay: 1s;
    text-align: center;
}

.art_left a {
    width: 100%;
    max-width: 620px;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 32px;
    margin-left: 43%;
    animation-delay: 1.5s;
    text-align: center;
    color: #868585;
}

.art_right .video {
    margin-left: 10%;
    width: 480px;
    height: 600px;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1);
}

.letters {
    position: relative;
    width: 100%;
    height: 120vh;

    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    background-color: #f6f6f6;
}

.letters_left {
    position: relative;
    margin-left: 10%;
    padding-inline: 1rem;
}

.letters_left .video-letter {
    width: 520px;
    height: 640px;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1);
}

.letters_right {
    position: relative;
    padding-inline: 1rem;
}

.letters_right h1 {
    margin-bottom: 2rem;
    font-size: 3.2rem;
    font-weight: 900;
    line-height: 4.5rem;
    color: rgb(0, 0, 32);
    animation-delay: 0.5s;
    text-align: center;
}

.letters_right p {
    width: 100%;
    max-width: 620px;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 32px;
    color: #111;
    margin-bottom: 2%;
    animation-delay: 1s;
    text-align: center;
}

.letters_right a {
    width: 100%;
    max-width: 620px;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 32px;
    margin-left: 13%;
    animation-delay: 1.5s;
    text-align: center;
}

footer {
    position: relative;
    width: 100%;
    background: rgb(0, 0, 32);
    min-height: 100px;
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

footer .social_icon,
.menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

footer .social_icon li,
.menu li {
    list-style: none;
}

footer .social_icon li a {
    font-size: 2em;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
}

footer .social_icon li a:hover {
    transform: translateY(-10px);
}

.menu li a {
    font-size: 1.2em;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
    text-decoration: none;
}

.menu li a:hover {
    opacity: 1;
}

footer p {
    color: #fff;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 1.1em;
}

footer .wave {
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: url(imagess/wave1.png);
    background-size: 1000px 100px;
}

footer .wave#wave1 {
    z-index: 1000;
    opacity: 1;
    bottom: 0;
    animation: animateWave 4s linear infinite;
}

footer .wave#wave2 {
    z-index: 999;
    opacity: 0.5;
    bottom: 10px;
    animation: animateWave_02 4s linear infinite;
}

footer .wave#wave3 {
    z-index: 1000;
    opacity: 0.2;
    bottom: 15px;
    animation: animateWave 3s linear infinite;
}

footer .wave#wave4 {
    z-index: 999;
    opacity: 0.7;
    bottom: 20px;
    animation: animateWave_02 3s linear infinite;
}

@keyframes animateWave {
    0% {
        background-position-x: 1000px;
    }

    100% {
        background-position-x: 0px;
    }
}

@keyframes animateWave_02 {
    0% {
        background-position-x: 0px;
    }

    100% {
        background-position-x: 1000px;
    }
}


@media(min-aspect-ratio: 16/9) {
    .back-video {
        width: 100%;
        height: auto;
    }
}

@media(max-aspect-ratio: 16/9) {
    .back-video {
        width: auto;
        height: 100%;
    }
}

.ani {
    opacity: 0;
    transform: translateX(0px);
    animation: moveright 0.5s linear forwards;
}

@keyframes moveright {
    100% {
        opacity: 1;
        transform: translateX(10px);
    }
}

.anim {
    opacity: 0;
    transform: translateX(10px);
    animation: moveleft 0.5s linear forwards;
}

@keyframes moveleft {
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}