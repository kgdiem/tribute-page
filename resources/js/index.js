const fontTag = document.createElement('link');

fontTag.rel = 'stylesheet';
fontTag.type = 'text/css';
fontTag.href = 'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed';

document.getElementsByTagName('head')[0].appendChild(fontTag);

addDotPositioning();
window.onresize = checkMobileTimeline;

function addDotPositioning(){
    const dotElements = document.getElementsByClassName('dot');
    const timeline = document.getElementById('line');

    const dotCount = dotElements.length;
    const lengthOfTimeline = timeline.clientHeight - 10; //margin top on dots container

    const start = getDotYear(dotElements[0]);

    const lastDot = dotElements[dotCount - 1];

    const dotHeight = lastDot.clientHeight;

    const end = getDotYear(lastDot);

    const yearMargin = getYearMargin(lengthOfTimeline, dotCount, dotHeight, start, end);

    const leftLabels = Array.from(document.querySelectorAll('#labels-left .label:not(:first-child)'));
    const rightLabels = Array.from(document.querySelectorAll('#labels-right .label'));

    let dotElement;
    let dotYear;
    let label;
    let margin;
    let lastMargin = 0;
    let lastYear = start;

    for(i = 1; i < dotCount - 1; i++){
        dotElement = dotElements[i];
        dotYear = getDotYear(dotElement);
        margin = (yearMargin * (dotYear - lastYear));

        dotElement.style.marginTop = margin;

        label = (i % 2 !== 0) ? rightLabels.shift() : leftLabels.shift();

        label.style.marginTop = margin + lastMargin + (dotHeight*1.37);

        lastYear = dotYear;
        lastMargin = margin;
    }

    lastDotMargin = (yearMargin * (end - lastYear) - 10);
    lastDot.style.marginTop = lastDotMargin >= 0 ? lastDotMargin : 0;

    if(dotCount % 2 === 0){
        rightLabels.shift().style.marginTop = lastDotMargin + lastMargin + (dotHeight*1.37);
    }
    else{
        leftLabels.shift().style.marginTop = lastDotMargin + lastMargin + (dotHeight*1.37);
    }

    checkMobileTimeline();
}

function getDotYear(dot){
    const p = dot.getElementsByTagName('p')[0];

    return parseInt(p.textContent);
}

function getYearMargin(lineHeight, dotCount, dotHeight, startDate, endDate){
    const startOfLastDot = lineHeight - dotHeight - 10;

    const endOfFirstDot = dotHeight + 10;

    const spaceBetween = (startOfLastDot - endOfFirstDot) - (dotCount - 2) * dotHeight;

    const years = endDate - startDate;

    const marginPerYear = spaceBetween/years;

    return marginPerYear < 0 ? 0 : marginPerYear;
}

function checkMobileTimeline(){
    
    const leftLabelDiv = document.querySelector('#labels-left');

    if(document.body.clientWidth <= 780){
        const rightLabelsMargin = getComputedStyle(document.querySelector('#labels-right')).marginLeft;

        leftLabelDiv.style.marginLeft = rightLabelsMargin;
        leftLabelDiv.style.textAlign = 'left';
    }
    else{
        leftLabelDiv.style.marginLeft = '-380px';
        leftLabelDiv.style.textAlign = 'right';
    }
}