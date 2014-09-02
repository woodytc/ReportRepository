using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {


    public class MasterMappingEQPAndAssetTypeMap : ClassMap<MasterMappingEQPAndAssetType>
    {

        public MasterMappingEQPAndAssetTypeMap()
        {
            Table("MasterMappingEQPAndAssetType");
            Id(x => x.ID).GeneratedBy.Identity().Column("ID");
            Map(x => x.AssetID).Column("AssetID").Not.Nullable();
            Map(x => x.EQPCode).Column("EQPCode").Not.Nullable();
            Map(x => x.UpdateDate).Column("UpdateDate").Not.Nullable();
            Map(x => x.UpdateUser).Column("UpdateUser").Not.Nullable();

        }
    }
}