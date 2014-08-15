using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class MasterAssetTypeMap : ClassMap<MasterAssetType> {
        
        public MasterAssetTypeMap() {
			Table("MasterAssetType");
			LazyLoad();
			Id(x => x.Id).GeneratedBy.Identity().Column("ID");
			Map(x => x.AssetType).Column("AssetType");
			Map(x => x.Active).Column("Active");
			Map(x => x.CreateDate).Column("CreateDate");
			Map(x => x.UpdateDate).Column("UpdateDate");
        }
    }
}
