using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace KTBLeasing.Helpers
{
    public class ServiceUtility
    {
        /*
            Use 8 bitfields as defined below:

            (MSB)
            BIT7 --> Unused
            BIT6 --> Unused
            BIT5 --> Unused
            BIT4 --> Unused
            BIT3 --> Transfer of Device (0=Changed, 1=Same Car)
            BIT2 --> VIN Mismatch (0=Mismatch, 1=Match)
            BIT1 --> Theft (0=Stolen, 1=Not Stolen)
            BIT0 --> PMP Subscription (0=Expired/Cancelled, 1=Valid/Started)
            (LSB)
        */
        public static string GetMileageAccrueStartStopDataBit(bool PmpSubscription, bool Theft, bool VinMismatch, bool TransferOfDevice)
        {
            /* mileageAccrueStartStop format = XXXX (BIT3 BIT2 BIT1 BIT0) */
            string dataBit = string.Empty;

            dataBit += "0000"; //unused 4 bits

            dataBit += Convert.ToByte(TransferOfDevice).ToString();
            dataBit += Convert.ToByte(VinMismatch).ToString();
            dataBit += Convert.ToByte(Theft).ToString();
            dataBit += Convert.ToByte(PmpSubscription).ToString();

            return dataBit;
        }

        public static bool[] ConvertMileageAccrueStartStopToDataBit(byte eventIdentifier)
        {
            /* mileageAccrueStartStop format = XXXX (BIT3 BIT2 BIT1 BIT0) */
            /* char[0,1,2,3] = TransferOfDevice, VinMismatch, Theft, PmpSubscription */
            char[] charData = Convert.ToString(eventIdentifier, 2).PadLeft(4, '0').ToArray();
            bool[] dataBit = new bool[4];

            dataBit[0] = charData[0] == '1' ? true : false;
            dataBit[1] = charData[1] == '1' ? true : false;
            dataBit[2] = charData[2] == '1' ? true : false;
            dataBit[3] = charData[3] == '1' ? true : false;

            return dataBit;
        }
    }
}