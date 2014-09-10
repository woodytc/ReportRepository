using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class AssetTypeMap : ClassMap<MasterAssetType> {
        
        public AssetTypeMap() {
			Table("MasterAssetType");
			LazyLoad();
			Id(x => x.ID).GeneratedBy.Assigned().Column("ID");
			Map(x => x.AssetType).Column("AssetType");
			Map(x => x.Active).Column("Active");
			Map(x => x.CreateDate).Column("CreateDate");
			Map(x => x.UpdateDate).Column("UpdateDate");
        }
    }
}
