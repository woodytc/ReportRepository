using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class ReportparameterMap : ClassMap<Reportparameter> {
        
        public ReportparameterMap() {
			Table("ReportParameters");
			CompositeId().KeyProperty(x => x.ReportID, "ReportID")
			             .KeyProperty(x => x.ParamID, "ParamID");
			References(x => x.Parameter).Column("ParamID");
			References(x => x.Report).Column("ParamID");
			Map(x => x.UpdateDate).Column("UpdateDate");
        }
    }
}
