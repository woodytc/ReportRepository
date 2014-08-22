using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KTBLeasing.Domain.Page
{
    //dept
    public class RootObject
    {
        public int Id { get; set; }
        public string text { get; set; }
        public string cls { get; set; }
        public bool expanded { get; set; }
        //region
        public List<Child> children { get; set; }
    }
}