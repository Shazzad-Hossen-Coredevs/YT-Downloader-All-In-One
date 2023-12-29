

  let button = document.createElement("button");
  button.style.position = "absolute";
  button.style.zIndex = "9999";
  button.style.top = "100px";
  button.style.left = "120px";
  button.textContent = "Download";
  button.style.backgroundColor='#38bdf8';
  button.style.border='1px solid #38bdf8'
  button.style.padding='5px';
  button.style.fontSize='18px';
  button.style.borderRadius='4px';
  button.style.cursor='pointer';
  button.id='d-button-ytdl';
  document.body.appendChild(button);
 
  document.getElementById('d-button-ytdl'); button.addEventListener('click', ()=> {
    
    chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
      const loadingElement = document.createElement("div");
      loadingElement.style.height='100%';
      loadingElement.style.width='100%';
      loadingElement.style.position='fixed';
      loadingElement.style.top='0px';
      loadingElement.style.left='0px';
      
      loadingElement.style.background='#FFFFFF';
      loadingElement.style.zIndex='5000';
      loadingElement.style.overflow='auto';
      loadingElement.innerHTML=`<div id="loading-text" style="font-size: 32px; display: flex; justify-content:center; align-items:center; height:100%">Loading...</div>
      `

      
      document.body.appendChild(loadingElement);
      if (response && response.url) {
        document.getElementById('d-button-ytdl').style.display='none'
        
        console.log("Current Tab URL in content script: " + response.url);
        const apiUrl = 'http://localhost:5000/info';

        fetch(`${apiUrl}?url=${encodeURIComponent(response.url)}`)
        .then((response) => response.json()).then(data=> {
          console.log(data);
          document.getElementById('loading-text').style.display='none';
         loadingElement.innerHTML=`<div style="padding: 20px; width:100%;max-width: 800px; margin: 0 auto;" id="container">

         <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; ">
         <img id="img" src="${data?.videoDetails?.thumbnails[4]?.url}" alt="Thumbnails" style="height: 150px; width: 200px;">
         <h1 id="title" style="padding-top: 20px; font-weight: 600; font-size: 16px;">${data?.videoDetails?.title}</h1>
         </div>

         <div style="padding-top: 40px; width: 100%; font-size: 18px; font-size: 18px;">
             <table style="width: 100%;  border-collapse: collapse;" >
                 <thead style="background-color: rgb(125 211 252); color: white;">
                     <th style="padding: 8px; text-align: left;">SL</th>
                     <th style="padding: 8px; text-align: left;">Format</th>
                     <th style="padding: 8px; text-align: left;">Audio</th>
                     <th style="padding: 8px; text-align: left;">Video</th>
                     <th style="padding: 8px; text-align: left;">Size</th>
                     <th style="padding: 8px; text-align: left;">Download</th>
                 </thead>
                 <tbody id="result">

                 </tbody>
             </table>

         
         </div>
        </div>`;
   
            // const tr = document.createElement('tr');
            const tbody = document.getElementById('result');
            let innerHtmlData= ``;
            data?.formats.forEach((d,i)=>{
                innerHtmlData+=
                `<tr style='background-color: #def7ff;border-bottom: 1px solid #ededed'><td style='padding: 8px;'>${i+1}</td>
                <td style='padding: 8px;'>${d.container}</td>
                <td style='padding: 8px;'>${d.hasAudio?'Yes':'No'}</td>
                <td style='padding: 8px;'>${d.hasVideo?'Yes':'No'}</td>
                <td style='padding: 8px;'>${d?.contentLength ? (d?.contentLength / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown'}</td>
                <td style='padding: 8px;'><a href=${d?.url} target='blank' ><button style="background-color: rgb(125 211 252); padding: 4px; border-radius: 3px; border: 1px solid rgb(125 211 252); color: #FFFFFF; font-size: 18px;">Download</button></a></td>
                
                </tr>`
            });
            tbody.innerHTML=innerHtmlData;
            container.style.display='block';
            spinner.style.display='none';

        })
      } else {
        console.error("Unable to get the current tab's URL");
      }
    });
  
  });
  
  
     
   