using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh
{
    public class AgrStatusMap : ClassMap<AgrStatus> 
    {
        public AgrStatusMap()
        {
            Table("AgrStatus");
            Id(x => x.AgrSts).GeneratedBy.Assigned().Column("agr_sts");
            Map(x => x.AgrStsName).Column("agr_sts_name");
            Map(x => x.Active).Column("active");
        }
    }
}
