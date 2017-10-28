const fontTag = document.createElement('link');

fontTag.rel = 'stylesheet';
fontTag.type = 'text/css';
fontTag.href = 'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed';

document.getElementsByTagName('head')[0].appendChild(fontTag);

addDotPositioning();

function addDotPositioning(){
    const dotElements = document.getElementsByClassName('dot');

    const dotCount = dotElements.length;
    const lengthOfTimeline = document.getElementById('line').clientHeight - 10; //margin top on dots container

    const start = getDotYear(dotElements[0]);

    const lastDot = dotElements[dotCount - 1];

    const end = getDotYear(lastDot);

    const yearMargin = getYearMargin(lengthOfTimeline, lastDot.clientHeight, start, end);

    let dotElement;
    let dotYear;
    let lastYear = start;

    for(i = 1; i < dotCount - 1; i++){
        dotElement = dotElements[i];
        dotYear = getDotYear(dotElement);
        
        dotElement.style.marginTop = (yearMargin * (dotYear - lastYear));

        lastYear = dotYear;
    }

    
}

function getDotYear(dot){
    const p = dot.getElementsByTagName('p')[0];

    return parseInt(p.textContent);
}

function getYearMargin(lineHeight, dotHeight, startDate, endDate){
    const startOfLastDot = lineHeight - dotHeight - 10;

    const endOfFirstDot = dotHeight + 10;

    const spaceBetween = startOfLastDot - endOfFirstDot;

    const years = endDate - startDate;

    const marginPerYear = spaceBetween/years;

    return marginPerYear;
}