using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KTBLeasing.Domain.Model;

namespace KTBLeasing.Report.extjs.Models
{
    public class RootObject
    {
        //public string text { get; set; }
        //public string cls { get; set; }
        //public bool expanded { get; set; }
        //public List<Child> children { get; set; }

        
        public List<AssetTypeMappingModel> xy { get; set; }
    }
}