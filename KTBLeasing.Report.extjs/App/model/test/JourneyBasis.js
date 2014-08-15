/* [20131014] Narin K. - CR#116 [JourneyBasisWindow.js, JourneyBasis.js, DeviceController, JourneyBasisDocumentViewModel]
*                      - Remove columns [Full HAV Distance (M), Partial HAV distance (M), Full Int of OBD Distance (M)]
*                      - Add set A and set B mileage waterfall columns from the jounrey summary message.
*                      - Change name of column "Server HAV Distance (M)" to "Server Full HAV (m)"
*/
Ext.define('DeviceCommunication.model.JourneyBasis', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Version', type: 'int' },
        { name: 'JourneyId', type: 'int' },
        { name: 'StartJourney', type: 'date', dateFormat: 'MS' },
        { name: 'StopJourney', type: 'date', dateFormat: 'MS' },
        { name: 'HavDistanceFromGeopointsMeter', type: 'int' },

        //Set A
        { name: 'PartialIntegrationOfObdSpeedOvertime' },
        { name: 'FullIntegrationOfObdSpeedOvertime'},
        { name: 'PartialHarversine' },
        { name: 'FullHarvesine' },
        { name: 'TowedHarversine'},
        { name: 'DrivenMileagePIDx31Km' },
        { name: 'TruOdometer'},
        { name: 'CumulativeDistanceForMissingGpsSignal' },
        //Set B
        { name: 'BPartialIntegrationOfObdSpeedOvertime' },
        { name: 'BFullIntegrationOfObdSpeedOvertime' },
        { name: 'BPartialHaversine' },
        { name: 'BFullHaversine' },
        { name: 'BTowedHarversine' },
        { name: 'BDrivenMileagePIDx31Km' },
        { name: 'BTruOdometer' },
        { name: 'BCumulativeDistanceForMissingGpsSignal' },
//        { name: 'HavDistanceMeter', type: 'int' },
//        { name: 'FullHavDistanceMeter', type: 'int' },
//        { name: 'FullIntDistanceMeter', type: 'int' },

        /* [20131225] Narin K.  - CR#117 
        *                      - Display mileage data on Journey Basis page of Device Commu web
        */
        { name: 'ServerFullHav' },
        { name: 'ServerFullHavAll' },
        { name: 'MileageSetA' },
        { name: 'MileageSetB' },
        { name: 'IsOutsideThailand' },
        { name: 'LKDR' },
        { name: 'AvgSpeedExZero' },
        { name: 'AvgSpeedInZero' },

        { name: 'JneyDuration' },
        { name: 'DrivingDuration' },
        { name: 'IdlingDuration' },
        { name: 'DrValue' },
        { name: 'DrStandardDeviation' },
        { name: 'IsLoasStartJney', type: 'boolean' },
        { name: 'Profile', type: 'int' },
        'Imei', 'JourneyStartId', 'JourneySummaryId'
    ]
});