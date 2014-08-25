using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain
{
    public class AgrStatus
    {
        public virtual string AgrSts { get; set; }
        public virtual string AgrStsName { get; set; }
        public virtual bool Active { get; set; }
    }
}
