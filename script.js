// Fetch the JSON data from a file
fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {

        // Selected language
        let basics  = data.basics;
        let curData = language === 'en' ? data.dataEn : data.dataDe;

        // CVCL
        if (contType==="cvcl"){

            // Basics
            document.getElementById('today').innerHTML = basics.date; 
            document.getElementById('company').innerHTML = basics.company; 
            document.getElementById('source').innerHTML = basics.source; 

            // Person
            document.getElementById('person').innerHTML = curData.person; 

            // Company contact
            const comp = document.getElementById('company-contact');
            comp.innerHTML = '';
            basics.contact.forEach(function(cont) {
                let contDiv = document.createElement('div'); 
                contDiv.innerHTML = cont; 
                comp.appendChild(contDiv); 
            });

            // Label
            document.getElementById('label1').innerHTML = curData.label[0]; 
            document.getElementById('label2').innerHTML = curData.label[0]; 
            document.getElementById('label3').innerHTML = curData.label[1]; 
            document.getElementById('label4').innerHTML = curData.label[1]; 

            // Skills
            document.getElementById('skill1').innerHTML = curData.skill[0]; 
            document.getElementById('skill2').innerHTML = curData.skill[1]; 
            document.getElementById('skill3').innerHTML = curData.skill[2]; 
            document.getElementById('skill4').innerHTML = curData.skill[3]; 

            // Expertise
            const exp = document.getElementById('expert');
            exp.innerHTML = '';
            curData.expert.forEach(function(expertise) {
                let expertiseDiv = document.createElement('div'); 
                expertiseDiv.classList.add('title');
                expertiseDiv.innerHTML = expertise; 
                exp.appendChild(expertiseDiv); 
            });

        }
        
        // CV
        else if (contType==="cv"){

            // Label
            document.getElementById('label1').innerHTML = curData.label[0]; 

            // Expertise
            const exp = document.getElementById('expert');
            exp.innerHTML = '';
            curData.expert.forEach(function(expertise) {
                let expertiseDiv = document.createElement('div'); 
                expertiseDiv.classList.add('title');
                expertiseDiv.innerHTML = expertise; 
                exp.appendChild(expertiseDiv); 
            });
        }

        // CL
        else if (contType==="cl")
        {
            // Basics
            document.getElementById('today').innerHTML = basics.date; 
            document.getElementById('company').innerHTML = basics.company; 
            document.getElementById('source').innerHTML = basics.source; 

            // Person
            document.getElementById('person').innerHTML = curData.person; 

            // Company contact
            const comp = document.getElementById('company-contact');
            comp.innerHTML = '';
            basics.contact.forEach(function(cont) {
                let contDiv = document.createElement('div'); 
                contDiv.innerHTML = cont; 
                comp.appendChild(contDiv); 
            });

            // Label
            document.getElementById('label2').innerHTML = curData.label[0]; 
            document.getElementById('label3').innerHTML = curData.label[1]; 
            document.getElementById('label4').innerHTML = curData.label[1]; 

            // Skills
            document.getElementById('skill1').innerHTML = curData.skill[0]; 
            document.getElementById('skill2').innerHTML = curData.skill[1]; 
            document.getElementById('skill3').innerHTML = curData.skill[2]; 
            document.getElementById('skill4').innerHTML = curData.skill[3]; 

        }

    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
