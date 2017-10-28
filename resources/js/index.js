const fontTag = document.createElement('link');

fontTag.rel = 'stylesheet';
fontTag.type = 'text/css';
fontTag.href = 'https://fonts.googleapis.com/css?family=Saira+Extra+Condensed';

document.getElementsByTagName('head')[0].appendChild(fontTag);

addDotPositioning();

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

    let dotElement;
    let dotYear;
    let lastYear = start;

    for(i = 1; i < dotCount - 1; i++){
        dotElement = dotElements[i];
        dotYear = getDotYear(dotElement);
        
        dotElement.style.marginTop = (yearMargin * (dotYear - lastYear));

        lastYear = dotYear;
    }

    lastDotMargin = (yearMargin * (end - lastYear) - 10);
    lastDot.style.marginTop = lastDotMargin >= 0 ? lastDotMargin : 0;
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