using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Page
{
    public class Child
    {
        public string text { get; set; }
        public bool leaf { get; set; }
        public bool @checked { get; set; }
        public string cls { get; set; }
        public List<Child2> children { get; set; }
    }
}
