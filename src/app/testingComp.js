import image from '../images/waterfall.jpg';

let hello = 'Hello world';
export default () => {
  const img = document.createElement('img');
  
  img.src = image;
  
  document.body.appendChild(img);
}