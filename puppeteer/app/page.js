import React from 'react';
import Ui from './components/UI';
import puppeteer from 'puppeteer';
import { toast } from 'react-toastify';

const Home = async ({ searchParams }) => {
  let data = null;
  if (searchParams.url) {
    data = await handleDownload(searchParams.url);
    // console.log(data);

  }
  return (
    <div>
      <Ui data={data} />
    </div>
  );
};

export default Home;


const handleDownload = async (url) => {
 try {
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://yt1s.ltd/en182hzb/');
  await page.waitForTimeout(1000);
  page.type('#txt-url', url);
  await page.waitForTimeout(1000);
  page.click('#btn-submit');
  await page.waitForTimeout(4000)
  const element = await page.waitForXPath('/html/body/div[1]/div[1]/div[5]/div/div[1]/div/div[1]/table/tbody/tr[1]/td[3]/a');
  const downloadUrl = await page.evaluate(anchor => anchor.getAttribute('href'), element);
  const thumbnail = await page.waitForSelector('.img-thumbnail');
  const thumbUrl = await page.evaluate(anchor => anchor.getAttribute('src'), thumbnail);
  const videoTitle = await page.$eval(`#video_title`, element => element.innerText);
  

  await browser.close();

  return ({ url: downloadUrl, thumbUrl: thumbUrl, title: videoTitle })
 } catch (error) {
  return(null);
  
 }

}