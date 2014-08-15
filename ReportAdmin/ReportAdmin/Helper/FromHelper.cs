using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KTBLeasing.ReportWeb.Helper
{
    public class FromHelper
    {
        public string type { get; set; }
        public string position { get; set; }
        public int labelWidth { get; set; }
        public int inputWidth { get; set; }
        public string label { get; set; }
        public string value { get; set; }
        public string name { get; set; }
        public List<Options> _options { get; set; }
        public string comboType { get; set; }
        public int? rows { get; set; }
    }
}