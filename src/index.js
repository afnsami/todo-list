// IMPORT
import "./styles.css";
import { menuTab, aboutTab } from "./pageload.js";
import mainImage from "./resource/images/main.jpg";



const content = document.getElementById('content');



// IMG
const introImageDiv = document.createElement('div');

introImageDiv.className = 'introImageDiv';


const introImage = document.createElement('img');

introImage.src = mainImage;
introImage.style.width = '100%';
introImage.style.height = '100%';
introImage.style.objectFit = 'cover';



// TEXT DIV
const introTextDiv = document.createElement('div');
introTextDiv.className = 'introTextDiv';

// DIV 1
const div1 = document.createElement('div');
div1.className = 'div1';

const div1h1 = document.createElement('h1');
div1h1.style.fontSize = '55px';
div1h1.textContent = 'Homemade pure veg dishes!'
div1.appendChild(div1h1);

const div1ul = document.createElement('ul');
const dishMenu = document.createElement('p');
dishMenu.innerHTML = "Natural vegetables and fruits <br> Natural ingredients <br> Less oil <br> Healthy <br> <span style='color: green'>$</span>1-5 each item";
div1ul.appendChild(dishMenu);
div1.appendChild(div1ul);


// DIV 2
const div2 = document.createElement('div');
div2.className = 'div2';

const div2h1 = document.createElement('h1');
div2h1.style.color = 'brown';
div2h1.innerHTML = 'Order your food <br> <span>or</span> <br> Make a reservation';
div2.appendChild(div2h1);

const contactInfo = document.createElement('h1');
contactInfo.innerHTML = "Call: <span style='text-decoration: underline; color: orange;'>+123456789</span> <br> Email: <span style='text-decoration: underline; color: orange;'>reserve@vegrestaurent.com</span>";
div2.appendChild(document.createElement('br'));
div2.appendChild(contactInfo);

// APPENDINGS
introImageDiv.appendChild(introImage);
content.appendChild(introImageDiv);

introTextDiv.appendChild(div1);
introTextDiv.appendChild(div2);
content.appendChild(introTextDiv);


// HOME BUTTON
const home = document.getElementById('home');
home.style.backgroundColor = 'brown';
home.style.color = 'white';

home.addEventListener('click', function(e) {
    menu.style = null;
    about.style = null;
    home.style.backgroundColor = 'brown';
    home.style.color = 'white';

    content.innerHTML = '';

    introImageDiv.appendChild(introImage);
    content.appendChild(introImageDiv);

    introTextDiv.appendChild(div1);
    introTextDiv.appendChild(div2);
    content.appendChild(introTextDiv);
});


// MENU BUTTON
const menu = document.getElementById('menu');
menu.addEventListener('click', function(e) {
    home.style = null;
    about.style = null;
    menu.style.backgroundColor = 'brown';
    menu.style.color = 'white';
    content.style.backgroundColor = 'brown';

    content.innerHTML = '';
    menuTab();
});

// ABOUT BUTTON
const about = document.getElementById('about');
about.addEventListener('click', function(e) {
    home.style = null;
    menu.style = null;
    about.style.backgroundColor = 'brown';
    about.style.color = 'white';
    content.style.backgroundColor = 'brown';

    content.innerHTML = '';
    aboutTab();
});
