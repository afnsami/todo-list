


function menuTab() {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'menuDiv';

    const h1 = document.createElement('h1');
    h1.textContent = "Our Dishes";
    const p = document.createElement('p');
    p.innerHTML = "Rice: <span style='color: green'>$1</span> <br>" + 
                "Soyabean: <span style='color: green'>$3</span> <br>" + 
                "Cabbage Curry: <span style='color: green'>$3</span> <br>" + 
                "Paneer Curry: <span style='color: green'>$4.50</span> <br>" + 
                "Pumpkin Curry: <span style='color: green'>$2</span> <br>" + 
                "Spinach Curry: <span style='color: green'>$1.50</span> <br>" + 
                "Chana Dal Bhuna: <span style='color: green'>$2</span> <br>" + 
                "Lentil Soup: <span style='color: green'>$1.50</span> <br>" + 
                "Rice Pudding: <span style='color: green'>$5</span>";

    menuDiv.appendChild(h1);
    menuDiv.appendChild(p);
    document.getElementById("content").appendChild(menuDiv);
};

function aboutTab() {
    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'aboutDiv';

    const historyP = document.createElement('p');
    historyP.textContent = "We are a neighborhood restaurant inspired by the warmth of Indian dining. We bring together fresh ingredients, comforting flavors, and a relaxed atmosphere to create food that feels familiar yet special. Whether you're joining us for a quick lunch, a dinner with friends, or a special evening, our goal is simple: good food, good company, and a table waiting for you.";



    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';

    const location = document.createElement('p');
    location.textContent = '99 Park Street, London, United Kingdom';

    const email = document.createElement('p');
    email.textContent = 'vegrestaurent@email.com';

    const phone = document.createElement('p');
    phone.textContent = '+123456789';



    aboutDiv.appendChild(historyP);

    detailsDiv.appendChild(location);
    detailsDiv.appendChild(email);
    detailsDiv.appendChild(phone);
    
    document.getElementById('content').appendChild(aboutDiv);
    document.getElementById('content').appendChild(detailsDiv);
};

export { menuTab, aboutTab };