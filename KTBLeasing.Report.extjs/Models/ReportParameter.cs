using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KTBLeasing.Report.extjs.Models
{
    public class Parameters
    {
        public int ReportID { get; set; }
        public string ReportName { get; set; }
        public Dictionary<string, string> ReportParameter { get; set; }
        public ReportParam Param { get; set; }
    }
}