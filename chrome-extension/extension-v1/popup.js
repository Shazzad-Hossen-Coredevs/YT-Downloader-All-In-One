(async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const apiUrl = 'http://localhost:5000/info';
        const container = document.getElementById('container');
        const spinner = document.getElementById('spinner');
    
        fetch(`${apiUrl}?url=${encodeURIComponent(currentTab.url)}`)
          .then((response) => response.json())
          .then((data) =>  {
            
            
            console.log('API response:', data);
            const img = document.getElementById('img');
            const title = document.getElementById('title');
            img.src=`${data?.videoDetails?.thumbnails[4]?.url}`
            title.innerText=`${data?.videoDetails?.title}`
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
                <td style='padding: 8px;'><a href=${d?.url} target='blank' ><button style="background-color: rgb(125 211 252); padding: 4px; border-radius: 3px; border: 1px solid rgb(125 211 252); color: #FFFFFF;">Download</button></a></td>
                
                </tr>`
            });
            tbody.innerHTML=innerHtmlData;
            container.style.display='block';
            spinner.style.display='none';


            
            
          })
          .catch((error) => console.error('Error:', error));
     });
  })();