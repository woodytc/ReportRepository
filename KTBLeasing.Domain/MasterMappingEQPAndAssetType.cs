using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace KTBLeasing.Domain {
    
    public class MasterMappingEQPAndAssetType {
      public MasterMappingEQPAndAssetType() { }
      public virtual int ID {get;set;}
      public virtual int EQPCode {get;set;}
      public virtual int AssetID {get;set;}
      public virtual DateTime UpdateDate {get;set;}
      public virtual string UpdateUser { get; set; }
    }
}
