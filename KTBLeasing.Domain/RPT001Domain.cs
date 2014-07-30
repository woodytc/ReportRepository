using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain
{
    public class RPT001Domain 
    {
        public string BranchK {get;set;}
        public string Region {get;set;}
        public string RegionDesc {get;set;}
        public string Dept {get;set;}
        public int Counts {get;set;}
        public string TypeLateMax { get; set; }
    }
}
