function getElapsedPeriods(courses) {
    const today = new Date(); 
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); 

    
    const pastCourses = courses.filter(course => {
        const courseDate = new Date(course.periodDate);
        return courseDate <= yesterday; 
    });

    const totalPeriods = pastCourses.reduce((total, course) => {
        const courseDuration = course.periodEnd - course.periodStart + 1; 
        return total + courseDuration;
    }, 0); 

    return totalPeriods;
}


function getNbLateArrivals(absences) {
    const lateArrivals = absences.filter(absence => absence.absenceType === "RETARD");
    return lateArrivals.length;
}

function getNbLateArrivalsThisMonth(absences, idx = 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let currentMonth = yesterday.getMonth() - idx;
    let currentYear = yesterday.getFullYear();

    if (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
    }

    const lateArrivalsOfTheMonth = absences.filter(absence => {
        const absenceDate = new Date(absence.periodDate);
        return (
            absenceDate.getMonth() === currentMonth &&
            absenceDate.getFullYear() === currentYear &&
            absence.absenceType === "RETARD"
        );
    });

    return lateArrivalsOfTheMonth.length;
}


function getNbUnacceptedAbsences(absences) {
    const unjustifiedAbsences = absences.filter(absence => 
        absence.absenceType === "ABSENT" && absence.absenceStatus === "INJUSTIFIEE"
    );

    if (unjustifiedAbsences.length === 0) {
        return 0;
    }

    const absenceDates = unjustifiedAbsences.map(absence => new Date(absence.periodDate));

    absenceDates.sort((a, b) => a - b);

    let nbUnacceptedAbsences = 1; 
    for (let i = 1; i < absenceDates.length; i++) {
        const diffTime = Math.abs(absenceDates[i] - absenceDates[i - 1]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if (diffDays > 1) {
            nbUnacceptedAbsences++;
        }
    }

    return nbUnacceptedAbsences;
}

function getNbUnacceptedAbsencesThisMonth(absences, idx = 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let currentMonth = yesterday.getMonth() - idx;
    let currentYear = yesterday.getFullYear();

    if (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
    }

    const unjustifiedAbsencesOfTheMonth = absences.filter(absence => {
        const absenceDate = new Date(absence.periodDate);
        return (
            absenceDate.getMonth() === currentMonth &&
            absenceDate.getFullYear() === currentYear &&
            absence.absenceType === "ABSENT" &&
            absence.absenceStatus === "INJUSTIFIEE"
        );
    });

    if (unjustifiedAbsencesOfTheMonth.length === 0) {
        return 0;
    }

    // Extraire et trier les dates des absences injustifiées
    const absenceDates = unjustifiedAbsencesOfTheMonth.map(absence => new Date(absence.periodDate));
    absenceDates.sort((a, b) => a - b);

    // Calculer le nombre d'absences injustifiées non consécutives
    let nbUnacceptedAbsences = 1;
    for (let i = 1; i < absenceDates.length; i++) {
        const diffTime = Math.abs(absenceDates[i] - absenceDates[i - 1]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            nbUnacceptedAbsences++;
        }
    }

    return nbUnacceptedAbsences;
}


function getBarometerPicture(absences){
    const nbEvents = getNbLateArrivals(absences) + getNbUnacceptedAbsences(absences);
    
    if (nbEvents < 3){
        return "barometer-green.png";
    }
    else if (nbEvents < 6){
        return "barometer-yellow.png";
    }
    else if (nbEvents < 9){
        return "barometer-orange.png";
    }
    else {
        return "barometer-red.png";
    }
    
}

function getAbsencesForMonth(absences, idx = 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    let currentMonth = yesterday.getMonth() - idx;
    let currentYear = yesterday.getFullYear();

    if (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
    }

    const absencesOfTheMonth = absences.filter(absence => {
        const absenceDate = new Date(absence.periodDate);
        return (
            absenceDate.getMonth() === currentMonth && 
            absenceDate.getFullYear() === currentYear &&
            absence.absenceType === 'ABSENT'
        );
    });

    return absencesOfTheMonth.length;
}

function getElapsedPeriodsForMonth(courses, idx = 0) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let currentMonth = yesterday.getMonth() - idx;
    let currentYear = yesterday.getFullYear();

    if (currentMonth < 0) {
        currentMonth += 12;
        currentYear -= 1;
    }

    const pastCourses = courses.filter(course => {
        const courseDate = new Date(course.periodDate);
        return (
            courseDate.getMonth() === currentMonth &&
            courseDate.getFullYear() === currentYear &&
            (idx > 0 || courseDate <= yesterday) // Si idx = 0 (mois en cours), il filtre les cours jusqu'à hier
        );
    });

    const totalPeriods = pastCourses.reduce((total, course) => {
        const courseDuration = course.periodEnd - course.periodStart + 1;
        return total + courseDuration;
    }, 0);

    return totalPeriods;
}

function getNbEvents(absences){
    const events = [0, 0, 0, 0, 0, 0, 0]; 
    
    
    events[0] = getNbLateArrivals(absences) + getNbUnacceptedAbsences(absences);
    
    for (let i = 0; i < 6; i++) {
        events[i + 1] = getNbLateArrivalsThisMonth(absences, i) + getNbUnacceptedAbsencesThisMonth(absences, i);
    }

    
    return events;
    
}

function getAbsencesRates(absences, courses) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();    
    const rates = [0, 0, 0, 0, 0, 0, 0]; 
    const totalAbsences = absences.filter(absence => absence.absenceType === 'ABSENT');

    rates[0] = (totalAbsences.length / getElapsedPeriods(courses) * 100).toFixed(2);

    for (let i = 0; i < 6; i++) {
        const elapsedPeriods = getElapsedPeriodsForMonth(courses, i);
        if (elapsedPeriods === 0) {
            rates[i + 1] = null; 
        } else {
            rates[i + 1] = (getAbsencesForMonth(absences, i) / elapsedPeriods * 100).toFixed(2);
        }
    }
   

    return rates;
}


function getTrendPictures(rates, nbEvents) {
    return rates.map((rate, index) => {
        if (rate === null) {
            return null; 
        }

        const rateNum = parseFloat(rate);
        const nbEventsNum = parseFloat(nbEvents[index]);

        const factor = 2.5 * (3 - index) / 3; // atténuation linéaire simple (0 : pas d'atténuation, 1 : réduction de moitié, 2 : réduction de 3/4, 3 : réduction de 100%)

        const score = rateNum + (2.5 / (index + 1)) * nbEventsNum; // si deux événements dans le mois, on passe en nuageux

        if (score <= 0.01) {
            return 'sun.png'; 
        } else if (score < 5) {
            return 'cloud.png'; 
        } else {
            return 'thunder.png'; 
        }
    });
}
function getPastMonths() {
    const months = [];
    const today = new Date();
    const yesterday = new Date(today); 
    yesterday.setDate(today.getDate() - 1); 
    const currentMonth = yesterday.getMonth(); 

    // Boucle pour récupérer les 6 derniers mois
    for (let i = 0; i < 6; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthName = getMonth(monthIndex);


        months[i] = `${monthName}`;
    }

    return months;
}

function getMonth(monthNumber) {
    const monthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    return monthNames[monthNumber]; 
}


module.exports = {
    getElapsedPeriods,
    getNbLateArrivals,
    getNbUnacceptedAbsences,
    getBarometerPicture,
    getAbsencesRates,
    getTrendPictures,
    getPastMonths,
    getNbEvents
};