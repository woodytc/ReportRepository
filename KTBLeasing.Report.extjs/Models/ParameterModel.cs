using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KTBLeasing.Report.extjs.Models
{
    public class ParameterModel
    {
        public string ReportName { get; set; }
        //public int ReportID {get;set;}
        //public int ParameterID {get;set;}
        //public string ParameterName { get; set; }
        public Dictionary<string, string> Parameter {get;set;}
    }
}