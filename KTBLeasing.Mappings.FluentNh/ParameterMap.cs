using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class ParameterMap : ClassMap<Parameter> {
        
        public ParameterMap() {
			Table("Parameters");
			Id(x => x.ID).GeneratedBy.Identity().Column("ID");
			Map(x => x.Name).Column("Name");
			Map(x => x.UpdateDate).Column("UpdateDate");
        }
    }
}
