using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class MasterMappingCodeEQPMap : ClassMap<MasterMappingCodeEQP> {
        
        public MasterMappingCodeEQPMap() {
            Table("MasterMappingCodeEQP");
            Id(x => x.EQPCode).GeneratedBy.Identity().Column("EQPCode");
            References(x => x.Masterassettype).Column("AssetCode");
            Map(x => x.ComID).Column("ComID");
            Map(x => x.EQPDescription).Column("EQPDesc");
            //Table("MasterMappingCodeEQP");
            //LazyLoad();
            //Id(x => x.EQPCode).GeneratedBy.Identity().Column("EQPCode");
            //Map(x => x.ComID).Column("ComID");
            //Map(x => x.EQPDescription).Column("EQPDesc");
            //Map(x => x.AssetCode).Column("AssetCode").Not.Nullable();
        }
    }
}

//Table("MasterMappingCodeEQP");
//Id(x => x.Eqpcode).GeneratedBy.Identity().Column("EQPCode");
//References(x => x.Masterassettype).Column("AssetCode");
//Map(x => x.Comid).Column("ComID");
//Map(x => x.Eqpdesc).Column("EQPDesc");