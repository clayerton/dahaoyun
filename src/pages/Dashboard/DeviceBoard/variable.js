let winWidth = 0;
if (window.innerWidth)
    winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
winWidth = (winWidth > 1483 ? winWidth : 1483);
export default {
    winWidth,
}