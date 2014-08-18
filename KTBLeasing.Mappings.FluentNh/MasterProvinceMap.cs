using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class MasterProvinceMap : ClassMap<MasterProvince> {
        
        public MasterProvinceMap() {
			Table("MasterProvince");
			//LazyLoad();
			Id(x => x.Id).GeneratedBy.Identity().Column("id");
            References(x => x.MasterDepartment).Column("DeptCode");
            References(x => x.MasterRegion).Column("RegionCode");
			Map(x => x.Code).Column("Code").Not.Nullable();
			Map(x => x.Name).Column("Name");
			//Map(x => x.Deptcode).Column("DeptCode");
			//Map(x => x.Regioncode).Column("RegionCode");
			Map(x => x.Active).Column("Active");
            
        }
    }
}
