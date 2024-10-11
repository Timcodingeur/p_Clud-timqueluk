const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyTokenMiddleware');
const scheduleController = require('../controllers/scheduleController');
const { isAuthenticated } = require('../middlewares/authMiddleware'); 
const authProvider = require('../auth/AuthProvider');
const { getElapsedPeriods, getNbLateArrivals, getNbUnacceptedAbsences, getBarometerPicture, getAbsencesRates, getTrendPictures, getPastMonths, getNbEvents } = require('../helpers/periodsHelper');

router.get('/barometers', isAuthenticated, authProvider.acquireToken(['Sites.Read.All']), verifyToken, async (req, res, next) => {
    
    
    try {
        const teacherEmail = req.session.account.idTokenClaims.verified_primary_email[0];
        const scheduleIds = await scheduleController.getScheduleByTeacherEmail(teacherEmail);
        let students = [];

        const promises = scheduleIds.map(async (scheduleId) => {
            try {
                
                const schedule = await scheduleController.getScheduleInternal(scheduleId.idSchedule);
                
                
                const encodedShareLink = Buffer.from(schedule[0].schLink).toString('base64').replace(/=+$/, '').replace(/\+/g, "-").replace(/\//g, "_");
                const graphApiUrl = `https://graph.microsoft.com/v1.0/shares/u!${encodedShareLink}/root/content`;

                const response = await fetch(graphApiUrl, {
                    headers: {
                        'Authorization': `Bearer ${req.session.accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Graph API error: ${response.statusText}`);
                }

                const graphResponse = await response.json();

                if (graphResponse.courses) {
                    
                    const elapsedPeriods = getElapsedPeriods(graphResponse.courses);
                    const nbEvents = getNbEvents(graphResponse.absences);
                    const fullName = graphResponse.firstName + " " + graphResponse.officialName;
   
                    const observedMonths = getPastMonths();
                    
                    const absencesRates = getAbsencesRates(graphResponse.absences, graphResponse.courses);
                    

                    const trendPictures = getTrendPictures(absencesRates, nbEvents);
                    const barometerPicture = getBarometerPicture(graphResponse.absences);

                    // Construction de l'objet de retour avec les variables pré-calculées
                    return {
                        elapsedPeriods: elapsedPeriods,
                        events: nbEvents,
                        name: fullName,
                        email: scheduleId.idSchedule,
                        observedMonths: observedMonths,
                        absencesRates: absencesRates,
                        trendPictures: trendPictures,
                        barometerPicture: barometerPicture
                    };
                } else {
                    console.log(`No courses found in graphResponse for schedule ${schedule.coursId}`);
                    return null;
                }
            } catch (error) {
                console.log(`Error fetching Graph API for schedule ${scheduleId.idSchedule}: `, error);
                return null; 
            }
        });

        students = await Promise.all(promises);

        students = students.filter(student => student !== null);

        res.render('barometers', {
            title: 'Les baromètres',
            isAuthenticated: true,
            isAuthorized: req.session.isAuthorized,
            students: students
        });
    } catch (error) {
        console.log("Error in /barometers route: ", error);
        next(error);
    }
});

module.exports = router;
