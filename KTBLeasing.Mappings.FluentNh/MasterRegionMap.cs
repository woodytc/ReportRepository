using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class MasterRegionMap : ClassMap<MasterRegion> {
        
        public MasterRegionMap() {
			Table("MasterRegion");
			//LazyLoad();
			Id(x => x.Code).GeneratedBy.Identity().Column("Code");
			Map(x => x.Name).Column("Name");
			Map(x => x.IsDelete).Column("IsDelete");
        }
    }
}
