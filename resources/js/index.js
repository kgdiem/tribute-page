"use strict";

/**
 * Setup page
 */

appendFontTag();

const leftLabelDiv = document.querySelector('#labels-left');
const leftLabelDivLoadMargin = getComputedStyle(leftLabelDiv).marginLeft;
const rightLabelDiv = document.querySelector('#labels-right');
const rightLabelsMargin = getComputedStyle(rightLabelDiv).marginLeft;

addDotPositioning(leftLabelDiv, leftLabelDivLoadMargin, rightLabelDiv, rightLabelsMargin);

window.onresize = checkMobileTimeline.bind(this, leftLabelDiv, leftLabelDivLoadMargin, rightLabelsMargin);

/**
 * Methods
 */

function appendFontTag(){
    const fontTag = document.createElement('link');
    
    fontTag.rel = 'stylesheet';
    fontTag.type = 'text/css';
    fontTag.href = 'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed';

    document.getElementsByTagName('head')[0].appendChild(fontTag);
}

function addDotPositioning(leftLabelDiv, leftLabelDivLoadMargin, rightLabelDiv, rightLabelsMargin){
    const dotElements = document.getElementsByClassName('dot');
    const timeline = document.getElementById('line');
    const dotsContainer = getComputedStyle(document.getElementById('dots'));

    const containerMargin = parseInt(dotsContainer.marginTop);

    const dotCount = dotElements.length;

    const lengthOfTimeline = timeline.clientHeight - containerMargin;

    const start = getDotYear(dotElements[0]);

    const lastDot = dotElements[dotCount - 1];

    const dotHeight = lastDot.clientHeight;

    const end = getDotYear(lastDot);

    const yearMargin = getYearMargin(lengthOfTimeline, dotCount, containerMargin, dotHeight, start, end);

    const leftLabels = Array.from(leftLabelDiv.querySelectorAll('.label:not(:first-child)'));
    const rightLabels = Array.from(rightLabelDiv.querySelectorAll('.label'));

    let dotElement;
    let dotYear;
    let label;
    let margin;
    let lastDotMargin;
    let lastMargin = 0;
    let lastYear = start;

    for(let i = 1; i < dotCount - 1; i++){
        dotElement = dotElements[i];
        dotYear = getDotYear(dotElement);
        margin = (yearMargin * (dotYear - lastYear));

        dotElement.style.marginTop = margin;

        label = (i % 2 !== 0) ? rightLabels.shift() : leftLabels.shift();

        label.style.marginTop = margin + lastMargin + (dotHeight*1.37);

        lastYear = dotYear;
        lastMargin = margin;
    }

    lastDotMargin = (yearMargin * (end - lastYear) - containerMargin);
    lastDot.style.marginTop = lastDotMargin >= 0 ? lastDotMargin : 0;

    if(dotCount % 2 === 0){
        rightLabels.shift().style.marginTop = lastDotMargin + lastMargin + (dotHeight*1.37);
    }
    else{
        leftLabels.shift().style.marginTop = lastDotMargin + lastMargin + (dotHeight*1.37);
    }

    checkMobileTimeline(leftLabelDiv, leftLabelDivLoadMargin, rightLabelsMargin);
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