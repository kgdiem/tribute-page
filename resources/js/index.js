"use strict";

document.addEventListener("DOMContentLoaded", setupPage);

function setupPage(){
    appendFontTag();

    const image = document.querySelector("img[data-src]");
    image.src = image.getAttribute('data-src');

    loadImage(image);

    const leftLabelDiv = document.querySelector('#labels-left');
    const leftLabelDivLoadMargin = getComputedStyle(leftLabelDiv).marginLeft;
    const rightLabelDiv = document.querySelector('#labels-right');
    const rightLabelsMargin = getComputedStyle(rightLabelDiv).marginLeft;

    addDotPositioning(leftLabelDiv, leftLabelDivLoadMargin, rightLabelDiv, rightLabelsMargin);

    window.onresize = checkMobileTimeline.bind(this, leftLabelDiv, leftLabelDivLoadMargin, rightLabelsMargin);
}

function appendFontTag(){
    const fontTag = document.createElement('link');
    
    fontTag.rel = 'stylesheet';
    fontTag.type = 'text/css';
    fontTag.href = 'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed';

    document.getElementsByTagName('head')[0].appendChild(fontTag);
}

function loadImage(image){
    fetch('assets/img/talkingheads.jpg')
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const imgUrl = URL.createObjectURL(blob);
            image.src = imgUrl;
        });
}

function addDotPositioning(leftLabelDiv, leftLabelDivLoadMargin, rightLabelDiv, rightLabelsMargin){

    changeDotMargins(leftLabelDiv, rightLabelDiv);

    checkMobileTimeline(leftLabelDiv, leftLabelDivLoadMargin, rightLabelsMargin);

}

function changeDotMargins(leftLabelDiv, rightLabelDiv){
    const timeline = document.getElementById('line');
    const dotsContainerDiv = document.getElementById('dots');
    const dotElements = dotsContainerDiv.getElementsByClassName('dot');

    const dotsContainerMargin = getComputedStyle(dotsContainerDiv).marginTop;

    const containerMargin = parseInt(dotsContainerMargin);

    const lengthOfTimeline = timeline.clientHeight - containerMargin;

    const dotCount = dotElements.length;

    const lastDot = dotElements[dotCount - 1];
    
    const dotHeight = lastDot.clientHeight;
    const adjustedDotHeight = (dotHeight*1.37);

    const start = getDotYear(dotElements[0]);

    const end = getDotYear(lastDot);

    const leftLabels = Array.from(leftLabelDiv.querySelectorAll('.label:not(:first-child)'));
    const rightLabels = Array.from(rightLabelDiv.querySelectorAll('.label'));

    const yearMargin = getYearMargin(lengthOfTimeline, dotCount, containerMargin, dotHeight, start, end);
    const dotDount = dotElements.length;

    let dotElement;
    let dotYear;
    let label;
    let margin;
    let lastDotMargin;
    let labelMargin;
    let lastMargin = 0;
    let lastYear = start;

    for(let i = 1; i <  dotCount - 1; i++){
        dotElement = dotElements[i];
        dotYear = getDotYear(dotElement);
        margin = (yearMargin * (dotYear - lastYear));

        dotElement.style.marginTop = margin;

        label = (i % 2 !== 0) ? rightLabels.shift() : leftLabels.shift();

        labelMargin = margin + lastMargin + adjustedDotHeight;
        label.style.marginTop = labelMargin;

        lastYear = dotYear;
        lastMargin = margin;
    }

    lastDotMargin = (yearMargin * (end - lastYear) - containerMargin);
    lastDot.style.marginTop = lastDotMargin >= 0 ? lastDotMargin : 0;

    const lastLabel = dotCount % 2 === 0 ? rightLabels : leftLabels;

    lastLabel.shift().style.marginTop = lastDotMargin + lastMargin + adjustedDotHeight;

}

function getDotYear(dot){
    const p = dot.getElementsByTagName('p')[0];

    return parseInt(p.textContent);
}

function getYearMargin(lineHeight, dotCount, margin, dotHeight, startDate, endDate){
    const startOfLastDot = lineHeight - dotHeight - margin;

    const endOfFirstDot = dotHeight + margin;

    const spaceBetween = (startOfLastDot - endOfFirstDot) - (dotCount - 2) * dotHeight;

    const years = endDate - startDate;

    const marginPerYear = spaceBetween/years;

    return marginPerYear < 0 ? 0 : marginPerYear;
}

function checkMobileTimeline(leftLabelDiv, leftLabelDivLoadMargin, rightLabelsMargin){

    if(document.body.clientWidth <= 780){
        leftLabelDiv.style.marginLeft = rightLabelsMargin;
        leftLabelDiv.style.textAlign = 'left';
    }
    else{
        leftLabelDiv.style.marginLeft = leftLabelDivLoadMargin;
        leftLabelDiv.style.textAlign = 'right';
    }
}